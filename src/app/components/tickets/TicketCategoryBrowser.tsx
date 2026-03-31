"use client";

import { type ReactNode, useState } from "react";

import { cn } from "../ui/utils";

type TicketCategory = "all" | "summit" | "gala" | "group";

type TicketCategoryBrowserProps = {
  galaNight: ReactNode;
  group: ReactNode;
  summit: ReactNode;
};

const CATEGORY_OPTIONS: ReadonlyArray<{
  label: string;
  value: TicketCategory;
}> = [
  { label: "All Passes", value: "all" },
  { label: "Summit", value: "summit" },
  { label: "Gala Night", value: "gala" },
  { label: "Group", value: "group" },
];

export default function TicketCategoryBrowser({
  galaNight,
  group,
  summit,
}: TicketCategoryBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<TicketCategory>("all");

  const sections = activeCategory === "all"
    ? (
        <>
          {summit}
          {galaNight}
          {group}
        </>
      )
    : activeCategory === "summit"
      ? summit
      : activeCategory === "gala"
        ? galaNight
        : group;

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1248px] flex-col items-center gap-[60px]">
      <div className="relative w-full max-w-[777px] bg-[rgba(255,217,102,0.1)] p-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 border border-[#a4c6e6] border-solid pointer-events-none"
        />
        <div className="relative flex flex-wrap items-center justify-center gap-3">
          {CATEGORY_OPTIONS.map((option) => {
            const isActive = activeCategory === option.value;

            return (
              <button
                key={option.value}
                aria-pressed={isActive}
                className={cn(
                  "px-[24px] py-[12px] font-['Inter:Semi_Bold',sans-serif] text-[19px] font-semibold leading-[1.02] tracking-[-1.14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4c6e6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b11]",
                  isActive
                    ? "bg-[#a4c6e6] text-[#050b11]"
                    : "bg-transparent text-[#f0f1f4] hover:bg-[rgba(164,198,230,0.14)]",
                )}
                onClick={() => setActiveCategory(option.value)}
                type="button"
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        {sections}
      </div>
    </div>
  );
}
