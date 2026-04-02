"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import svgPaths from "../../../imports/svg-d59ucq01a4";
import {
  FilledActionButton,
  OutlinedActionButton,
} from "../ui/action-button";
import { cn } from "../ui/utils";

const mobileNavLinks = [
  { href: "/", label: "Home" },
  { href: "/speakers", label: "Speakers" },
  { href: "/schedule", label: "Schedule" },
  { href: "/tickets", label: "Tickets" },
  { href: "/awards", label: "Awards" },
  { href: "/get-involved", label: "Get Involved" },
] as const;

type SvgPathKey = keyof typeof svgPaths;

const SITE_LOGO_KEYS: readonly SvgPathKey[] = [
  "p29b7f5c0",
  "p36c93572",
  "p18710ab2",
  "p2b892e00",
  "p9d47a9",
  "p235c1a80",
  "p7caf500",
  "p2ea08c0",
  "p2b289840",
  "p1d95f110",
  "pc116300",
  "p3e342200",
  "p18717c00",
  "p86cad72",
  "p31cd8080",
  "p8d0f690",
  "p3b7fa680",
  "pca4c3c0",
  "p2dddc480",
  "pd6575c0",
  "p2273acf0",
  "p26460100",
  "p232cbb00",
  "p1cf9ed00",
  "p3fdcac00",
  "pacfcb00",
  "p20ec5a00",
  "p327cabc0",
  "pf00080",
  "p2c80e880",
  "p2a7e1e00",
  "p19d6a400",
  "p33096e00",
  "p3c3c6b00",
];

function MobileSiteMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-[80] bg-[#050b11]/90 backdrop-blur-sm md:hidden pointer-events-auto">
      <div className="mx-auto flex w-full max-w-[420px] items-center justify-between px-3 py-4 pointer-events-auto">
        <Link
          aria-label="Go to homepage"
          className="relative block h-[40px] w-[71.209px] shrink-0"
          href="/"
        >
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.2088 40">
            <g>
              {SITE_LOGO_KEYS.map((key) => (
                <path key={key} d={svgPaths[key]} fill="#F0F1F4" />
              ))}
            </g>
          </svg>
        </Link>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="relative z-[81] flex h-10 w-10 items-center justify-center text-[#f0f1f4] pointer-events-auto"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen ? (
        <nav className="border-t border-[#a4c6e6]/20 bg-[#050b11] px-4 pb-6 md:hidden pointer-events-auto">
          {mobileNavLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                className={cn(
                  "block border-b border-[#a4c6e6]/10 py-3 text-[16px]",
                  isActive ? "text-[#a4c6e6]" : "text-[#f0f1f4]",
                )}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}

export function MobilePageFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <MobileSiteMenu />
      <div
        className={cn(
          "relative z-10 mx-auto flex w-[calc(100%-24px)] max-w-[420px] flex-col gap-16 pb-16 pt-[104px]",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export function MobileSectionLabel({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="h-[1.5px] w-5 bg-[#f0f1f4]" />
      <span className="font-['Inter',sans-serif] text-[12px] tracking-[1.2px] text-[#f0f1f4]">
        {text}
      </span>
    </div>
  );
}

export function MobileActionRow({
  primaryHref = "/tickets",
  primaryLabel = "Get your ticket",
  secondaryBorderClassName = "border-[#f0f1f4]",
  secondaryHref = "/get-involved#become-a-sponsor",
  secondaryLabel = "Become a sponsor",
  secondaryTextClassName = "text-[#f0f1f4]",
  className,
}: {
  className?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryBorderClassName?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryTextClassName?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <FilledActionButton
        className="w-full justify-center"
        href={primaryHref}
        label={primaryLabel}
      />
      <OutlinedActionButton
        borderClassName={secondaryBorderClassName}
        className="w-full"
        href={secondaryHref}
        label={secondaryLabel}
        textClassName={secondaryTextClassName}
      />
    </div>
  );
}

export function MobilePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-[#a4c6e6]/35 bg-[rgba(164,198,230,0.08)] p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
