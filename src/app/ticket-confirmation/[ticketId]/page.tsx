import Link from "next/link";
import { notFound } from "next/navigation";

import { getTicketByIdentifier } from "../../../lib/tickets/service";

export const dynamic = "force-dynamic";

export default async function TicketConfirmationPage({
  params,
}: {
  params: { ticketId: string };
}) {
  const ticket = await getTicketByIdentifier(params.ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050b11] px-4  py-20 text-[#f0f1f4]">
      <div className="mx-auto flex max-w-[720px] flex-col gap-8 rounded-[24px] border border-[#a4c6e6]/20 bg-[rgba(164,198,230,0.08)] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] my-24">
        <div className="space-y-3 ">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#a4c6e6]">
            Ticket Confirmation
          </p>
          <h1 className="font-['Oswald',sans-serif] text-5xl leading-none">
            YOUR PASS IS CONFIRMED
          </h1>
          <p className="max-w-[560px] text-[16px] leading-7 text-[#7891a8]">
            Keep this page and your payment reference handy. You can present the
            ticket ID below at the venue.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[18px] border border-[#a4c6e6]/15 bg-[#050b11]/40 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7891a8]">
              Ticket ID
            </p>
            <p className="mt-2 font-['Oswald',sans-serif] text-3xl">
              {ticket.ticketId}
            </p>
          </div>
          <div className="rounded-[18px] border border-[#a4c6e6]/15 bg-[#050b11]/40 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7891a8]">
              Status
            </p>
            <p className="mt-2 font-['Oswald',sans-serif] text-3xl">
              {ticket.status}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[18px] border border-[#a4c6e6]/15 bg-[#050b11]/40 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7891a8]">
              Name
            </p>
            <p className="mt-2 text-[18px]">{ticket.fullName}</p>
          </div>
          <div className="rounded-[18px] border border-[#a4c6e6]/15 bg-[#050b11]/40 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7891a8]">
              Email
            </p>
            <p className="mt-2 text-[18px]">{ticket.email}</p>
          </div>
          <div className="rounded-[18px] border border-[#a4c6e6]/15 bg-[#050b11]/40 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7891a8]">
              Ticket Type
            </p>
            <p className="mt-2 text-[18px]">{ticket.ticketType}</p>
          </div>
          <div className="rounded-[18px] border border-[#a4c6e6]/15 bg-[#050b11]/40 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7891a8]">
              Reference
            </p>
            <p className="mt-2 text-[18px] break-all">{ticket.reference}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            className="inline-flex items-center justify-center bg-[#ffd966] px-6 py-3 text-[16px] font-semibold text-[#050b11]"
            href={`/api/tickets/${encodeURIComponent(ticket.ticketId)}/download`}
          >
            Download Pass
          </a>
          <Link
            className="inline-flex items-center justify-center bg-[#a4c6e6] px-6 py-3 text-[16px] font-semibold text-[#050b11]"
            href="/tickets"
          >
            Buy Another Ticket
          </Link>
          <Link
            className="inline-flex items-center justify-center border border-[#f0f1f4] px-6 py-3 text-[16px] font-semibold text-[#f0f1f4]"
            href="/"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
