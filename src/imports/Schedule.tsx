"use client";

import Image from "next/image";
import { useState } from "react";

import scheduleBackgroundImage from "../assets/9a94605462226bd31c365fa846bd61d7daad5991.png";
import ariseNewsLogo from "../assets/1b1f795c112b646e853ef6e91307a07776ffd155.png";
import guardianLogo from "../assets/c2c7430ab03d6250f4a33933ad6087250cfe918d.png";
import tvcNewsLogo from "../assets/e3fb1d28ff7b189a557184ab906d97f3bd0ebbda.png";
import ScheduleMobilePage from "../app/components/mobile/ScheduleMobilePage";
import {
  additionalInfo,
  day1Schedule,
  day2Schedule,
  day3Schedule,
  stages,
  tracks,
  type HighlightBlock,
  type ScheduleItem,
  type ScheduleSession,
  type StageInfo,
  type TimeSlot,
  type TrackInfo,
} from "../app/components/schedule/schedule-data";

const dayButtons = [
  { label: "AUGUST 11 - DAY 1", value: 1 },
  { label: "AUGUST 12 - DAY 2", value: 2 },
  { label: "AUGUST 13 - GALA NIGHT", value: 3 },
] as const;

const dayHeadings = ["DAY ONE", "DAY TWO", "DAY THREE"] as const;
const schedules = [day1Schedule, day2Schedule, day3Schedule] as const;

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-[2.5px] w-9 bg-[#f0f1f4]" />
      <span className="font-['Inter',sans-serif] text-[16px] tracking-[1.6px] text-[#f0f1f4]">
        {label}
      </span>
    </div>
  );
}

