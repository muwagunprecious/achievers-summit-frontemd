import footerBackgroundImage from "../../../assets/54dc54e70d7c6c97156869d642c5acd90ba03655.png";
import svgPaths from "../../../imports/svg-d59ucq01a4";

type SvgPathKey = keyof typeof svgPaths;

const FOOTER_PATTERN_KEYS: readonly SvgPathKey[] = [
  "p43f3cf2",
  "p317ae700",
  "p116ee600",
  "p292694c0",
  "p10ec7700",
  "p785ef00",
  "p3d327100",
  "p24775e00",
  "p13f4ec00",
  "p9454900",
  "p9b9ccc0",
  "p397d0700",
  "p202d0e70",
  "p2f194c80",
  "p25cd2a30",
  "pb3ab040",
  "p1faf9b00",
  "p4044d80",
  "p11eedd80",
  "p8ee4700",
  "p2c4e5e00",
  "p2c216180",
  "p101a1e00",
  "p1a8ca400",
  "p53b7d00",
  "p3ecd4500",
  "p3030a930",
  "p1341472",
  "p1ec25600",
  "p1b26dd00",
  "p35cbb500",
  "p231dd080",
  "p3a070900",
  "p2b30c300",
  "p3b06e200",
  "p29efe000",
  "p1c87800",
  "p24128f00",
  "p6297500",
  "p30812d80",
  "p69e7cf0",
  "p37f17300",
  "p18b3ce00",
  "p22972080",
  "p2f9262c0",
  "p12df2bf0",
  "p35d28580",
  "p3d1f5d00",
  "p1cd00100",
  "p11d14000",
  "p2309ea80",
  "p3cfcc900",
];

const FOOTER_LOGO_KEYS: readonly SvgPathKey[] = [
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

const QUICK_LINKS = [
  { label: "Schedule", href: "/#event-schedule" },
  { label: "Speakers", href: "/speakers" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Awards", href: "/awards" },
] as const;

const SUPPORT_LINKS = [
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
] as const;

const SOCIAL_ICONS = [
  { href: "#", key: "p30e34e00", label: "Facebook", viewBox: "0 0 11.4004 19.5" },
  { href: "#", key: "p2f091a0", label: "Twitter", viewBox: "0 0 21.5015 17.7684" },
  { href: "#", key: "p364f5900", label: "Instagram", viewBox: "0 0 18 20.814" },
  { href: "#", key: "pfb94c00", label: "LinkedIn", viewBox: "0 0 20.5 20.5" },
] as const satisfies ReadonlyArray<{
  href: string;
  key: SvgPathKey;
  label: string;
  viewBox: string;
}>;

export default function AchieversFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0a1628] min-h-[400px]">
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        src={footerBackgroundImage.src}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute left-1/2 top-0 h-[1350px] w-[2155.5px] -translate-x-1/2 opacity-[0.07]"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 2155.5 1350"
        >
          {FOOTER_PATTERN_KEYS.map((key) => (
            <path key={key} d={svgPaths[key]} fill="#A4C6E6" fillOpacity="0.2" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1252px] flex-col gap-12 px-6 py-16">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[312px]">
            <div className="mb-5 h-[40px] w-[71px]">
              <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.2088 40">
                {FOOTER_LOGO_KEYS.map((key) => (
                  <path key={key} d={svgPaths[key]} fill="#F0F1F4" />
                ))}
              </svg>
            </div>

            <p className="font-['Inter',sans-serif] text-[18px] leading-[1.2] tracking-[0.36px] text-[#a4c6e6]">
              Africa&apos;s most influential leadership and entrepreneurship conference. August 11-13, 2026. Lagos, Nigeria.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-[30px] px-6 py-3">
              <p className="font-['Inter',sans-serif] text-[18px] font-semibold leading-[1.2] tracking-[0.72px] text-[#f0f1f4]">
                QUICK LINKS
              </p>
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  className="font-['Inter',sans-serif] text-[18px] leading-[1.2] tracking-[0.36px] text-[#5b6e7f] transition-colors hover:text-[#a4c6e6]"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-[30px] px-6 py-3">
              <p className="font-['Inter',sans-serif] text-[18px] font-semibold leading-[1.2] tracking-[0.72px] text-[#f0f1f4]">
                SUPPORT
              </p>
              {SUPPORT_LINKS.map((link) => (
                <a
                  key={link.label}
                  className="font-['Inter',sans-serif] text-[18px] leading-[1.2] tracking-[0.36px] text-[#5b6e7f] transition-colors hover:text-[#a4c6e6]"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-['Inter',sans-serif] text-[16px] leading-[1.02] tracking-[0.8px] text-[#a4c6e6]">
            © 2026 Achievers Summit Africa. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {SOCIAL_ICONS.map((icon) => (
              <a key={icon.key} aria-label={icon.label} className="flex size-6 items-center justify-center" href={icon.href}>
                <svg fill="none" height="21" viewBox={icon.viewBox} width="21">
                  <path clipRule="evenodd" d={svgPaths[icon.key]} fill="#5B6E7F" fillRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
