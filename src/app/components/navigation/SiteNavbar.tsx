import Link from "next/link";

import svgPaths from "../../../imports/svg-d59ucq01a4";
import { HeaderActionButtons } from "../ui/action-button";
import { SITE_NAV_LINKS } from "./site-links";

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

export default function SiteNavbar() {
  return (
    <header className="absolute left-1/2 top-0 z-20 w-full max-w-[1440px] -translate-x-1/2 px-6 py-[30px] md:px-10 xl:px-[96px]">
      <nav aria-label="Primary" className="content-stretch flex items-center justify-between">
        <Link
          aria-label="Go to homepage"
          className="block h-[40px] relative shrink-0 w-[71.209px]"
          data-name="Vector"
          href="/"
        >
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.2088 40">
            <g id="Vector">
              {SITE_LOGO_KEYS.map((key) => (
                <path key={key} d={svgPaths[key]} fill="#F0F1F4" />
              ))}
            </g>
          </svg>
        </Link>

        <ul className="content-stretch hidden gap-8 items-start justify-end px-[24px] py-[12px] relative shrink-0 lg:flex xl:gap-[60px]">
          {SITE_NAV_LINKS.map((link) => (
            <li key={link.label} className="content-stretch flex items-center justify-center relative shrink-0 list-none">
              <Link
                className="font-['Inter:Regular',sans-serif] font-normal leading-[1.02] not-italic relative shrink-0 text-[#f0f1f4] text-[16px] text-center tracking-[0.8px] whitespace-nowrap transition-colors hover:text-[#a4c6e6]"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <HeaderActionButtons className="hidden md:flex xl:gap-[52px]" />
      </nav>
    </header>
  );
}
