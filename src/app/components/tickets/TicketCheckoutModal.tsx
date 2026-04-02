"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Accessibility,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  User,
} from "lucide-react";

import type { TicketOption } from "../../../lib/tickets/catalog";
import {
  clearCheckoutDraft,
  type CheckoutDraft,
  type CheckoutDraftState,
  writeCheckoutDraft,
} from "./checkout-storage";

const OTHER_DISABILITY_OPTION = "Other";

const DISABILITY_OPTIONS = [
  "Visual Impairment",
  "Hearing Impairment",
  "Physical / Mobility Disability",
  "Cognitive / Intellectual Disability",
  "Speech Impairment",
  "Chronic Illness",
  "Psychosocial Disability",
  OTHER_DISABILITY_OPTION,
] as const;

const PERSONAL_ASSISTANCE_OPTIONS = [
  { value: "none", label: "No, I do not require personal assistance" },
  {
    value: "bringing_own",
    label: "Yes, I will be bringing my own personal assistant",
  },
  {
    value: "need_provided",
    label: "Yes, I would need assistance to be provided",
  },
] as const;

type ModalState = CheckoutDraftState;

type TicketPurchaseResult = {
  email: string;
  fullName: string;
  phone: string;
  reference: string;
  status: string;
  ticketId: string;
  ticketPrice: number;
  ticketSlug: string;
  ticketType: string;
};

type TicketCheckoutModalProps = {
  initialDraft?: CheckoutDraft | null;
  onComplete: (ticket: TicketPurchaseResult) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  ticket: TicketOption | null;
};

