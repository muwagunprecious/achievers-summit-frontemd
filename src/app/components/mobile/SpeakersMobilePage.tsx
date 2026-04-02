import Image from "next/image";

import speakerPortrait from "../../../assets/63caad3c84f14f7fefab8dc92388c88c9c704d8d.png";
import {
  MobileActionRow,
  MobilePageFrame,
  MobilePanel,
  MobileSectionLabel,
} from "./shared";

const speakers = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: [
    "Jamie Davids",
    "Maya Adeyemi",
    "David Mensah",
    "Ijeoma Nnadi",
    "Tolu Adebayo",
    "Safiya Bello",
    "Kofi Martey",
    "Adaora Obi",
  ][index],
  role: [
    "Tech Founder",
    "Policy Strategist",
    "Investor",
    "Creative Director",
    "Media Operator",
    "Education Builder",
    "Growth Executive",
    "Community Architect",
  ][index],
}));

export default function SpeakersMobilePage() {
  return (
    <div className="bg-[#050b11] md:hidden">
      <MobilePageFrame className="gap-14 pb-20">
        <section className="space-y-6">
          <MobileSectionLabel text="OUR SPEAKERS" />
          <div className="space-y-4">
            <h1 className="font-['Oswald',sans-serif] text-[36px] leading-[1.02] text-[#f0f1f4]">
              MEET THE VOICES SHAPING THE ROOM
            </h1>
            <p className="font-['Inter',sans-serif] text-[16px] leading-[1.6] text-[#a4c6e6]">
              Founders, policymakers, investors, creatives and operators with
              real credibility, not placeholder visibility.
            </p>
          </div>
          <MobileActionRow
            primaryHref="/tickets"
            primaryLabel="Get your ticket"
            secondaryHref="/get-involved#apply-to-speak"
            secondaryLabel="Apply to speak"
          />
        </section>

        <section className="grid grid-cols-1 gap-4">
          {speakers.map((speaker) => (
            <MobilePanel key={speaker.id} className="flex items-center gap-4">
              <div className="relative h-[132px] w-[108px] shrink-0 overflow-hidden border border-[#688fc5]">
                <div className="absolute inset-0 border border-[#a4c6e6]/30" />
                <Image
                  alt={speaker.name}
                  className="object-cover"
                  fill
                  sizes="108px"
                  src={speakerPortrait}
                />
              </div>
              <div className="space-y-2">
                <p className="font-['Oswald',sans-serif] text-[24px] leading-[1.02] text-[#ffd966]">
                  {speaker.name}
                </p>
                <p className="font-['Inter',sans-serif] text-[14px] tracking-[0.72px] text-[#f0f1f4]">
                  {speaker.role}
                </p>
                <p className="font-['Inter',sans-serif] text-[13px] leading-[1.55] text-[#a4c6e6]">
                  Summit speaker and contributor across the leadership,
                  innovation and culture agenda.
                </p>
              </div>
            </MobilePanel>
          ))}
        </section>
      </MobilePageFrame>
    </div>
  );
}
