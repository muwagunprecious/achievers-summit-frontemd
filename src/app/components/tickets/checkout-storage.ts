"use client";

export const CHECKOUT_DRAFT_STORAGE_KEY = "achievers-ticket-checkout-draft";

export type CheckoutDraftState =
  | "form"
  | "processing"
  | "payment"
  | "verifying"
  | "success"
  | "error";

export type CheckoutDraft = {
  createdTicket: {
    email: string;
    fullName: string;
    phone: string;
    reference: string;
    status: string;
    ticketId: string;
    ticketPrice: number;
    ticketSlug: string;
    ticketType: string;
  } | null;
  errorMessage: string;
  formData: {
    additionalAccessibility: string;
    city: string;
    country: string;
    disabilityTypes: string[];
    email: string;
    fullName: string;
    gender: string;
    hasAccessibilityNeeds: boolean | null;
    otherDisability: string;
    personalAssistance: string;
    phone: string;
    sensoryDetails: string;
    sensoryRequirements: boolean;
    signLanguageRequired: boolean;
  };
  formStep: number;
  paymentReference: string;
  reference: string;
  savedAt: number;
  state: CheckoutDraftState;
  ticketSlug: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function readCheckoutDraft() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(CHECKOUT_DRAFT_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as CheckoutDraft | null;

    if (!parsed || typeof parsed !== "object" || !parsed.ticketSlug) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeCheckoutDraft(draft: CheckoutDraft) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    CHECKOUT_DRAFT_STORAGE_KEY,
    JSON.stringify(draft),
  );
  window.dispatchEvent(new Event("ticket-checkout-draft-updated"));
}

export function clearCheckoutDraft() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(CHECKOUT_DRAFT_STORAGE_KEY);
  window.dispatchEvent(new Event("ticket-checkout-draft-updated"));
}