type FormData = {
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

const EMPTY_FORM_DATA: FormData = {
  additionalAccessibility: "",
  city: "",
  country: "",
  disabilityTypes: [],
  email: "",
  fullName: "",
  gender: "",
  hasAccessibilityNeeds: null,
  otherDisability: "",
  personalAssistance: "none",
  phone: "",
  sensoryDetails: "",
  sensoryRequirements: false,
  signLanguageRequired: false,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function generateReference() {
  return `AS26-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function normalizeTicketRecord(payload: {
  ticket?: TicketPurchaseResult;
} & Partial<TicketPurchaseResult>) {
  const ticket = payload.ticket && typeof payload.ticket === "object"
    ? payload.ticket
    : payload;

  if (!ticket || typeof ticket !== "object" || !ticket.ticketId) {
    return null;
  }

  return {
    email: String(ticket.email || ""),
    fullName: String(ticket.fullName || ""),
    phone: String(ticket.phone || ""),
    reference: String(ticket.reference || ""),
    status: String(ticket.status || "VALID"),
    ticketId: String(ticket.ticketId || ""),
    ticketPrice: Number(ticket.ticketPrice || 0),
    ticketSlug: String(ticket.ticketSlug || ""),
    ticketType: String(ticket.ticketType || ""),
  };
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${currentStep === step
              ? "bg-[#a4c6e6] text-[#050b11]"
              : currentStep > step
                ? "bg-[#a4c6e6]/20 text-[#a4c6e6]"
                : "bg-white/5 text-[#7891a8]"
              }`}
          >
            {currentStep > step ? "✓" : step}
          </div>
          {step < 3 ? (
            <div
              className={`h-0.5 w-8 ${currentStep > step ? "bg-[#a4c6e6]/30" : "bg-white/10"}`}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function TicketCheckoutModal({
  initialDraft,
  onComplete,
  onOpenChange,
  open,
  ticket,
}: TicketCheckoutModalProps) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM_DATA);
  const [formStep, setFormStep] = useState(1);
  const [state, setState] = useState<ModalState>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [createdTicket, setCreatedTicket] = useState<TicketPurchaseResult | null>(
    null,
  );
  const [paymentReference, setPaymentReference] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !ticket) {
      return;
    }

    const matchingDraft =
      initialDraft && initialDraft.ticketSlug === ticket.slug ? initialDraft : null;

    if (matchingDraft) {
      setFormData({ ...EMPTY_FORM_DATA, ...matchingDraft.formData });
      setFormStep(Math.min(Math.max(matchingDraft.formStep, 1), 3));
      setState(matchingDraft.state === "processing" ? "form" : matchingDraft.state);
      setErrorMessage(matchingDraft.errorMessage);
      setCreatedTicket(matchingDraft.createdTicket);
      setPaymentReference(matchingDraft.paymentReference);
      setReference(matchingDraft.reference || generateReference());
      return;
    }

    setFormData(EMPTY_FORM_DATA);
    setFormStep(1);
    setState("form");
    setErrorMessage("");
    setCreatedTicket(null);
    setPaymentReference("");
    setReference(generateReference());
  }, [open, ticket?.slug]);

  useEffect(() => {
    if (!open || !ticket) {
      return;
    }

    if (state === "success") {
      clearCheckoutDraft();
      return;
    }

    writeCheckoutDraft({
      createdTicket,
      errorMessage,
      formData,
      formStep,
      paymentReference,
      reference,
      savedAt: Date.now(),
      state,
      ticketSlug: ticket.slug,
    });
  }, [
    createdTicket,
    errorMessage,
    formData,
    formStep,
    open,
    paymentReference,
    reference,
    state,
    ticket,
  ]);

  const inputClass =
    "h-12 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-[#f0f1f4] outline-none transition-colors placeholder:text-[#7891a8] focus:border-[#a4c6e6]/50";
  const labelClass =
    "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7891a8]";
  const selectClass =
    "h-12 w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-[#f0f1f4] outline-none transition-colors focus:border-[#a4c6e6]/50";

  const stepTitle = useMemo(() => {
    if (formStep === 1) {
      return "Enter your personal details";
    }

    if (formStep === 2) {
      return "Tell us a bit about yourself";
    }

    return "Help us make the event accessible";
  }, [formStep]);

  useEffect(() => {
    if (!open || state !== "verifying" || !paymentReference) {
      return;
    }

    void checkPaymentStatus(paymentReference);
  }, [open, paymentReference, state]);

  if (!open || !ticket) {
    return null;
  }

  const isLockedState =
    state === "processing" || state === "payment" || state === "verifying";

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const inputTarget = event.target as HTMLInputElement;
    const checked = inputTarget.checked;
    const type = inputTarget.type;

    if (errorMessage) {
      setErrorMessage("");
    }

    if (name === "hasAccessibilityNeeds") {
      const hasAccessibilityNeeds = value === "yes";

      setFormData((current) => ({
        ...current,
        additionalAccessibility: hasAccessibilityNeeds
          ? current.additionalAccessibility
          : "",
        disabilityTypes: hasAccessibilityNeeds ? current.disabilityTypes : [],
        hasAccessibilityNeeds,
        otherDisability: hasAccessibilityNeeds ? current.otherDisability : "",
        personalAssistance: hasAccessibilityNeeds
          ? current.personalAssistance
          : "none",
        sensoryDetails: hasAccessibilityNeeds ? current.sensoryDetails : "",
        sensoryRequirements: hasAccessibilityNeeds
          ? current.sensoryRequirements
          : false,
        signLanguageRequired: hasAccessibilityNeeds
          ? current.signLanguageRequired
          : false,
      }));
      return;
    }

    if (type === "checkbox" && name === "disabilityTypes") {
      setFormData((current) => ({
        ...current,
        disabilityTypes: checked
          ? [...current.disabilityTypes, value]
          : current.disabilityTypes.filter((item) => item !== value),
        otherDisability:
          value === OTHER_DISABILITY_OPTION && !checked ? "" : current.otherDisability,
      }));
      return;
    }

    if (type === "checkbox") {
      setFormData((current) => ({ ...current, [name]: checked }));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handlePaystackPayment = async () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
      setState("error");
      setErrorMessage("NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not configured.");
      return;
    }

    const { default: PaystackPop } = await import("@paystack/inline-js");
    const popup = new PaystackPop();

    popup.newTransaction({
      amount: Math.round(ticket.price * 100),
      email: formData.email,
      key: publicKey,
      metadata: {
        additionalAccessibility: formData.additionalAccessibility,
        city: formData.city,
        country: formData.country,
        disabilityTypes: formData.disabilityTypes,
        email: formData.email,
        fullName: formData.fullName,
        gender: formData.gender,
        hasAccessibilityNeeds: formData.hasAccessibilityNeeds,
        otherDisability: formData.otherDisability,
        personalAssistance: formData.personalAssistance,
        phone: formData.phone,
        sensoryDetails: formData.sensoryDetails,
        sensoryRequirements: formData.sensoryRequirements,
        signLanguageRequired: formData.signLanguageRequired,
        ticketSlug: ticket.slug,
      },
      onCancel: () => {
        setState("form");
      },
      onSuccess: (transaction) => {
        void handlePaymentSuccess(transaction.reference);
      },
      reference,
    });
  };

  const checkPaymentStatus = async (referenceValue: string) => {
    let attempts = 0;
    const maxAttempts = 12;

    const poll = async (): Promise<void> => {
      try {
        const response = await fetch(
          `/api/payments/status?reference=${encodeURIComponent(referenceValue)}`,
          { cache: "no-store" },
        );
        const payload = (await response.json()) as {
          status?: string;
          ticket?: TicketPurchaseResult;
        };
        const normalizedTicket = normalizeTicketRecord(payload);

        if (payload.status === "SUCCESS" && normalizedTicket) {
          setCreatedTicket(normalizedTicket);
          setState("success");
          onComplete(normalizedTicket);
          return;
        }

        if (payload.status === "FAILED") {
          setState("error");
          setErrorMessage("Payment verification failed.");
          return;
        }

        attempts += 1;

        if (attempts >= maxAttempts) {
          setState("error");
          setErrorMessage(
            "Verification timed out. Please check your payment history or contact support.",
          );
          return;
        }

        window.setTimeout(() => {
          void poll();
        }, 3000);
      } catch {
        attempts += 1;

        if (attempts >= maxAttempts) {
          setState("error");
          setErrorMessage(
            "Verification timed out. Please check your payment history or contact support.",
          );
          return;
        }

        window.setTimeout(() => {
          void poll();
        }, 3000);
      }
    };

    await poll();
  };

  const handlePaymentSuccess = async (referenceValue: string) => {
    setPaymentReference(referenceValue);
    setState("verifying");

    try {
      const response = await fetch("/api/tickets/create", {
        body: JSON.stringify({
          ...formData,
          paymentReference: referenceValue,
          ticketSlug: ticket.slug,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const payload = (await response.json()) as {
        error?: string;
        ticket?: TicketPurchaseResult;
      } & Partial<TicketPurchaseResult>;

      if (!response.ok) {
        throw new Error(payload.error || "Ticket creation failed.");
      }

      const normalizedTicket = normalizeTicketRecord(payload);

      if (!normalizedTicket) {
        throw new Error("Ticket creation succeeded but no ticket ID was returned.");
      }

      setCreatedTicket(normalizedTicket);
      setState("success");
      onComplete(normalizedTicket);
    } catch {
      await checkPaymentStatus(referenceValue);
    }
  };

  const handleNextStep = () => {
    if (formStep === 1) {
      if (!formData.fullName.trim() || !formData.phone.trim()) {
        setErrorMessage("Full name and phone number are required.");
        return;
      }

      if (!isValidEmail(formData.email)) {
        setErrorMessage("Enter a valid email address.");
        return;
      }
    }

    setErrorMessage("");
    setFormStep((current) => Math.min(current + 1, 3));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.hasAccessibilityNeeds === null) {
      setErrorMessage("Please tell us whether you have any challenges.");
      return;
    }

    if (
      formData.hasAccessibilityNeeds &&
      formData.disabilityTypes.includes(OTHER_DISABILITY_OPTION) &&
      !formData.otherDisability.trim()
    ) {
      setErrorMessage('Please specify the disability type for "Other".');
      return;
    }

    if (!formData.fullName.trim() || !formData.phone.trim() || !isValidEmail(formData.email)) {
      setErrorMessage(
        "Full name, a valid email address, and phone number are required.",
      );
      return;
    }

    if (ticket.price > 0) {
      setState("processing");

      try {
        const response = await fetch("/api/payments/initialize", {
          body: JSON.stringify({
            amount: ticket.price,
            email: formData.email,
            fullName: formData.fullName,
            phone: formData.phone,
            reference,
            ticketSlug: ticket.slug,
          }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
        const payload = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(payload.error || "Failed to initialize transaction.");
        }

        setState("payment");
        await handlePaystackPayment();
        return;
      } catch (error) {
        const handledError = error as Error;
        setState("error");
        setErrorMessage(handledError.message);
        return;
      }
    }

    setState("processing");

    try {
      const response = await fetch("/api/tickets/create", {
        body: JSON.stringify({
          ...formData,
          ticketSlug: ticket.slug,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json()) as {
        error?: string;
        ticket?: TicketPurchaseResult;
      } & Partial<TicketPurchaseResult>;

      if (!response.ok) {
        throw new Error(payload.error || "Ticket creation failed.");
      }

      const normalizedTicket = normalizeTicketRecord(payload);

      if (!normalizedTicket) {
        throw new Error("Ticket created but no ticket ID was returned.");
      }

      setCreatedTicket(normalizedTicket);
      setState("success");
      onComplete(normalizedTicket);
    } catch (error) {
      const handledError = error as Error;
      setState("error");
      setErrorMessage(handledError.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
      <div className="relative z-[121] flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[20px] border border-[#a4c6e6]/20 bg-[#050b11] shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        <div className="overflow-y-auto p-8">
          {isLockedState ? (
            <div className="mb-5 rounded-lg border border-[#ffd966]/20 bg-[#ffd966]/10 px-4 py-3 text-left text-sm leading-6 text-[#f0f1f4]">
              Do not close this window while we complete your registration. If the app closes, come back and continue from where you stopped.
            </div>
          ) : null}

          {state === "form" ? (
            <div>
              <div className="mb-6 text-center">
                <div className="mb-3 inline-flex rounded-full border border-[#a4c6e6]/20 bg-[#a4c6e6]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a4c6e6]">
                  {ticket.title} • {ticket.priceDisplay}
                </div>
                <h2 className="mb-1 font-['Oswald',sans-serif] text-3xl text-[#f0f1f4]">
                  Register for Your Pass
                </h2>
                <p className="text-sm text-[#7891a8]">{stepTitle}</p>
              </div>

              <StepIndicator currentStep={formStep} />

              {errorMessage ? (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              ) : null}

              <form onSubmit={handleSubmit}>
                {formStep === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input
                        className={inputClass}
                        name="fullName"
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        value={formData.fullName}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input
                        className={inputClass}
                        name="email"
                        onChange={handleChange}
                        placeholder="you@email.com"
                        required
                        type="email"
                        value={formData.email}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input
                        className={inputClass}
                        name="phone"
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        required
                        value={formData.phone}
                      />
                    </div>
                  </div>
                ) : null}

                {formStep === 2 ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Gender</label>
                        <select
                          className={selectClass}
                          name="gender"
                          onChange={handleChange}
                          value={formData.gender}
                        >
                          <option value="">Prefer not to say</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          className={inputClass}
                          name="city"
                          onChange={handleChange}
                          placeholder="Lagos"
                          value={formData.city}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Country</label>
                      <input
                        className={inputClass}
                        name="country"
                        onChange={handleChange}
                        placeholder="Nigeria"
                        value={formData.country}
                      />
                    </div>
                  </div>
                ) : null}

                {formStep === 3 ? (
                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>
                        Do you have any physical or accessibility challenges?
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f0f1f4]">
                          <input
                            checked={formData.hasAccessibilityNeeds === true}
                            className="h-4 w-4 accent-[#a4c6e6]"
                            name="hasAccessibilityNeeds"
                            onChange={handleChange}
                            type="radio"
                            value="yes"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f0f1f4]">
                          <input
                            checked={formData.hasAccessibilityNeeds === false}
                            className="h-4 w-4 accent-[#a4c6e6]"
                            name="hasAccessibilityNeeds"
                            onChange={handleChange}
                            type="radio"
                            value="no"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    {formData.hasAccessibilityNeeds ? (
                      <>
                        <div>
                          <label className={labelClass}>Accessibility Needs</label>
                          <div className="grid gap-2 rounded-lg border border-white/10 bg-white/5 p-4">
                            {DISABILITY_OPTIONS.map((option) => (
                              <label
                                key={option}
                                className="flex items-center gap-3 text-sm text-[#f0f1f4]"
                              >
                                <input
                                  checked={formData.disabilityTypes.includes(option)}
                                  className="h-4 w-4 accent-[#a4c6e6]"
                                  name="disabilityTypes"
                                  onChange={handleChange}
                                  type="checkbox"
                                  value={option}
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {formData.disabilityTypes.includes(OTHER_DISABILITY_OPTION) ? (
                          <div>
                            <label className={labelClass}>Other Disability</label>
                            <input
                              className={inputClass}
                              name="otherDisability"
                              onChange={handleChange}
                              placeholder="Please specify"
                              value={formData.otherDisability}
                            />
                          </div>
                        ) : null}

                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f0f1f4]">
                            <input
                              checked={formData.signLanguageRequired}
                              className="h-4 w-4 accent-[#a4c6e6]"
                              name="signLanguageRequired"
                              onChange={handleChange}
                              type="checkbox"
                            />
                            <span>Sign language required</span>
                          </label>
                          <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f0f1f4]">
                            <input
                              checked={formData.sensoryRequirements}
                              className="h-4 w-4 accent-[#a4c6e6]"
                              name="sensoryRequirements"
                              onChange={handleChange}
                              type="checkbox"
                            />
                            <span>Sensory-friendly support</span>
                          </label>
                        </div>

                        <div>
                          <label className={labelClass}>Personal Assistance</label>
                          <select
                            className={selectClass}
                            name="personalAssistance"
                            onChange={handleChange}
                            value={formData.personalAssistance}
                          >
                            {PERSONAL_ASSISTANCE_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {formData.sensoryRequirements ? (
                          <div>
                            <label className={labelClass}>Sensory Details</label>
                            <textarea
                              className="min-h-[92px] w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f0f1f4] outline-none transition-colors placeholder:text-[#7891a8] focus:border-[#a4c6e6]/50"
                              name="sensoryDetails"
                              onChange={handleChange}
                              placeholder="Tell us what would help"
                              value={formData.sensoryDetails}
                            />
                          </div>
                        ) : null}

                        <div>
                          <label className={labelClass}>Additional Accessibility Notes</label>
                          <textarea
                            className="min-h-[92px] w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f0f1f4] outline-none transition-colors placeholder:text-[#7891a8] focus:border-[#a4c6e6]/50"
                            name="additionalAccessibility"
                            onChange={handleChange}
                            placeholder="Anything else we should know"
                            value={formData.additionalAccessibility}
                          />
                        </div>
                      </>
                    ) : null}

                    {formData.hasAccessibilityNeeds === false ? (
                      <div>
                        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#7891a8]">
                          No accessibility support selected. You can continue with your registration.
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-[#f0f1f4] transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={formStep === 1}
                    onClick={() => setFormStep((current) => Math.max(current - 1, 1))}
                    type="button"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  {formStep < 3 ? (
                    <button
                      className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#a4c6e6] px-5 text-sm font-semibold text-[#050b11] transition-colors hover:brightness-105"
                      onClick={handleNextStep}
                      type="button"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#a4c6e6] px-5 text-sm font-semibold text-[#050b11] transition-colors hover:brightness-105"
                      type="submit"
                    >
                      <CreditCard size={16} />
                      {ticket.price > 0 ? `Pay ${ticket.priceDisplay}` : "Register free"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : null}

          {state === "processing" || state === "verifying" ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-[#a4c6e6]" />
              <h3 className="font-['Oswald',sans-serif] text-3xl text-[#f0f1f4]">
                {state === "processing" ? "Preparing Checkout" : "Verifying Payment"}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#7891a8]">
                {state === "processing"
                  ? "We are setting up your transaction and registration details."
                  : "Hold on while we confirm the Paystack transaction and issue your ticket."}
              </p>
            </div>
          ) : null}

          {state === "payment" ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <CreditCard className="mb-4 h-10 w-10 text-[#a4c6e6]" />
              <h3 className="font-['Oswald',sans-serif] text-3xl text-[#f0f1f4]">
                Complete Payment in Paystack
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#7891a8]">
                Finish the payment in the Paystack window. If it did not open, use the button below to try again.
              </p>
              <button
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-[#a4c6e6] px-5 text-sm font-semibold text-[#050b11] transition-colors hover:brightness-105"
                onClick={handlePaystackPayment}
                type="button"
              >
                Retry Paystack
              </button>
            </div>
          ) : null}

          {state === "success" && createdTicket ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-4 h-12 w-12 text-[#ffd966]" />
              <h3 className="font-['Oswald',sans-serif] text-3xl text-[#f0f1f4]">
                Ticket Issued
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#7891a8]">
                Your pass is confirmed. We are opening your ticket confirmation now.
              </p>
              <div className="mt-6 rounded-xl border border-[#a4c6e6]/20 bg-[#a4c6e6]/5 px-5 py-4 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7891a8]">
                  Ticket ID
                </p>
                <p className="mt-1 font-['Oswald',sans-serif] text-2xl text-[#f0f1f4]">
                  {createdTicket.ticketId}
                </p>
                <p className="mt-3 text-sm text-[#a4c6e6]">
                  Reference: {paymentReference || createdTicket.reference}
                </p>
              </div>
            </div>
          ) : null}

          {state === "error" ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
              <h3 className="font-['Oswald',sans-serif] text-3xl text-[#f0f1f4]">
                Checkout Failed
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#7891a8]">
                {errorMessage || "We could not complete your ticket purchase."}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-5 text-sm font-semibold text-[#f0f1f4] transition-colors hover:bg-white/5"
                  onClick={() => {
                    setState("form");
                    setErrorMessage("");
                  }}
                  type="button"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