function ScheduleHero({
  activeDay,
  onDayChange,
}: {
  activeDay: number;
  onDayChange: (day: number) => void;
}) {
  return (
    <section className="px-6 pb-16 pt-36 text-center md:px-24 md:pt-40">
      <div className="mx-auto flex max-w-[1248px] flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3">
          <SectionEyebrow label="SCHEDULE" />
        </div>

        <div className="flex flex-col items-center gap-8">
          <h1 className="font-['Oswald',sans-serif] text-[48px] font-bold leading-[1.05] text-[#f0f1f4] md:text-[72px]">
            SUMMIT SCHEDULE
          </h1>
          <p className="max-w-[800px] font-['Inter',sans-serif] text-[18px] font-medium tracking-tight text-[#a4c6e6] md:text-[24px]">
            THREE DAYS. FOUR STAGES. SIX TRACKS. ONE MOVEMENT.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {dayButtons.map((day) => {
            const isActive = activeDay === day.value;

            return (
              <button
                key={day.value}
                aria-pressed={isActive}
                className={`border px-6 py-3 font-['Inter',sans-serif] text-[16px] tracking-[0.36px] transition-all md:text-[18px] ${
                  isActive
                    ? "border-[#a4c6e6] bg-[#a4c6e6]/20 text-[#a4c6e6]"
                    : "border-[#a4c6e6]/50 bg-[#a4c6e6]/10 text-[#a4c6e6]/70 hover:border-[#a4c6e6] hover:text-[#a4c6e6]"
                }`}
                onClick={() => onDayChange(day.value)}
                type="button"
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SessionTag({ label }: { label: string }) {
  return (
    <span className="whitespace-nowrap border border-[#ffd966] px-3 py-1.5 font-['Inter',sans-serif] text-[14px] tracking-[0.8px] text-[#ffd966]">
      {label}
    </span>
  );
}

function SessionCard({ session }: { session: ScheduleSession }) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-4 bg-[#a4c6e6]/10 p-6">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <p className="font-['Inter',sans-serif] text-[15px] font-semibold tracking-tight text-[#f0f1f4]">
          {session.stage}
        </p>
        <p className="font-['Inter',sans-serif] text-[20px] font-semibold leading-tight text-[#a4c6e6] md:text-[24px]">
          {session.title}
          {session.subtitle ? (
            <span className="font-normal text-[#d4e2f0]"> - {session.subtitle}</span>
          ) : null}
        </p>
      </div>

      <div className="shrink-0 pt-1">
        <SessionTag label={session.tag} />
      </div>
    </div>
  );
}

function TimeSlotBlock({ slot }: { slot: TimeSlot }) {
  const hasParallelSessions = slot.sessions.length > 2;
  const hasTwoSessions = slot.sessions.length === 2;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-6 md:gap-10">
        <span className="shrink-0 font-['Inter',sans-serif] text-[20px] font-bold text-[#f0f1f4] md:text-[24px]">
          {slot.time}
        </span>
        <div className="h-px flex-1 bg-[#a4c6e6]" />
        <span className="shrink-0 whitespace-nowrap border border-[#a4c6e6] px-4 py-2 font-['Inter',sans-serif] text-[14px] tracking-[0.36px] text-[#a4c6e6] md:px-6 md:py-3 md:text-[16px]">
          {slot.label}
        </span>
      </div>

      {slot.sessions.length === 1 ? (
        <SessionCard session={slot.sessions[0]} />
      ) : null}

      {hasTwoSessions ? (
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
          {slot.sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : null}

      {hasParallelSessions ? (
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            {slot.sessions.slice(0, 2).map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            {slot.sessions.slice(2).map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HighlightBanner({ block }: { block: HighlightBlock }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 bg-[#ffd966]/10 p-6 md:flex-row md:px-6 md:py-10">
      <div className="flex flex-col gap-4">
        <h3 className="font-['Oswald',sans-serif] text-[24px] font-bold leading-tight text-[#ffd966] md:text-[32px]">
          {block.title}
        </h3>
        <p className="font-['Inter',sans-serif] text-[16px] tracking-[0.36px] text-[#f0f1f4] md:text-[18px]">
          {block.subtitle}
        </p>
      </div>

      {block.time ? (
        <span className="shrink-0 font-['Oswald',sans-serif] text-[24px] font-bold text-[#ffd966]/50 md:text-[32px]">
          {block.time}
        </span>
      ) : null}
    </div>
  );
}

function isTimeSlot(item: ScheduleItem): item is TimeSlot {
  return "sessions" in item;
}

function ScheduleTimeline({
  items,
  dayLabel,
}: {
  items: ScheduleItem[];
  dayLabel: string;
}) {
  return (
    <section className="px-6 pb-16 md:px-24">
      <div className="mx-auto flex max-w-[1248px] flex-col gap-12">
        <div className="flex flex-col gap-8">
          <SectionEyebrow label="SCHEDULE" />
          <h2 className="font-['Oswald',sans-serif] text-[36px] font-semibold leading-[1.05] text-[#f0f1f4] md:text-[48px]">
            {dayLabel}
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {items.map((item) =>
            isTimeSlot(item) ? (
              <TimeSlotBlock key={item.id} slot={item} />
            ) : (
              <HighlightBanner key={item.id} block={item} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function StageCard({ stage }: { stage: StageInfo }) {
  return (
    <div className="flex flex-col gap-4 p-8 md:p-10">
      <span className="font-['Inter',sans-serif] text-[14px] tracking-[0.8px] text-[#f0f1f4]">
        STAGE {stage.number}
      </span>
      <h3 className="font-['Oswald',sans-serif] text-[24px] font-bold leading-tight text-[#ffd966] md:text-[32px]">
        {stage.name}
      </h3>
      <ul className="ml-6 flex list-disc flex-col gap-1">
        {stage.bullets.map((bullet) => (
          <li
            key={bullet}
            className="font-['Inter',sans-serif] text-[16px] tracking-[0.36px] text-[#f0f1f4]"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StagesSection() {
  return (
    <section className="px-6 py-16 md:px-24">
      <div className="mx-auto flex max-w-[1248px] flex-col gap-12">
        <div className="flex flex-col gap-8">
          <SectionEyebrow label="VENUE LAYOUT" />
          <h2 className="font-['Oswald',sans-serif] text-[36px] font-semibold leading-[1.05] text-[#f0f1f4] md:text-[48px]">
            FOUR STAGES
          </h2>
        </div>

        <div className="grid grid-cols-1 bg-[#ffd966]/10 md:grid-cols-2">
          {stages.map((stage) => (
            <StageCard key={stage.number} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackCard({ track }: { track: TrackInfo }) {
  return (
    <div className="flex flex-col gap-4 p-8 md:p-10">
      <span className="font-['Oswald',sans-serif] text-[36px] font-semibold text-[#ffd966]/50 md:text-[48px]">
        {track.number}
      </span>
      <h3 className="font-['Inter',sans-serif] text-[24px] font-semibold leading-tight text-[#a4c6e6] md:text-[28px]">
        {track.name}
      </h3>
      <p className="font-['Inter',sans-serif] text-[16px] leading-relaxed tracking-[0.36px] text-[#f0f1f4]">
        {track.description}
      </p>
    </div>
  );
}

function TracksSection() {
  return (
    <section className="px-6 py-16 md:px-24">
      <div className="mx-auto flex max-w-[1248px] flex-col gap-12">
        <div className="flex flex-col gap-8">
          <SectionEyebrow label="BEYOND THE MAIN STAGE" />
          <h2 className="font-['Oswald',sans-serif] text-[36px] font-semibold leading-[1.05] text-[#f0f1f4] md:text-[48px]">
            SIX TRACKS
          </h2>
        </div>

        <div className="grid grid-cols-1 bg-[#a4c6e6]/10 md:grid-cols-2">
          {tracks.map((track) => (
            <TrackCard key={track.number} track={track} />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {additionalInfo.map((info) => (
            <div
              key={info.label}
              className="flex flex-col justify-between gap-2 border border-[#a4c6e6] bg-[#a4c6e6]/10 p-5 md:flex-row md:items-center"
            >
              <span className="font-['Inter',sans-serif] text-[16px] font-semibold tracking-[0.72px] text-[#f0f1f4]">
                {info.label}
              </span>
              <span className="font-['Inter',sans-serif] text-[18px] font-medium tracking-tight text-[#a4c6e6] md:text-[20px]">
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaPartners() {
  return (
    <section className="px-6 py-16 md:px-24">
      <div className="mx-auto flex max-w-[1248px] flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-8 text-center">
          <SectionEyebrow label="MEDIA PARTNERS" />
          <h2 className="font-['Oswald',sans-serif] text-[36px] font-semibold leading-[1.05] text-[#f0f1f4] md:text-[48px]">
            OFFICIAL MEDIA PARTNERS
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <Image
            alt="The Guardian"
            className="h-[80px] w-auto object-contain md:h-[120px]"
            src={guardianLogo}
          />
          <Image
            alt="Arise News"
            className="h-[80px] w-auto object-contain md:h-[120px]"
            src={ariseNewsLogo}
          />
          <Image
            alt="TVC News"
            className="h-[60px] w-auto object-contain md:h-[100px]"
            src={tvcNewsLogo}
          />
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section className="px-6 py-16 md:px-24">
      <div className="mx-auto flex max-w-[1248px] flex-col items-center gap-8 bg-[#ffd966]/10 px-6 py-12 text-center md:px-12">
        <SectionEyebrow label="CONTACT SUPPORT" />
        <h2 className="font-['Oswald',sans-serif] text-[36px] font-semibold leading-[1.05] text-[#f0f1f4] md:text-[48px]">
          NEED ASSISTANCE?
        </h2>
        <p className="max-w-[800px] font-['Inter',sans-serif] text-[18px] font-medium tracking-tight text-[#f0f1f4] md:text-[24px]">
          For technical issues or registration inquiries, please contact our
          support desk at{" "}
          <a
            className="font-bold text-[#a4c6e6] underline"
            href="mailto:support@achieverssummit.africa"
          >
            support@achieverssummit.africa
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <>
      <ScheduleMobilePage />
      <div className="hidden md:block">
        <div className="relative isolate overflow-hidden bg-[#050b11]">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <Image
              alt=""
              className="object-cover opacity-40"
              fill
              priority
              sizes="100vw"
              src={scheduleBackgroundImage}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050b11]/60 via-[#050b11]/80 to-[#050b11]" />
          </div>

          <div className="relative z-10">
            <ScheduleHero activeDay={activeDay} onDayChange={setActiveDay} />
            <ScheduleTimeline
              dayLabel={dayHeadings[activeDay - 1]}
              items={schedules[activeDay - 1]}
            />
            <StagesSection />
            <TracksSection />
            <MediaPartners />
            <SupportSection />
          </div>
        </div>
      </div>
    </>
  );
}
