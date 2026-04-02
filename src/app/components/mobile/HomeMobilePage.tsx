"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";

import heroBackgroundImage from "../../../assets/9a94605462226bd31c365fa846bd61d7daad5991.png";
import guinnessWorldRecordsLogo from "../../../assets/6cb05554d847983ba98df62bf618e0ed09416277.png";
import eafLogoImage from "../../../assets/cd2a5db059ae679241c5bf9c0ef2f6f10a763154.png";
import galaAwardsImage from "../../../assets/40f51e4ed0f594a247768f9083463e03f4e1f69f.png";
import investorDealRoomImage from "../../../assets/0f1ad41e769990f5a72dce9044fd4b883f226dd2.png";
import ideaPitchImage from "../../../assets/b5ecab226d6ca5b9df6b2fbc32e9ed7bcfa59b2a.png";
import eaiShowcaseImage from "../../../assets/0422e9f3cfd48efb086c69a8f846ae0bb6a2e413.png";
import {
  MobileActionRow,
  MobilePageFrame,
  MobilePanel,
  MobileSectionLabel,
} from "./shared";

const HOME_TVC_EMBED_URL = "https://www.youtube.com/embed/2eujHrQJ_ok?rel=0";

const stats = [
  { value: "5,000+", label: "Attendees" },
  { value: "25,000+", label: "Virtual audience" },
  { value: "50+", label: "Speakers" },
  { value: "6", label: "Content Tracks" },
  { value: "4", label: "Stages" },
] as const;

const tracks = [
  "Technology, AI & Innovation",
  "Media, Content & Digital Storytelling",
  "Creative Economy, Design & Culture",
  "Governance, Policy & Civic Leadership",
  "Business, Finance & Entrepreneurship",
  "Leadership, Education & The Future of Work",
] as const;

const scheduleDays = [
  {
    date: "11th AUGUST",
    day: "Day 1",
    details:
      "Main Summit Event · 4 Stages Active from 10:45 AM · Venue Opens 8:00 AM",
  },
  {
    date: "12th AUGUST",
    day: "Day 2",
    details:
      "Three Keynotes · Four Stages · 100 Under 40 Awards · Guinness World Records Attempt · International Youth Day",
  },
  {
    date: "13th AUGUST",
    day: "Day 3",
    details:
      "Investors Roundtable & Deal Room (12 PM) · Red Carpet (4 PM) · Gala & Awards Night (7 PM)",
  },
] as const;

const faqQuestions = [
  "When and where is the Achievers Summit 2026?",
  "What is the 100 Under 40 Awards?",
  "What is the Guinness World Records attempt?",
  "What ticket options are available?",
  "Can I attend virtually?",
  "Who should attend the Achievers Summit?",
  "What is the Deal Room and who can access it?",
  "How do I apply to speak?",
  "Are sponsorship opportunities still available?",
] as const;

const initiatives: Array<{
  description: string;
  headline?: string;
  image?: StaticImageData;
  title: string;
}> = [
  {
    description:
      "Honouring 100 outstanding achievers under 40 drawn from business, governance, arts, technology and social impact. Celebrated at the Gala Night on August 13.",
    headline: "Africa's most prestigious award of young excellence",
    title: "100UNDER40 AWARDS",
  },
  {
    description:
      "All 5,000+ attendees will participate in an official Guinness World Records attempt. Category revealed one month before the Summit. All participants receive official certificates.",
    headline:
      "On August 12 — International Youth Day and Convener Emmanuel Agida's birthday",
    image: guinnessWorldRecordsLogo,
    title: "GUINNESS WORLD RECORD ATTEMPT",
  },
  {
    description:
      "The Achievers Summit CSR Foodbank Drive collects and distributes food supplies to families in the Makoko community, Lagos.",
    headline: "Community impact beyond the stage",
    image: eafLogoImage,
    title: "MAKOKO FOODBANK DRIVE",
  },
  {
    description:
      "A black-tie celebration closing the summit in style with awards, headline entertainment, gala dinner and cocktail reception.",
    headline: "The room shifts from summit to ceremony",
    image: galaAwardsImage,
    title: "GALA & AWARDS NIGHT",
  },
  {
    description:
      "A private session where serious capital meets serious founders. Accessible only to First Class pass holders and verified investors.",
    headline: "The summit's highest-stakes private room",
    image: investorDealRoomImage,
    title: "INVESTOR ROUNDTABLE & DEAL ROOM",
  },
  {
    description:
      "A structured slot for founders, social entrepreneurs, students and innovators to pitch to a panel of judges with real support on the line.",
    headline: "Competition, exposure and opportunity in one platform",
    image: ideaPitchImage,
    title: "IDEA PITCH",
  },
];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const difference = Math.max(0, targetDate.getTime() - Date.now());

      setTimeLeft({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference % 86400000) / 3600000),
        minutes: Math.floor((difference % 3600000) / 60000),
        seconds: Math.floor((difference % 60000) / 1000),
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function MobileSectionTitle({ text }: { text: string }) {
  return (
    <h2 className="w-full font-['Oswald',sans-serif] text-[28px] font-semibold leading-[1.1] text-[#f0f1f4]">
      {text}
    </h2>
  );
}

function MobileArrowButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      className="flex h-[40px] shrink-0 items-center justify-center gap-[10px] bg-[#a4c6e6] px-[14px] py-[12px]"
      href={href}
    >
      <span className="font-['Inter',sans-serif] text-[16px] font-bold leading-none tracking-[-0.96px] text-[#050b11] whitespace-nowrap">
        {label}
      </span>
      <ArrowRight className="size-[20px] text-[#050b11]" strokeWidth={2.2} />
    </Link>
  );
}

function ScheduleDayCard({
  date,
  day,
  details,
}: {
  date: string;
  day: string;
  details: string;
}) {
  return (
    <div className="relative flex w-full flex-col items-start bg-[rgba(164,198,230,0.1)] p-[24px]">
      <div className="pointer-events-none absolute inset-0 border border-[#a4c6e6]" />
      <div className="flex w-full flex-col items-start gap-[20px] text-[#f0f1f4]">
        <div className="flex items-center gap-[20px] whitespace-nowrap text-center">
          <span className="font-['Inter',sans-serif] text-[18px] font-medium leading-[1.4] tracking-[-1.08px]">
            {day}
          </span>
          <span className="font-['Inter',sans-serif] text-[20px] font-semibold leading-[1.2]">
            {date}
          </span>
        </div>
        <p className="w-full text-right font-['Inter',sans-serif] text-[16px] font-medium leading-[1.5] tracking-[0.32px] text-[#f0f1f4]">
          {details}
        </p>
      </div>
    </div>
  );
}

