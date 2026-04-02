"use client";

import { useMemo, useState } from "react";

import {
  additionalInfo,
  day1Schedule,
  day2Schedule,
  day3Schedule,
  stages,
  tracks,
  type HighlightBlock,
  type ScheduleItem,
  type TimeSlot,
} from "../schedule/schedule-data";
import { cn } from "../ui/utils";
import {
  MobileActionRow,
  MobilePageFrame,
  MobilePanel,
  MobileSectionLabel,
} from "./shared";

const DAY_OPTIONS = [
  { label: "August 11 · Day 1", value: 0 },
  { label: "August 12 · Day 2", value: 1 },
  { label: "August 13 · Gala Night", value: 2 },
] as const;

const SCHEDULES = [day1Schedule, day2Schedule, day3Schedule] as const;

function isHighlight(item: ScheduleItem): item is HighlightBlock {
  return "type" in item;
}

function isTimeSlot(item: ScheduleItem): item is TimeSlot {
  return "sessions" in item;
}

export default function ScheduleMobilePage() {
  const [activeDay, setActiveDay] = useState(0);

  const activeSchedule = useMemo(() => SCHEDULES[activeDay], [activeDay]);

  return (
    <div className="bg-[#050b11] md:hidden">
      <MobilePageFrame className="gap-14 pb-20">
        <section className="space-y-6">
          <MobileSectionLabel text="SCHEDULE" />
          <div className="space-y-4">
            <h1 className="font-['Oswald',sans-serif] text-[36px] leading-[1.02] text-[#f0f1f4]">
              SUMMIT SCHEDULE
            </h1>
            <p className="font-['Inter',sans-serif] text-[16px] leading-[1.6] text-[#a4c6e6]">
              Three days. Four stages. Six content tracks. One tightly packed
              programme.
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {DAY_OPTIONS.map((option) => {
              const isActive = activeDay === option.value;

              return (
                <button
                  key={option.value}
                  aria-pressed={isActive}
                  className={cn(
                    "shrink-0 border px-4 py-3 font-['Inter',sans-serif] text-[14px] tracking-[0.36px] transition-colors",
                    isActive
                      ? "border-[#a4c6e6] bg-[#a4c6e6]/20 text-[#a4c6e6]"
                      : "border-[#a4c6e6]/35 bg-[rgba(164,198,230,0.08)] text-[#f0f1f4]",
                  )}
                  onClick={() => setActiveDay(option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          {activeSchedule.map((item) =>
            isHighlight(item) ? (
              <div
                key={item.id}
                className="border border-[#ffd966]/25 bg-[rgba(255,217,102,0.08)] px-4 py-5"
              >
                {item.time ? (
                  <p className="font-['Inter',sans-serif] text-[12px] tracking-[1px] text-[#ffd966]">
                    {item.time}
                  </p>
                ) : null}
                <h2 className="mt-2 font-['Oswald',sans-serif] text-[24px] leading-[1.02] text-[#f0f1f4]">
                  {item.title}
                </h2>
                <p className="mt-3 font-['Inter',sans-serif] text-[14px] leading-[1.6] text-[#a4c6e6]">
                  {item.subtitle}
                </p>
              </div>
            ) : isTimeSlot(item) ? (
              <MobilePanel key={item.id} className="space-y-4">
                <div className="space-y-2">
                  <p className="font-['Inter',sans-serif] text-[12px] tracking-[1px] text-[#ffd966]">
                    {item.time}
                  </p>
                  <p className="font-['Inter',sans-serif] text-[12px] tracking-[1px] text-[#7891a8]">
                    {item.label}
                  </p>
                </div>

                <div className="space-y-4">
                  {item.sessions.map((session) => (
                    <div
                      key={session.id}
                      className="space-y-3 border-t border-[#f0f1f4]/10 pt-4 first:border-t-0 first:pt-0"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="border border-[#ffd966]/35 px-2 py-1 font-['Inter',sans-serif] text-[10px] tracking-[0.8px] text-[#ffd966]">
                          {session.tag}
                        </span>
                        <span className="font-['Inter',sans-serif] text-[11px] tracking-[0.72px] text-[#7891a8]">
                          {session.stage}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-['Oswald',sans-serif] text-[24px] leading-[1.05] text-[#f0f1f4]">
                          {session.title}
                        </h3>
                        {session.subtitle ? (
                          <p className="font-['Inter',sans-serif] text-[14px] leading-[1.55] text-[#a4c6e6]">
                            {session.subtitle}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </MobilePanel>
            ) : null,
          )}
        </section>

        <section className="space-y-5">
          <MobileSectionLabel text="STAGES" />
          {stages.map((stage) => (
            <MobilePanel key={stage.number} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-['Oswald',sans-serif] text-[24px] leading-none text-[#ffd966]">
                  {stage.number}
                </span>
                <h2 className="font-['Oswald',sans-serif] text-[24px] leading-[1.05] text-[#f0f1f4]">
                  {stage.name}
                </h2>
              </div>
              <div className="space-y-3">
                {stage.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#a4c6e6]" />
                    <p className="font-['Inter',sans-serif] text-[14px] leading-[1.55] text-[#a4c6e6]">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </MobilePanel>
          ))}
        </section>

        <section className="space-y-5">
          <MobileSectionLabel text="TRACKS" />
          {tracks.map((track) => (
            <MobilePanel key={track.number} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-['Oswald',sans-serif] text-[24px] leading-none text-[#ffd966]">
                  {track.number}
                </span>
                <h2 className="font-['Oswald',sans-serif] text-[24px] leading-[1.05] text-[#f0f1f4]">
                  {track.name}
                </h2>
              </div>
              <p className="font-['Inter',sans-serif] text-[14px] leading-[1.6] text-[#a4c6e6]">
                {track.description}
              </p>
            </MobilePanel>
          ))}
        </section>

        <section className="space-y-4 border border-[#ffd966]/20 bg-[rgba(255,217,102,0.08)] px-5 py-6">
          <MobileSectionLabel text="ADDITIONAL INFO" />
          <div className="space-y-4">
            {additionalInfo.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="font-['Inter',sans-serif] text-[12px] tracking-[1px] text-[#ffd966]">
                  {item.label}
                </p>
                <p className="font-['Inter',sans-serif] text-[15px] leading-[1.55] text-[#f0f1f4]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <MobileActionRow
            primaryHref="/tickets"
            primaryLabel="Get your ticket"
            secondaryHref="/get-involved#become-a-sponsor"
            secondaryLabel="Become a sponsor"
          />
        </section>
      </MobilePageFrame>
    </div>
  );
}
