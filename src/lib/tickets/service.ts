import crypto from "node:crypto";

import type { EventTicket, Prisma } from "../../../generated/prisma/client";

import prisma from "../prisma";
import { getTicketOptionBySlug } from "./catalog";
import { ensureTicketDatabase } from "./db-init";
import { sendTicketEmailSafely } from "./email";
import {
  isPaystackConfigured,
  PaystackVerificationError,
  type PaystackVerificationData,
  verifyPaystackTransaction,
} from "./paystack";
import { generateTicketPdf } from "./pdf";

export type TicketRegistrationInput = {
  additionalAccessibility?: string;
  city?: string;
  country?: string;
  disabilityTypes?: string[];
  email?: string;
  fullName?: string;
  gender?: string;
  otherDisability?: string;
  paymentReference?: string;
  personalAssistance?: string;
  phone?: string;
  sensoryDetails?: string;
  sensoryRequirements?: boolean;
  signLanguageRequired?: boolean;
  ticketSlug?: string;
};

export type PublicTicketRecord = {
  createdAt: Date;
  email: string;
  fullName: string;
  id: string;
  phone: string;
  purchaseDate: Date;
  reference: string;
  status: string;
  ticketId: string;
  ticketPrice: number;
  ticketSlug: string;
  ticketType: string;
  updatedAt: Date;
};

export type EmailStatus = {
  message: string;
  provider: string | null;
  sent: boolean;
};

function createHttpError(status: number, message: string, code: string) {
  const error = new Error(message) as Error & { code: string; status: number };
  error.status = status;
  error.code = code;
  return error;
}

