import {
  MobileActionRow,
  MobilePageFrame,
  MobileSectionLabel,
} from "./shared";

export default function AwardsMobilePage() {
  return (
    <div className="bg-[#050b11] md:hidden">
      <MobilePageFrame className="gap-14 pb-20">
        <section className="space-y-8">
          <MobileSectionLabel text="100UNDER40 AWARDS" />

          <div className="mx-auto flex h-[240px] w-[240px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#ffd966_0%,#d9ab2f_52%,#8d6512_100%)]">
            <div className="text-center text-[#050b11]">
              <p className="font-['Oswald',sans-serif] text-[52px] leading-none">
                100
              </p>
              <p className="font-['Inter',sans-serif] text-[14px] uppercase tracking-[3px]">
                under
              </p>
              <p className="font-['Oswald',sans-serif] text-[52px] leading-none">
                40
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-['Oswald',sans-serif] text-[36px] leading-[1.02] text-[#f0f1f4]">
              AFRICA'S MOST PRESTIGIOUS RECOGNITION OF YOUNG EXCELLENCE
            </h1>
            <p className="font-['Inter',sans-serif] text-[16px] leading-[1.6] text-[#a4c6e6]">
              Honouring 100 outstanding achievers under 40 across business,
              governance, arts, technology and social impact, celebrated at the
              Gala Night on August 13.
            </p>
            <p className="font-['Inter',sans-serif] text-[15px] italic leading-[1.55] text-[#ffd966]">
              Recognition meets proximity, prestige and cultural memory.
            </p>
          </div>

          <MobileActionRow
            primaryHref="/awards"
            primaryLabel="Nominate an achiever"
            secondaryHref="/tickets"
            secondaryLabel="Get gala access"
          />
        </section>
      </MobilePageFrame>
    </div>
  );
}
