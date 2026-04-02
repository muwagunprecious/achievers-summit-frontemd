"use client";

import { useState } from "react";

import { FilledActionButton } from "../ui/action-button";
import { cn } from "../ui/utils";
import {
  MobilePageFrame,
} from "./shared";
import { TicketCard, type TicketData } from "./ticket-card";

const summitPasses: TicketData[] = [
  {
    slug: "general-admission",
    id: "T01",
    title: "General Admission▪ T01",
    subtitle: "Terminal Access",
    className: "",
    price: "₦10,000",
    priceSuffix: "/person",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: false },
      { label: "GALA NIGHT", active: false },
    ],
    description: "Business & leadership enthusiasts seeking inspiration and connection",
    features: [
      { text: "Summit Day 1 Full Access" },
      { text: "Breakout Sessions" },
      { text: "Exhibition Floor & Brand Activations" },
      { text: "Event Badge" },
    ],
  },
  {
    slug: "standard-pass",
    id: "E02",
    title: "Standard Pass▪ E02",
    subtitle: "Economy Class",
    className: "",
    price: "₦40,000",
    priceSuffix: "/person",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: true },
      { label: "GALA NIGHT", active: false },
    ],
    description: "Entrepreneurs, leaders and influencers seeking growth, collaboration and deals",
    features: [
      { text: "All Terminal Access privileges" },
      { text: "Meet & Greet Session", bold: true },
      { text: "Priority registration" },
      { text: "Standard breakout sessions" },
      { text: "Business Lounge access" },
    ],
  },
  {
    slug: "business-class",
    id: "B03",
    title: "Most Popular▪ B03",
    subtitle: "Business Class",
    className: "",
    price: "₦100,000",
    priceSuffix: "/person",
    labelColor: "#000ff9",
    bgTint: "rgba(0,15,249,0.1)",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: true },
      { label: "GALA NIGHT", active: true, highlight: true },
    ],
    description: "Business executives, leaders and decision-makers wanting premium full-event access",
    features: [
      { text: "Full 3-Day Access", bold: true },
      { text: "Reserved VIP Seating", bold: true },
      { text: "Photo moments, Meet & Greet with speakers", bold: true },
      { text: "Priority check-in" },
      { text: "Certificate of Participation" },
    ],
  },
];

const investorPass: TicketData = {
  slug: "investors-pass",
  id: "F04",
  title: "Investors Pass▪ F04",
  subtitle: "First Class",
  className: "",
  price: "₦250,000",
  priceSuffix: "/person",
  labelColor: "#ff5c00",
  bgTint: "rgba(255,217,102,0.1)",
  days: [
    { label: "DAY 1", active: true },
    { label: "DAY 2", active: true },
    { label: "GALA NIGHT", active: true, highlight: true },
  ],
  description: "Investors, awardees and executives seeking highest-level access and deal-making",
  features: [
    { text: "Investor Roundtable & Deal Room", bold: true },
    { text: "Reserved Seating at Investors Panel", bold: true },
    { text: "One-on-one meetings with speakers", bold: true },
    { text: "Full 3-Day Access" },
    { text: "Priority check-in" },
  ],
};

const galaPasses: TicketData[] = [
  {
    slug: "gala-night-single",
    id: "G01",
    title: "Gala Night▪ G01",
    subtitle: "Gala Night — Single",
    className: "",
    price: "₦50,000",
    priceSuffix: "/person",
    days: [
      { label: "DAY 1", active: false },
      { label: "DAY 2", active: false },
      { label: "GALA NIGHT", active: true, highlight: true },
    ],
    description: "August 13 · Oriental Hotel, Victoria Island",
    features: [
      { text: "Red carpet & gala dinner", bold: true },
      { text: "Entertainment performances & award presentations" },
      { text: "Cocktail reception" },
      { text: "Meet & Greet with performers" },
      { text: "Photo opportunities" },
    ],
  },
  {
    slug: "gala-night-couple",
    id: "G06",
    title: "Gala Night▪Couple▪ G06",
    subtitle: "Gala Night — Couple",
    className: "",
    price: "₦80,000",
    priceSuffix: "/2 persons",
    days: [
      { label: "DAY 1", active: false },
      { label: "DAY 2", active: false },
      { label: "GALA NIGHT", active: true, highlight: true },
    ],
    description: "Save NGN 20,000 vs. two single passes · Oriental Hotel, Victoria Island",
    features: [
      { text: "Admits 2 guests", bold: true },
      { text: "Red carpet & gala dinner", bold: true },
      { text: "Entertainment performances & award presentations" },
      { text: "Cocktail reception" },
      { text: "Meet & Greet with performers" },
      { text: "Photo opportunities" },
    ],
  },
];