function cleanString(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeEmail(value: unknown) {
  return cleanString(value).toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function serializeMetadata(input: TicketRegistrationInput) {
  return {
    gender: cleanString(input.gender) || undefined,
    city: cleanString(input.city) || undefined,
    country: cleanString(input.country) || undefined,
    disabilityTypes: Array.isArray(input.disabilityTypes)
      ? input.disabilityTypes.filter(Boolean)
      : undefined,
    otherDisability: cleanString(input.otherDisability) || undefined,
    signLanguageRequired:
      typeof input.signLanguageRequired === "boolean"
        ? input.signLanguageRequired
        : undefined,
    personalAssistance: cleanString(input.personalAssistance) || undefined,
    sensoryRequirements:
      typeof input.sensoryRequirements === "boolean"
        ? input.sensoryRequirements
        : undefined,
    sensoryDetails: cleanString(input.sensoryDetails) || undefined,
    additionalAccessibility:
      cleanString(input.additionalAccessibility) || undefined,
    fullName: cleanString(input.fullName) || undefined,
    email: normalizeEmail(input.email) || undefined,
    phone: cleanString(input.phone) || undefined,
    ticketSlug: cleanString(input.ticketSlug) || undefined,
  } satisfies Prisma.InputJsonObject;
}

function parseMetadata(
  value: Prisma.JsonValue | null | undefined,
): Record<string, unknown> {
  if (!value) {
    return {};
  }

  return typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function serializeStringArray(value: string[] | undefined) {
  return JSON.stringify(Array.isArray(value) ? value.filter(Boolean) : []);
}

function buildPublicTicket(ticket: EventTicket): PublicTicketRecord {
  return {
    id: ticket.id,
    ticketId: ticket.ticketId,
    fullName: ticket.fullName,
    email: ticket.email,
    phone: ticket.phone,
    ticketSlug: ticket.ticketSlug,
    ticketType: ticket.ticketType,
    ticketPrice: Number(ticket.ticketPrice),
    reference: ticket.reference,
    status: ticket.status,
    purchaseDate: ticket.purchaseDate,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  };
}

function generateTicketId() {
  return `AS2026-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function formatTicketPriceLabel(value: number) {
  return value > 0 ? `NGN ${value.toLocaleString()}` : "FREE";
}

async function verifyPaidRegistration(
  input: TicketRegistrationInput,
  ticketPrice: number,
) {
  if (!input.paymentReference) {
    throw createHttpError(
      400,
      "Payment reference is required for paid tickets.",
      "MISSING_REFERENCE",
    );
  }

  let verification: PaystackVerificationData;

  try {
    verification = await verifyPaystackTransaction(input.paymentReference);
  } catch (error) {
    if (error instanceof PaystackVerificationError) {
      throw createHttpError(
        error.code === "PAYSTACK_NOT_CONFIGURED" ? 503 : 502,
        error.message,
        error.code,
      );
    }

    throw error;
  }

  if (verification.status !== "success") {
    throw createHttpError(
      400,
      "Payment has not been completed.",
      "PAYMENT_INCOMPLETE",
    );
  }

  if (verification.amount !== Math.round(ticketPrice * 100)) {
    throw createHttpError(
      400,
      "Payment amount does not match the selected ticket.",
      "PAYMENT_AMOUNT_MISMATCH",
    );
  }

  const paidEmail = verification.customer?.email?.toLowerCase();
  const requestedEmail = normalizeEmail(input.email);

  if (paidEmail && requestedEmail && paidEmail !== requestedEmail) {
    throw createHttpError(
      400,
      "The payment email does not match the registration email.",
      "PAYMENT_EMAIL_MISMATCH",
    );
  }

  return verification;
}

export async function initializeTransaction(input: {
  amount: number;
  email?: string;
  fullName?: string;
  phone?: string;
  reference?: string;
  ticketSlug?: string;
}) {
  await ensureTicketDatabase();

  const reference = cleanString(input.reference);
  const email = normalizeEmail(input.email);
  const fullName = cleanString(input.fullName);
  const phone = cleanString(input.phone);
  const ticketSlug = cleanString(input.ticketSlug);
  const amount = Number(input.amount);
  const ticket = getTicketOptionBySlug(ticketSlug);

  if (!reference || !email || !ticket || !Number.isFinite(amount)) {
    throw createHttpError(
      400,
      "Reference, email, amount, and ticket selection are required.",
      "MISSING_PAYMENT_FIELDS",
    );
  }

  const existing = await prisma.transaction.findUnique({
    where: { reference },
  });

  const metadata = serializeMetadata({
    email,
    fullName,
    phone,
    ticketSlug,
  });

  const transaction = await prisma.transaction.upsert({
    where: { reference },
    update: {
      amount,
      email,
      fullName,
      metadata,
      phone,
      status: existing?.status === "SUCCESS" ? "SUCCESS" : "PENDING",
      ticketSlug,
      ticketType: ticket.title,
    },
    create: {
      amount,
      email,
      fullName,
      metadata,
      phone,
      reference,
      status: "PENDING",
      ticketSlug,
      ticketType: ticket.title,
    },
  });

  return {
    reference: transaction.reference,
    status: transaction.status,
    success: true,
    updatedAt: transaction.updatedAt,
  };
}

export async function createTicketRegistration(input: TicketRegistrationInput) {
  await ensureTicketDatabase();

  const fullName = cleanString(input.fullName);
  const email = normalizeEmail(input.email);
  const phone = cleanString(input.phone);
  const ticketSlug = cleanString(input.ticketSlug);
  const ticket = getTicketOptionBySlug(ticketSlug);

  if (!fullName || !phone || !email) {
    throw createHttpError(
      400,
      "Full name, email, and phone number are required.",
      "MISSING_FIELDS",
    );
  }

  if (!isValidEmail(email)) {
    throw createHttpError(
      400,
      "Enter a valid email address.",
      "INVALID_EMAIL",
    );
  }

  if (!ticket) {
    throw createHttpError(
      400,
      "Invalid ticket selection.",
      "INVALID_TICKET",
    );
  }

  const reference =
    ticket.price > 0
      ? cleanString(input.paymentReference)
      : `FREE-${crypto.randomUUID()}`;

  if (!reference) {
    throw createHttpError(
      400,
      "Payment reference is required.",
      "MISSING_REFERENCE",
    );
  }

  const existing = await prisma.eventTicket.findUnique({
    where: { reference },
  });

  if (existing) {
    return {
      success: true,
      ticket: buildPublicTicket(existing),
    };
  }

  if (ticket.price > 0) {
    await verifyPaidRegistration(input, ticket.price);

    await prisma.transaction.upsert({
      where: { reference },
      update: {
        amount: ticket.price,
        email,
        fullName,
        metadata: serializeMetadata(input),
        phone,
        status: "SUCCESS",
        ticketSlug: ticket.slug,
        ticketType: ticket.title,
      },
      create: {
        amount: ticket.price,
        email,
        fullName,
        metadata: serializeMetadata(input),
        phone,
        reference,
        status: "SUCCESS",
        ticketSlug: ticket.slug,
        ticketType: ticket.title,
      },
    });
  }

  const created = await prisma.eventTicket.create({
    data: {
      additionalAccessibility:
        cleanString(input.additionalAccessibility) || null,
      city: cleanString(input.city) || null,
      country: cleanString(input.country) || null,
      disabilityTypes: serializeStringArray(input.disabilityTypes),
      email,
      fullName,
      gender: cleanString(input.gender) || null,
      otherDisability: cleanString(input.otherDisability) || null,
      personalAssistance: cleanString(input.personalAssistance) || null,
      phone,
      reference,
      sensoryDetails: cleanString(input.sensoryDetails) || null,
      sensoryRequirements: Boolean(input.sensoryRequirements),
      signLanguageRequired: Boolean(input.signLanguageRequired),
      status: "VALID",
      ticketId: generateTicketId(),
      ticketPrice: String(ticket.price),
      ticketSlug: ticket.slug,
      ticketType: ticket.title,
    },
  });

  const publicTicket = buildPublicTicket(created);
  const pdfBuffer = await generateTicketPdf({
    fullName: publicTicket.fullName,
    ticketId: publicTicket.ticketId,
    ticketPrice: formatTicketPriceLabel(publicTicket.ticketPrice),
    ticketType: publicTicket.ticketType,
  });
  const emailStatus = await sendTicketEmailSafely({
    email: publicTicket.email,
    fullName: publicTicket.fullName,
    pdfBuffer,
    ticketId: publicTicket.ticketId,
    ticketPrice: formatTicketPriceLabel(publicTicket.ticketPrice),
    ticketType: publicTicket.ticketType,
  });

  return {
    email: emailStatus,
    success: true,
    ticket: publicTicket,
  };
}

export async function finalizeTransactionFromReference(referenceValue: string) {
  await ensureTicketDatabase();

  const reference = cleanString(referenceValue);

  if (!reference) {
    throw createHttpError(400, "Reference is required.", "MISSING_REFERENCE");
  }

  const transaction = await prisma.transaction.findUnique({
    where: { reference },
  });

  if (!transaction) {
    throw createHttpError(
      404,
      "Transaction not found.",
      "TRANSACTION_NOT_FOUND",
    );
  }

  const existing = await prisma.eventTicket.findUnique({
    where: { reference },
  });

  if (existing) {
    return {
      reference,
      status: "SUCCESS",
      ticket: buildPublicTicket(existing),
    };
  }

  if (!isPaystackConfigured()) {
    return {
      reference,
      status: transaction.status,
      ticketId: null,
    };
  }

  let verification: PaystackVerificationData;

  try {
    verification = await verifyPaystackTransaction(reference);
  } catch (error) {
    if (error instanceof PaystackVerificationError) {
      return {
        reference,
        status: transaction.status,
        ticketId: null,
        verificationError: error.message,
        verificationErrorCode: error.code,
      };
    }

    throw error;
  }

  if (verification.status !== "success") {
    return {
      reference,
      status: transaction.status,
      ticketId: null,
    };
  }

  const transactionMetadata = parseMetadata(transaction.metadata);
  const paystackMetadata =
    verification.metadata && typeof verification.metadata === "object"
      ? verification.metadata
      : {};
  const mergedMetadata = {
    ...paystackMetadata,
    ...transactionMetadata,
  } as Record<string, unknown>;

  const result = await createTicketRegistration({
    additionalAccessibility:
      typeof mergedMetadata.additionalAccessibility === "string"
        ? mergedMetadata.additionalAccessibility
        : undefined,
    city:
      typeof mergedMetadata.city === "string" ? mergedMetadata.city : undefined,
    country:
      typeof mergedMetadata.country === "string"
        ? mergedMetadata.country
        : undefined,
    disabilityTypes: Array.isArray(mergedMetadata.disabilityTypes)
      ? mergedMetadata.disabilityTypes.filter(
          (value): value is string => typeof value === "string",
        )
      : undefined,
    email:
      transaction.email ||
      verification.customer?.email ||
      (typeof mergedMetadata.email === "string" ? mergedMetadata.email : ""),
    fullName:
      transaction.fullName ||
      (typeof mergedMetadata.fullName === "string"
        ? mergedMetadata.fullName
        : `${verification.customer?.first_name || ""} ${
            verification.customer?.last_name || ""
          }`.trim()),
    gender:
      typeof mergedMetadata.gender === "string"
        ? mergedMetadata.gender
        : undefined,
    otherDisability:
      typeof mergedMetadata.otherDisability === "string"
        ? mergedMetadata.otherDisability
        : undefined,
    paymentReference: reference,
    personalAssistance:
      typeof mergedMetadata.personalAssistance === "string"
        ? mergedMetadata.personalAssistance
        : undefined,
    phone:
      transaction.phone ||
      (typeof mergedMetadata.phone === "string" ? mergedMetadata.phone : ""),
    sensoryDetails:
      typeof mergedMetadata.sensoryDetails === "string"
        ? mergedMetadata.sensoryDetails
        : undefined,
    sensoryRequirements:
      typeof mergedMetadata.sensoryRequirements === "boolean"
        ? mergedMetadata.sensoryRequirements
        : undefined,
    signLanguageRequired:
      typeof mergedMetadata.signLanguageRequired === "boolean"
        ? mergedMetadata.signLanguageRequired
        : undefined,
    ticketSlug:
      transaction.ticketSlug ||
      (typeof mergedMetadata.ticketSlug === "string"
        ? mergedMetadata.ticketSlug
        : undefined),
  });

  return {
    reference,
    status: "SUCCESS",
    ticket: result.ticket,
  };
}

export async function getTicketByIdentifier(identifierValue: string) {
  await ensureTicketDatabase();

  const identifier = cleanString(identifierValue);

  if (!identifier) {
    return null;
  }

  const ticket = await prisma.eventTicket.findFirst({
    where: {
      OR: [{ id: identifier }, { ticketId: identifier }, { reference: identifier }],
    },
  });

  return ticket ? buildPublicTicket(ticket) : null;
}

export async function getTransactionStatus(reference: string) {
  return finalizeTransactionFromReference(reference);
}
