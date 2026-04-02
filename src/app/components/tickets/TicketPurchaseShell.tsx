"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getTicketOptionBySlug } from "../../../lib/tickets/catalog";
import TicketCheckoutModal from "./TicketCheckoutModal";
import {
  clearCheckoutDraft,
  readCheckoutDraft,
  type CheckoutDraft,
} from "./checkout-storage";

export default function TicketPurchaseShell({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [selectedTicketSlug, setSelectedTicketSlug] = useState<string | null>(
    null,
  );
  const [savedDraft, setSavedDraft] = useState<CheckoutDraft | null>(null);

  useEffect(() => {
    const syncDraft = () => {
      setSavedDraft(readCheckoutDraft());
    };

    syncDraft();
    window.addEventListener("ticket-checkout-draft-updated", syncDraft);
    window.addEventListener("storage", syncDraft);

    return () => {
      window.removeEventListener("ticket-checkout-draft-updated", syncDraft);
      window.removeEventListener("storage", syncDraft);
    };
  }, []);

  const selectedTicket = useMemo(
    () =>
      selectedTicketSlug ? getTicketOptionBySlug(selectedTicketSlug) : null,
    [selectedTicketSlug],
  );

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const trigger = target?.closest<HTMLElement>("[data-ticket-slug]");

    if (!trigger) {
      return;
    }

    const ticketSlug = trigger.dataset.ticketSlug;

    if (!ticketSlug) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setSelectedTicketSlug(ticketSlug);
  };

  return (
    <>
      {savedDraft && !selectedTicketSlug ? (
        <div className="fixed inset-x-0 top-24 z-[119] px-4">
          <div className="mx-auto flex max-w-[920px] flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[#ffd966]/20 bg-[#050b11]/95 px-5 py-4 text-[#f0f1f4] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#ffd966]">
                Continue Registration
              </p>
              <p className="mt-1 text-sm text-[#f0f1f4]">
                Please continue your registration for{" "}
                <span className="font-semibold text-[#a4c6e6]">
                  {getTicketOptionBySlug(savedDraft.ticketSlug)?.title ||
                    savedDraft.ticketSlug}
                </span>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/10 px-4 text-sm font-semibold text-[#f0f1f4] transition-colors hover:bg-white/5"
                onClick={() => clearCheckoutDraft()}
                type="button"
              >
                Dismiss
              </button>
              <button
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#a4c6e6] px-5 text-sm font-semibold text-[#050b11] transition-colors hover:brightness-105"
                onClick={() => setSelectedTicketSlug(savedDraft.ticketSlug)}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div onClickCapture={handleClickCapture}>{children}</div>
      <TicketCheckoutModal
        initialDraft={savedDraft}
        onComplete={(ticket) => {
          clearCheckoutDraft();
          setSavedDraft(null);
          setSelectedTicketSlug(null);
          router.push(`/ticket-confirmation/${ticket.ticketId}`);
        }}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTicketSlug(null);
          }
        }}
        open={Boolean(selectedTicket)}
        ticket={selectedTicket}
      />
    </>
  );
}