const groupPasses: TicketData[] = [
  {
    slug: "innovators-pass",
    id: "I07",
    title: "Innovators Pass▪Admits 2▪I07",
    subtitle: "Economy Tier 2",
    className: "",
    price: "₦60,000",
    priceSuffix: "/2 persons",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: true },
      { label: "GALA NIGHT", active: false },
    ],
    description: "Leaders & business partners looking to learn and grow together — save up to 25%",
    features: [
      { text: "Admits 2 people", bold: true },
      { text: "All Economy Class Privileges" },
      { text: "Meet & Greet Session" },
      { text: "Priority registration" },
      { text: "Business Lounge access" },
    ],
  },
  {
    slug: "group-pass",
    id: "C08",
    title: "Group Pass▪Admits 10▪C08",
    subtitle: "Community Pass",
    className: "",
    price: "₦90,000",
    priceSuffix: "/10 persons",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: false },
      { label: "GALA NIGHT", active: false },
    ],
    description: "Organisations, churches, institutions & community groups — Day 1 only",
    features: [
      { text: "Admits 10 people", bold: true },
      { text: "Full Day 1 Summit access" },
      { text: "Breakout sessions" },
      { text: "Exhibition floor & brand activations" },
      { text: "Event badges for all" },
    ],
  },
];

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-[13px]">
      <div className="h-[2.5px] w-[35px] bg-[#f0f1f4]" />
      <p className="font-['Inter',sans-serif] text-[16px] leading-[1.02] tracking-[1.6px] text-[#f0f1f4]">
        {text}
      </p>
    </div>
  );
}

const tabs = ["All Passes", "Summit", "Gala Night", "Group"] as const;
type TabType = (typeof tabs)[number];

export default function TicketsMobilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("All Passes");

  const showSummit = activeTab === "All Passes" || activeTab === "Summit";
  const showGala = activeTab === "All Passes" || activeTab === "Gala Night";
  const showGroup = activeTab === "All Passes" || activeTab === "Group";

  return (
    <div className="bg-[#050b11] md:hidden">
      <MobilePageFrame className="gap-14 pb-20">
        <section className="w-full py-4">
          <div className="flex w-full flex-col items-center gap-[40px]">
            <div className="flex w-full flex-col items-center gap-[30px] text-center">
              <SectionLabel text="CHOOSE TICKETS" />
              <div className="flex flex-col items-center gap-[30px]">
                <h1 className="font-['Oswald',sans-serif] text-[36px] font-bold leading-[1.05] text-[#f0f1f4]">
                  GET YOUR TICKET
                </h1>
                <p className="font-['Inter',sans-serif] text-[16px] font-medium leading-[1.4] tracking-[-0.96px] text-[#a4c6e6]">
                  Secure your seat for the Achievers Summit: Flight Edition. This is
                  your boarding pass to the conversations and connections shaping
                  Africa&apos;s next decade
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-[10px]">
                {(["AUGUST 11 — DAY 1", "AUGUST 12 — DAY 2", "AUGUST 13 — GALA NIGHT"] as const).map((label) => (
                  <div
                    key={label}
                    className="border border-[#a4c6e6] bg-[rgba(164,198,230,0.1)] px-4 py-2 font-['Inter',sans-serif] text-[12px] leading-[1.2] tracking-[0.24px] text-[#a4c6e6]"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full border border-[#a4c6e6] bg-[rgba(255,217,102,0.1)] p-3">
              <div className="grid grid-cols-4 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={cn(
                      "whitespace-nowrap px-2 py-3 font-['Inter',sans-serif] text-[12px] font-semibold leading-[1.02] tracking-[-0.48px] transition-colors",
                      activeTab === tab
                        ? "bg-[#a4c6e6] text-[#050b11]"
                        : "text-[#f0f1f4]",
                    )}
                    onClick={() => setActiveTab(tab)}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {showSummit ? (
          <section className="flex w-full flex-col items-start gap-[25px] pb-[20px]">
            <SectionLabel text="SUMMIT PASSES" />
            <div className="grid w-full grid-cols-1 gap-[14px]">
              {summitPasses.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
            <div className="grid w-full grid-cols-1 gap-[14px]">
              <TicketCard ticket={investorPass} />
            </div>
          </section>
        ) : null}

        {showGala ? (
          <section className="flex w-full flex-col items-start gap-[25px] pb-[20px]">
            <SectionLabel text="GALA & AWARD NIGHT PASSES" />
            <div className="grid w-full grid-cols-1 gap-[14px]">
              {galaPasses.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </section>
        ) : null}

        {showGroup ? (
          <section className="flex w-full flex-col items-start gap-[25px] pb-[20px]">
            <SectionLabel text="GROUP PASSES" />
            <div className="grid w-full grid-cols-1 gap-[14px]">
              {groupPasses.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </section>
        ) : null}

        <section
          className="space-y-5 border border-[#ffd966]/20 bg-[rgba(255,217,102,0.08)] px-5 py-6"
          id="contact-support"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-[1.5px] w-5 bg-[#f0f1f4]" />
            <span className="font-['Inter',sans-serif] text-[12px] tracking-[1.2px] text-[#f0f1f4]">
              CONTACT SUPPORT
            </span>
          </div>
          <div className="space-y-3">
            <h2 className="font-['Oswald',sans-serif] text-[32px] leading-[1.02] text-[#f0f1f4]">
              NEED ASSISTANCE?
            </h2>
            <p className="font-['Inter',sans-serif] text-[15px] leading-[1.6] text-[#a4c6e6]">
              For technical issues or registration enquiries, contact the
              support desk directly.
            </p>
            <a
              className="font-['Inter',sans-serif] text-[16px] font-semibold text-[#ffd966] underline"
              href="mailto:support@achieverssummit.africa"
            >
              support@achieverssummit.africa
            </a>
          </div>
          <FilledActionButton
            className="w-full justify-center"
            href="mailto:support@achieverssummit.africa"
            label="Email support"
          />
        </section>
      </MobilePageFrame>
    </div>
  );
}
