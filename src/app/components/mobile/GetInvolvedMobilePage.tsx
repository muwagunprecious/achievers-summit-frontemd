import {
  FilledActionButton,
  OutlinedActionButton,
} from "../ui/action-button";
import {
  MobileActionRow,
  MobilePageFrame,
  MobilePanel,
  MobileSectionLabel,
} from "./shared";

const roles: Array<{
  ctaHref: string;
  ctaLabel: string;
  description: string;
  eyebrow: string;
  id: string;
  items?: string[];
  subtitle?: string;
  title: string;
}> = [
  {
    ctaHref: "/get-involved#join-as-a-builder",
    ctaLabel: "Join as a builder",
    description:
      "The Achievers Summit is built on partnership. Whether you have knowledge to share, a brand to activate or solutions to showcase, there is a place for you at the table.",
    eyebrow: "GET INVOLVED",
    id: "join-as-a-builder",
    title: "JOIN AS A BUILDER",
  },
  {
    ctaHref: "/get-involved#apply-to-speak",
    ctaLabel: "Apply to speak",
    description:
      "We accept applications for keynote speakers, panel discussants, workshop facilitators and fireside guests across all four content tracks.",
    eyebrow: "GET INVOLVED",
    id: "apply-to-speak",
    items: [
      "Full-profile portfolio across Summit platforms",
      "Complimentary First Class pass",
      "Media, branding and logistics support",
    ],
    subtitle:
      "If you have a perspective that can challenge, inspire or reframe the room, we want to hear it.",
    title: "APPLY TO SPEAK",
  },
  {
    ctaHref: "/get-involved#apply-to-exhibit",
    ctaLabel: "Apply to exhibit",
    description:
      "The Exhibition Floor is designed to put your product, solution or service in front of founders, investors, policymakers, media leaders and cultural operators.",
    eyebrow: "GET INVOLVED",
    id: "apply-to-exhibit",
    items: [
      "A branded exhibition booth",
      "Visibility across Summit platforms and media",
      "Foot traffic from 5,000+ in-person attendees",
      "Networking access to investors and decision-makers",
    ],
    subtitle:
      "Bring your product to the floor that matters and let the market react in real time.",
    title: "APPLY TO EXHIBIT",
  },
  {
    ctaHref: "/get-involved#become-a-sponsor",
    ctaLabel: "Become a sponsor",
    description:
      "Sponsoring the Achievers Summit is not a placement. It is a strategic footprint that connects your brand to Africa's most ambitious next-generation decision-makers.",
    eyebrow: "GET INVOLVED",
    id: "become-a-sponsor",
    items: [
      "Brand visibility across physical, digital and broadcast surfaces",
      "Category exclusivity and naming-right opportunities",
      "Direct access to curated VIP and investor networks",
      "Associative equity with Africa's most credible emerging voices",
    ],
    subtitle:
      "You are not buying a banner. You are becoming part of the narrative.",
    title: "BECOME A SPONSOR",
  },
] as const;

export default function GetInvolvedMobilePage() {
  return (
    <div className="bg-[#050b11] md:hidden">
      <MobilePageFrame className="gap-14 pb-20">
        <section className="space-y-6">
          <MobileSectionLabel text="GET INVOLVED" />
          <div className="space-y-4">
            <h1 className="font-['Oswald',sans-serif] text-[36px] leading-[1.02] text-[#f0f1f4]">
              HELP BUILD THE ROOM
            </h1>
            <p className="font-['Inter',sans-serif] text-[16px] leading-[1.6] text-[#a4c6e6]">
              Speak, sponsor, exhibit or partner. This summit is designed for
              people and brands who want to actively shape what happens in the
              room, not just attend it.
            </p>
          </div>
          <MobileActionRow
            primaryHref="/get-involved#apply-to-speak"
            primaryLabel="Apply to speak"
            secondaryHref="/get-involved#become-a-sponsor"
            secondaryLabel="Become a sponsor"
          />
        </section>

        <section className="space-y-5">
          {roles.map((role) => (
            <MobilePanel key={role.id} className="space-y-5">
              <div id={role.id} className="space-y-3">
                <MobileSectionLabel text={role.eyebrow} />
                <h2 className="font-['Oswald',sans-serif] text-[30px] leading-[1.02] text-[#f0f1f4]">
                  {role.title}
                </h2>
                {role.subtitle ? (
                  <p className="font-['Inter',sans-serif] text-[15px] font-medium leading-[1.55] text-[#ffd966]">
                    {role.subtitle}
                  </p>
                ) : null}
                <p className="font-['Inter',sans-serif] text-[15px] leading-[1.6] text-[#a4c6e6]">
                  {role.description}
                </p>
              </div>

              {role.items ? (
                <div className="space-y-3">
                  {role.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#ffd966]" />
                      <p className="font-['Inter',sans-serif] text-[14px] leading-[1.55] text-[#f0f1f4]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              <FilledActionButton
                className="w-full justify-center"
                href={role.ctaHref}
                label={role.ctaLabel}
              />
            </MobilePanel>
          ))}
        </section>

        <section className="space-y-5 border border-[#ffd966]/20 bg-[rgba(255,217,102,0.08)] px-5 py-6">
          <MobileSectionLabel text="PARTNERSHIP READY" />
          <div className="space-y-3">
            <h2 className="font-['Oswald',sans-serif] text-[32px] leading-[1.02] text-[#f0f1f4]">
              SHOW UP AS A BUILDER, NOT A SPECTATOR
            </h2>
            <p className="font-['Inter',sans-serif] text-[15px] leading-[1.6] text-[#a4c6e6]">
              If you want proximity to the people, ideas and institutions
              shaping the next decade, there is already a lane for you.
            </p>
          </div>
          <OutlinedActionButton
            borderClassName="border-[#f0f1f4]"
            className="w-full"
            href="/tickets"
            label="Get your ticket"
            textClassName="text-[#f0f1f4]"
          />
        </section>
      </MobilePageFrame>
    </div>
  );
}