function MobileFaqPlusIcon() {
  return (
    <div className="relative size-[24px] shrink-0">
      <div className="absolute left-1/2 top-1/4 h-[12px] w-[2px] -translate-x-[1px]">
        <svg className="block size-full" fill="none" viewBox="0 0 2 14">
          <path
            d="M1 1V13"
            stroke="#F0F1F4"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute left-1/4 top-1/2 h-[2px] w-[12px] -translate-y-[1px]">
        <svg className="block size-full" fill="none" viewBox="0 0 14 2">
          <path
            d="M1 1H13"
            stroke="#F0F1F4"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

function MobileFaqItem({ question }: { question: string }) {
  return (
    <div className="flex w-full items-start gap-[15px] border-b border-[rgba(164,198,230,0.2)] py-[24px]">
      <p className="flex-1 font-['Inter',sans-serif] text-[16px] font-medium leading-[1.5] tracking-[0.32px] text-[#f0f1f4]">
        {question}
      </p>
      <MobileFaqPlusIcon />
    </div>
  );
}

export default function HomeMobilePage() {
  const targetDate = useMemo(() => new Date("2026-08-11T00:00:00"), []);
  const countdown = useCountdown(targetDate);

  return (
    <div className="relative isolate overflow-hidden bg-[#050b11] md:hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          alt=""
          className="object-cover object-center opacity-35"
          fill
          priority
          sizes="100vw"
          src={heroBackgroundImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,11,17,0.38)_0%,rgba(5,11,17,0.78)_36%,#050b11_100%)]" />
      </div>

      <MobilePageFrame className="gap-20 pb-20 pt-[96px]">
        <section className="flex flex-col gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 border border-[#a4c6e6] bg-[rgba(164,198,230,0.12)] px-3 py-2 font-['Inter',sans-serif] text-[13px] tracking-[0.4px] text-[#f0f1f4]">
              <span>August 11-13, 2026</span>
            </div>
            <div className="inline-flex items-center gap-2 border border-[#a4c6e6] bg-[rgba(164,198,230,0.12)] px-3 py-2 font-['Inter',sans-serif] text-[13px] tracking-[0.4px] text-[#f0f1f4]">
              <span>Lagos, Nigeria</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="font-['Oswald',sans-serif] text-[36px] leading-[1.02] text-[#f0f1f4]">
              AFRICA'S MOST INFLUENTIAL LEADERSHIP AND ENTREPRENEURSHIP SUMMIT
            </h1>
            <p className="font-['Inter',sans-serif] text-[18px] font-medium leading-[1.45] tracking-[-0.72px] text-[#a4c6e6]">
              A 3-day high-level experience uniting innovators, policymakers,
              and changemakers redefining the African narrative.
            </p>
          </div>

          <MobileActionRow />

          <div>
            <p className="mb-3 text-[16px] tracking-wide text-[#f0f1f4]">
              EVENT STARTS IN
            </p>
            <div className="flex justify-center gap-6">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Min", value: countdown.minutes },
                { label: "Sec", value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-['Oswald',sans-serif] text-[24px] leading-[1.1] text-[#f0f1f4] md:text-[32px]">
                    {String(item.value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[14px] tracking-wide text-[#f0f1f4]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="-mx-3 bg-[#f0f1f4] px-4 py-16 text-[#050b11]">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-[108px] text-center">
                  <p className="font-['Oswald',sans-serif] text-[36px] leading-[1.1] text-[#050b11]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[18px] text-[#050b11]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-xl text-center">
              <div className="mb-8 aspect-video w-full overflow-hidden rounded bg-[#d9d9d9]">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={HOME_TVC_EMBED_URL}
                  title="Achievers Summit TVC"
                />
              </div>
              <Link
                className="mb-12 inline-flex items-center gap-2 bg-[#a4c6e6] px-5 py-3 tracking-[-0.96px] text-[#050b11]"
                href="#"
              >
                <span>Download summit prospectus</span>
                <ArrowRight size={18} strokeWidth={2.2} />
              </Link>
              <blockquote className="mb-4 text-[16px] leading-[1.5] tracking-wide text-[#050b11]">
                "The conversation Africa needs is not happening in boardrooms behind closed doors. It is happening here — in the open, with urgency, and with the next generation in the room."
              </blockquote>
              <p className="text-right text-[18px] text-[#050b11]">
                —Emmanuel Agida, Convener
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <MobileSectionLabel text="CONTENT TRACKS" />
          <h2 className="font-['Oswald',sans-serif] text-[32px] leading-[1.02] text-[#f0f1f4]">
            6 CONTENT TRACKS
          </h2>
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <MobilePanel
                key={track}
                className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-x-4 px-4 py-5"
              >
                <span className="font-['Inter',sans-serif] text-[13px] tracking-[1px] text-[#f0f1f4] text-left">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-['Inter',sans-serif] text-[15px] leading-[1.45] text-[#a4c6e6] text-right uppercase">
                  {track}
                </p>
              </MobilePanel>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <MobileSectionLabel text="CATALYZING A GENERATIONAL LEGACY" />
          <h2 className="font-['Oswald',sans-serif] text-[32px] leading-[1.02] text-[#f0f1f4]">
            SUMMIT HIGHLIGHT & INITIATIVES
          </h2>
          <div className="space-y-4">
            {initiatives.map((initiative) => (
              <div
                key={initiative.title}
                className="rounded-[20px] bg-[#f0f1f4] px-6 py-7 text-[#050b11]"
              >
                <div className="flex items-start gap-4">
                  {initiative.image ? (
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                      <Image
                        alt=""
                        className="object-contain"
                        fill
                        sizes="80px"
                        src={initiative.image}
                      />
                    </div>
                  ) : null}
                  <div className="space-y-2">
                    <h3 className="font-['Inter',sans-serif] text-[18px] leading-[1.15] text-[#050b11]">
                      {initiative.title}
                    </h3>
                    {initiative.headline ? (
                      <p className="font-['Inter',sans-serif] text-[17px] leading-[1.3] text-[#050b11]">
                        {initiative.headline}
                      </p>
                    ) : null}
                  </div>
                </div>
                <p className="mt-5 font-['Inter',sans-serif] text-[17px] leading-[1.45] text-[#050b11]">
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex w-full flex-col items-start gap-[40px] pb-[60px]">
          <MobileSectionLabel text="SPONSORS" />
          <div className="flex w-full flex-col items-start gap-[25px]">
            <h2 className="font-['Oswald',sans-serif] text-[32px] leading-[1.02] text-[#f0f1f4]">
              SPONSORS REVEAL (COMING SOON)
            </h2>
            <Link
              className="bg-[#ffd966] px-[14px] py-[12px] font-['Inter',sans-serif] text-[16px] font-bold tracking-[-0.96px] text-[#050b11]"
              href="/get-involved#become-a-sponsor"
            >
              Become a sponsor
            </Link>
          </div>
        </section>

        <section className="flex w-full flex-col items-start pb-[60px]">
          <div className="flex flex-col items-start gap-[60px]">
            <div className="flex w-full flex-col items-start gap-[25px]">
              <MobileSectionLabel text="SCHEDULE" />
              <MobileSectionTitle text="3-DAY PROGRAMME" />
              <div className="flex w-full items-start gap-[20px]">
                <MobileArrowButton href="/tickets" label="Get your ticket" />
                <Link
                  className="relative px-[14px] py-[12px] font-['Inter',sans-serif] text-[16px] font-bold tracking-[-0.96px] text-[#ffd966] whitespace-nowrap"
                  href="/get-involved#apply-to-speak"
                >
                  <div className="pointer-events-none absolute inset-0 border border-[#ffd966]" />
                  Apply to speak
                </Link>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-[20px]">
              {scheduleDays.map((item) => (
                <ScheduleDayCard
                  key={item.day}
                  date={item.date}
                  day={item.day}
                  details={item.details}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative left-1/2 right-1/2 flex w-screen -translate-x-1/2 flex-col items-start justify-center gap-[45px] bg-[rgba(164,198,230,0.1)] px-0 py-[48px]">
          <div className="flex w-full flex-col items-center gap-[25px]">
            <div className="flex w-full items-center gap-[10px]">
              <div className="h-[1.5px] w-[20px] shrink-0 bg-[#f0f1f4]" />
              <p className="font-['Inter',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] text-[#f0f1f4] whitespace-nowrap">
                ABOUT EAI
              </p>
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-[25px]">
              <div className="h-[124px] w-[177px] overflow-hidden">
                <Image
                  alt="EAI Logo"
                  className="-ml-[45px] -mt-[40px] h-[204px] w-[204px] object-cover"
                  height={204}
                  src={eaiShowcaseImage}
                  width={204}
                />
              </div>
              <div className="flex w-full flex-col items-start gap-[20px]">
                <h2 className="w-full font-['Oswald',sans-serif] text-[28px] font-semibold leading-[1.1] text-[#ffd966]">
                  ABOUT EMMANUEL AGIDA INTERNATIONAL
                </h2>
                <p className="font-['Inter',sans-serif] text-[18px] font-medium leading-[1.4] tracking-[-1.08px] text-[#f0f1f4] text-justify">
                  EAI operates at the intersection of leadership, strategy,
                  innovation, governance, and development, providing advisory
                  services and implementing programs that drive sustainable
                  growth, institutional excellence, and societal transformation.
                </p>
              </div>
            </div>
          </div>
          <MobileArrowButton href="/get-involved" label="Learn more" />
        </section>

        <section className="flex w-full flex-col items-start gap-[25px]">
          <MobileSectionLabel text="FREQUENTLY ASKED QUESTIONS" />
          <MobileSectionTitle text="EVERYTHING YOU NEED TO KNOW" />
          <div className="flex w-full flex-col items-start">
            {faqQuestions.map((question) => (
              <MobileFaqItem key={question} question={question} />
            ))}
          </div>
        </section>

        <section className="space-y-6 border border-[#ffd966]/20 bg-[rgba(255,217,102,0.08)] px-5 py-6">
          <MobileSectionLabel text="READY TO BOARD?" />
          <div className="space-y-4">
            <h2 className="font-['Oswald',sans-serif] text-[32px] leading-[1.02] text-[#f0f1f4]">
              YOUR SEAT AT THE TABLE IS WAITING
            </h2>
            <p className="font-['Inter',sans-serif] text-[16px] leading-[1.55] text-[#a4c6e6]">
              Three days. Four stages. One conversation that changes how the
              next chapter of Africa is built.
            </p>
          </div>
          <MobileActionRow />
        </section>
      </MobilePageFrame>
    </div>
  );
}
