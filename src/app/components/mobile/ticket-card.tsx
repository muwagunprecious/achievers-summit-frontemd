import { ArrowRight, Check } from "lucide-react";

export interface TicketDayTag {
  label: string;
  active: boolean;
  highlight?: boolean;
}

export interface TicketFeature {
  text: string;
  bold?: boolean;
}

export interface TicketData {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  className: string;
  price: string;
  priceSuffix: string;
  days: TicketDayTag[];
  description: string;
  features: TicketFeature[];
  labelColor?: string;
  bgTint?: string;
}

function CheckIcon() {
  return <Check className="mt-[3px] h-[14px] w-[13px] shrink-0 text-[#f0f1f4]" strokeWidth={2.25} />;
}

function ArrowIcon() {
  return <ArrowRight className="h-[16px] w-[16px] shrink-0 text-[#f0f1f4]" strokeWidth={2.25} />;
}

export function TicketCard({ ticket }: { ticket: TicketData }) {
  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[15px] border border-[#a4c6e6]"
      style={{ background: ticket.bgTint || "rgba(164,198,230,0.1)" }}
    >
      <div className="rounded-t-[15px] bg-[#f0f1f4] px-6 py-3">
        <p
          className="font-['Inter',sans-serif] text-[16px] leading-[1.02] tracking-[0.8px]"
          style={{ color: ticket.labelColor || "#050b11" }}
        >
          {ticket.title}
        </p>
      </div>

      <div className="flex flex-col gap-5 border-b border-[#f0f1f4] px-6 py-3">
        <p className="font-['Inter',sans-serif] text-[16px] leading-[1.02] tracking-[0.8px] text-[#7891a8]">
          Boarding Pass
        </p>
        <p className="font-['Inter',sans-serif] text-[18px] font-semibold leading-[1.2] tracking-[0.72px] text-[#f0f1f4]">
          {ticket.subtitle}
        </p>
        <p className="font-['Inter',sans-serif] text-[#f0f1f4]">
          <span className="text-[32px] font-bold leading-[1.02]">{ticket.price}</span>
          <span className="text-[16px] leading-[1.02] tracking-[1.6px]">{ticket.priceSuffix}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-[10px] px-6 py-4">
        {ticket.days.map((day) => (
          <div
            key={day.label}
            className="px-3 py-2 font-['Inter',sans-serif] text-[14px] leading-[1.02] tracking-[0.8px]"
            style={{
              background: day.active ? "#f0f1f4" : "rgba(164,198,230,0.1)",
              color: day.highlight ? "#000ff9" : day.active ? "#050b11" : "#a4c6e6",
              border: day.active ? "none" : "1px solid #a4c6e6",
            }}
          >
            {day.label}
          </div>
        ))}
      </div>

      <div className="px-6 py-2">
        <p className="font-['Inter',sans-serif] text-[18px] italic leading-[1.2] tracking-[0.36px] text-[#f0f1f4]">
          {ticket.description}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-[10px] px-6 py-2">
        {ticket.features.map((feature, index) => (
          <div key={`${ticket.id}-${index}`} className="flex items-start gap-[10px]">
            <CheckIcon />
            <p
              className={`font-['Inter',sans-serif] text-[18px] leading-[1.2] tracking-[0.36px] text-[#f0f1f4] ${
                feature.bold ? "font-semibold tracking-[0.72px]" : ""
              }`}
            >
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-auto p-6">
        <button
          className="inline-flex cursor-pointer items-center justify-center gap-[10px] border border-[#f0f1f4] px-7 py-3.5 transition-colors hover:bg-[rgba(240,241,244,0.1)]"
          data-ticket-slug={ticket.slug}
          type="button"
        >
          <span className="font-['Inter',sans-serif] text-[19px] font-semibold leading-[1.02] tracking-[-1.14px] text-[#f0f1f4]">
            Get this pass
          </span>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
