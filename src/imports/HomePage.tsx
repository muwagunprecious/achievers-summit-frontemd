import { type ReactNode } from "react";
import svgPaths from "./svg-d59ucq01a4";
import pageBackgroundImage from "../assets/9a94605462226bd31c365fa846bd61d7daad5991.png";
import guinnessWorldRecordsLogo from "../assets/6cb05554d847983ba98df62bf618e0ed09416277.png";
import eafLogoImage from "../assets/cd2a5db059ae679241c5bf9c0ef2f6f10a763154.png";
import galaAwardsImage from "../assets/40f51e4ed0f594a247768f9083463e03f4e1f69f.png";
import investorDealRoomImage from "../assets/0f1ad41e769990f5a72dce9044fd4b883f226dd2.png";
import ideaPitchImage from "../assets/b5ecab226d6ca5b9df6b2fbc32e9ed7bcfa59b2a.png";
import eaiShowcaseImage from "../assets/0422e9f3cfd48efb086c69a8f846ae0bb6a2e413.png";
import ResponsiveArtboard from "../app/components/figma/ResponsiveArtboard";
import { ActionButton, FilledActionButton, OutlinedActionButton } from "../app/components/ui/action-button";
import { imgGroup, imgGroup4 } from "./svg-hy664";

function SectionEyebrow({
  label,
  className = "",
  textClassName = "text-center",
}: {
  label: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={`content-stretch flex gap-[13px] items-center relative shrink-0 ${className}`.trim()}>
      <div className="bg-[#f0f1f4] h-[2.5px] shrink-0 w-[35px]" />
      <div className={`flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f0f1f4] text-[16px] tracking-[1.6px] whitespace-nowrap ${textClassName}`.trim()}>
        <p className="leading-[1.02]">{label}</p>
      </div>
    </div>
  );
}

function MainSectionShell({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative z-10 mx-auto w-[calc(100%-32px)] max-w-[1248px] ${className}`.trim()}>
      {children}
    </section>
  );
}

function MainContentPatternSecondSvg() {
  return (
    <div className="absolute h-[1347.21px] left-[-143.12px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[143.117px_-1351.39px] mask-size-[1440px_6552px] top-[1351.39px] w-[2152.71px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2152.71 1347.21">
        <g id="Group" opacity="0.07">
          <path d={svgPaths.p303bf600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector" />
          <path d={svgPaths.p7688a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_2" />
          <path d={svgPaths.p7e3ec00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_3" />
          <path d={svgPaths.p8fc3a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_4" />
          <path d={svgPaths.p27a27c30} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_5" />
          <path d={svgPaths.p2297b400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_6" />
          <path d={svgPaths.p15c1f000} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_7" />
          <path d={svgPaths.p26239200} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_8" />
          <path d={svgPaths.p1855700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_9" />
          <path d={svgPaths.p1579f680} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_10" />
          <path d={svgPaths.p3e525400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_11" />
          <path d={svgPaths.p21a6aa00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_12" />
          <path d={svgPaths.p2021d900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_13" />
          <path d={svgPaths.p28a6d880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_14" />
          <path d={svgPaths.p15ccc000} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_15" />
          <path d={svgPaths.p13c47100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_16" />
          <path d={svgPaths.p23ecb680} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_17" />
          <path d={svgPaths.p28ff9100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_18" />
          <path d={svgPaths.p1be14100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_19" />
          <path d={svgPaths.p36ebc600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_20" />
          <path d={svgPaths.p124ed800} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_21" />
          <path d={svgPaths.p31348b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_22" />
          <path d={svgPaths.p3482ec00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_23" />
          <path d={svgPaths.p3b858300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_24" />
          <path d={svgPaths.p2201c380} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_25" />
          <path d={svgPaths.p34aca1f0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_26" />
          <path d={svgPaths.p1f220680} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_27" />
          <path d={svgPaths.p27567d00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_28" />
          <path d={svgPaths.p3904aec0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_29" />
          <path d={svgPaths.p1f24e400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_30" />
          <path d={svgPaths.p11d12880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_31" />
          <path d={svgPaths.p2aeccbf0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_32" />
          <path d={svgPaths.p736cf00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_33" />
          <path d={svgPaths.p3cd2f8c0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_34" />
          <path d={svgPaths.p1ca87d00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_35" />
          <path d={svgPaths.p20a58bc0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_36" />
          <path d={svgPaths.p28d6ce00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_37" />
          <path d={svgPaths.p18509e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_38" />
          <path d={svgPaths.p3b069f40} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_39" />
          <path d={svgPaths.p5bc1400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_40" />
          <path d={svgPaths.p1b3b5c40} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_41" />
          <path d={svgPaths.p1b5241f0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_42" />
          <path d={svgPaths.p2f2abf80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_43" />
          <path d={svgPaths.p11a3b300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_44" />
          <path d={svgPaths.p1bb9eac0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_45" />
          <path d={svgPaths.p3cbb3f70} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_46" />
          <path d={svgPaths.p3f1c9900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_47" />
          <path d={svgPaths.p2705f580} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_48" />
          <path d={svgPaths.p1b3e600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_49" />
          <path d={svgPaths.p2f23a300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_50" />
          <path d={svgPaths.p9486c00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_51" />
        </g>
      </svg>
    </div>
  );
}

function MainContentPatternThirdSvg() {
  return (
    <div className="absolute h-[1350px] left-[-144.51px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[144.508px_-2700px] mask-size-[1440px_6552px] top-[2700px] w-[2155.5px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2155.5 1350">
        <g id="Group" opacity="0.07">
          <path d={svgPaths.p1fcbae00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector" />
          <path d={svgPaths.p317ae700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_2" />
          <path d={svgPaths.p116ee600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_3" />
          <path d={svgPaths.p292694c0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_4" />
          <path d={svgPaths.p10ec7700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_5" />
          <path d={svgPaths.p785ef00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_6" />
          <path d={svgPaths.p3d327100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_7" />
          <path d={svgPaths.p24775e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_8" />
          <path d={svgPaths.p13f4ec00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_9" />
          <path d={svgPaths.p9454900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_10" />
          <path d={svgPaths.p9b9ccc0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_11" />
          <path d={svgPaths.p397d0700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_12" />
          <path d={svgPaths.p202d0e70} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_13" />
          <path d={svgPaths.p2f194c80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_14" />
          <path d={svgPaths.p25cd2a30} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_15" />
          <path d={svgPaths.pb3ab040} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_16" />
          <path d={svgPaths.p1faf9b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_17" />
          <path d={svgPaths.p4044d80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_18" />
          <path d={svgPaths.p11eedd80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_19" />
          <path d={svgPaths.p3b6f9100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_20" />
          <path d={svgPaths.p1baf1180} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_21" />
          <path d={svgPaths.p3c32de00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_22" />
          <path d={svgPaths.p2d1ec300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_23" />
          <path d={svgPaths.p16dd6e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_24" />
          <path d={svgPaths.p2b109f00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_25" />
          <path d={svgPaths.p1b42f800} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_26" />
          <path d={svgPaths.pa2e1d30} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_27" />
          <path d={svgPaths.p6c04580} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_28" />
          <path d={svgPaths.p1578c500} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_29" />
          <path d={svgPaths.p350ec980} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_30" />
          <path d={svgPaths.p5e61a80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_31" />
          <path d={svgPaths.p58fb900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_32" />
          <path d={svgPaths.p7bc4880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_33" />
          <path d={svgPaths.p79b7340} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_34" />
          <path d={svgPaths.p1805f170} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_35" />
          <path d={svgPaths.p3d608d00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_36" />
          <path d={svgPaths.p52e6000} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_37" />
          <path d={svgPaths.p149ddf80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_38" />
          <path d={svgPaths.p285751f0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_39" />
          <path d={svgPaths.p1aef47a0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_40" />
          <path d={svgPaths.p12ed0880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_41" />
          <path d={svgPaths.p312af600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_42" />
          <path d={svgPaths.p1a65e100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_43" />
          <path d={svgPaths.p1993f300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_44" />
          <path d={svgPaths.pffbe800} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_45" />
          <path d={svgPaths.p19386500} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_46" />
          <path d={svgPaths.p1e32ac80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_47" />
          <path d={svgPaths.p37f23900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_48" />
          <path d={svgPaths.p3b8ec780} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_49" />
          <path d={svgPaths.pb781100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_50" />
          <path d={svgPaths.p39ebce80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_51" />
          <path d={svgPaths.p269c5200} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_52" />
        </g>
      </svg>
    </div>
  );
}

function MainContentPatternFourthSvg() {
  return (
    <div className="absolute h-[1350px] left-[-144.51px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[144.508px_-4050px] mask-size-[1440px_6552px] top-[4050px] w-[2155.5px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2155.5 1350">
        <g id="Group" opacity="0.07">
          <path d={svgPaths.p43f3cf2} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector" />
          <path d={svgPaths.p317ae700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_2" />
          <path d={svgPaths.p116ee600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_3" />
          <path d={svgPaths.p292694c0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_4" />
          <path d={svgPaths.p10ec7700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_5" />
          <path d={svgPaths.p785ef00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_6" />
          <path d={svgPaths.p3d327100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_7" />
          <path d={svgPaths.p24775e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_8" />
          <path d={svgPaths.p13f4ec00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_9" />
          <path d={svgPaths.p9454900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_10" />
          <path d={svgPaths.p9b9ccc0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_11" />
          <path d={svgPaths.p397d0700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_12" />
          <path d={svgPaths.p202d0e70} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_13" />
          <path d={svgPaths.p2f194c80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_14" />
          <path d={svgPaths.p25cd2a30} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_15" />
          <path d={svgPaths.pb3ab040} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_16" />
          <path d={svgPaths.p1faf9b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_17" />
          <path d={svgPaths.p4044d80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_18" />
          <path d={svgPaths.p11eedd80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_19" />
          <path d={svgPaths.p1d82560} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_20" />
          <path d={svgPaths.p2c4e5e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_21" />
          <path d={svgPaths.p2c216180} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_22" />
          <path d={svgPaths.p101a1e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_23" />
          <path d={svgPaths.p3532c200} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_24" />
          <path d={svgPaths.p17d0f980} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_25" />
          <path d={svgPaths.p23ef6000} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_26" />
          <path d={svgPaths.p3030a930} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_27" />
          <path d={svgPaths.p1341472} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_28" />
          <path d={svgPaths.p268f3a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_29" />
          <path d={svgPaths.p8794f00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_30" />
          <path d={svgPaths.p29efc0f0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_31" />
          <path d={svgPaths.p231dd080} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_32" />
          <path d={svgPaths.p3a070900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_33" />
          <path d={svgPaths.p2309bd00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_34" />
          <path d={svgPaths.p16e46480} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_35" />
          <path d={svgPaths.p2c667700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_36" />
          <path d={svgPaths.p1c87800} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_37" />
          <path d={svgPaths.p25ce4400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_38" />
          <path d={svgPaths.p1c66ff00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_39" />
          <path d={svgPaths.p1012fd30} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_40" />
          <path d={svgPaths.pa9b9f00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_41" />
          <path d={svgPaths.p1ad2ee32} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_42" />
          <path d={svgPaths.p18b3ce00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_43" />
          <path d={svgPaths.p3f994b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_44" />
          <path d={svgPaths.p15604a80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_45" />
          <path d={svgPaths.pe6c70} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_46" />
          <path d={svgPaths.p1eafaa00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_47" />
          <path d={svgPaths.p3d1f5d00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_48" />
          <path d={svgPaths.p25e54900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_49" />
          <path d={svgPaths.p323efc00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_50" />
          <path d={svgPaths.p3d1c780} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_51" />
          <path d={svgPaths.p1def4500} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_52" />
        </g>
      </svg>
    </div>
  );
}

function MainContentPatternFifthSvg() {
  return (
    <div className="absolute h-[1347.21px] left-[-143.12px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[143.117px_-5401.39px] mask-size-[1440px_6552px] top-[5401.39px] w-[2152.71px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2152.71 1347.21">
        <g id="Group" opacity="0.07">
          <path d={svgPaths.p303bf600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector" />
          <path d={svgPaths.p7688a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_2" />
          <path d={svgPaths.p7e3ec00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_3" />
          <path d={svgPaths.p8fc3a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_4" />
          <path d={svgPaths.p27a27c30} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_5" />
          <path d={svgPaths.p2297b400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_6" />
          <path d={svgPaths.p15c1f000} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_7" />
          <path d={svgPaths.p26239200} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_8" />
          <path d={svgPaths.p11a00400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_9" />
          <path d={svgPaths.p1579f680} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_10" />
          <path d={svgPaths.p3e525400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_11" />
          <path d={svgPaths.p21a6aa00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_12" />
          <path d={svgPaths.p2021d900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_13" />
          <path d={svgPaths.p28a6d880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_14" />
          <path d={svgPaths.p15ccc000} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_15" />
          <path d={svgPaths.p13c47100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_16" />
          <path d={svgPaths.p23ecb680} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_17" />
          <path d={svgPaths.p28ff9100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_18" />
          <path d={svgPaths.pdc19280} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_19" />
          <path d={svgPaths.p36ebc600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_20" />
          <path d={svgPaths.p124ed800} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_21" />
          <path d={svgPaths.p31348b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_22" />
          <path d={svgPaths.p3482ec00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_23" />
          <path d={svgPaths.p3b858300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_24" />
          <path d={svgPaths.p2201c380} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_25" />
          <path d={svgPaths.p34aca1f0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_26" />
          <path d={svgPaths.p1f220680} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_27" />
          <path d={svgPaths.p27567d00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_28" />
          <path d={svgPaths.p3904aec0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_29" />
          <path d={svgPaths.p1f24e400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_30" />
          <path d={svgPaths.p11d12880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_31" />
          <path d={svgPaths.p2aeccbf0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_32" />
          <path d={svgPaths.p736cf00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_33" />
          <path d={svgPaths.p3cd2f8c0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_34" />
          <path d={svgPaths.p1ca87d00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_35" />
          <path d={svgPaths.p20a58bc0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_36" />
          <path d={svgPaths.p28d6ce00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_37" />
          <path d={svgPaths.p18509e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_38" />
          <path d={svgPaths.p3b069f40} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_39" />
          <path d={svgPaths.p5bc1400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_40" />
          <path d={svgPaths.p1b3b5c40} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_41" />
          <path d={svgPaths.p1b5241f0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_42" />
          <path d={svgPaths.p2f2abf80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_43" />
          <path d={svgPaths.p11a3b300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_44" />
          <path d={svgPaths.p1bb9eac0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_45" />
          <path d={svgPaths.p3cbb3f70} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_46" />
          <path d={svgPaths.p3f1c9900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_47" />
          <path d={svgPaths.p2705f580} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_48" />
          <path d={svgPaths.p1b3e600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_49" />
          <path d={svgPaths.p2f23a300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_50" />
          <path d={svgPaths.p9486c00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_51" />
        </g>
      </svg>
    </div>
  );
}

function MainContentPatternFirstSvg() {
  return (
    <div className="absolute h-[1350px] left-[-144.51px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[144.508px_0px] mask-size-[1440px_6552px] top-0 w-[2155.5px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2155.5 1350">
        <g id="Group" opacity="0.07">
          <path d={svgPaths.pdac9ac0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector" />
          <path d={svgPaths.p317ae700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_2" />
          <path d={svgPaths.p116ee600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_3" />
          <path d={svgPaths.p292694c0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_4" />
          <path d={svgPaths.p10ec7700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_5" />
          <path d={svgPaths.p785ef00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_6" />
          <path d={svgPaths.p3d327100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_7" />
          <path d={svgPaths.p24775e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_8" />
          <path d={svgPaths.p13f4ec00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_9" />
          <path d={svgPaths.p9454900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_10" />
          <path d={svgPaths.p9b9ccc0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_11" />
          <path d={svgPaths.p397d0700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_12" />
          <path d={svgPaths.p202d0e70} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_13" />
          <path d={svgPaths.p2f194c80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_14" />
          <path d={svgPaths.p25cd2a30} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_15" />
          <path d={svgPaths.pb3ab040} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_16" />
          <path d={svgPaths.p1faf9b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_17" />
          <path d={svgPaths.p4044d80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_18" />
          <path d={svgPaths.p11eedd80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_19" />
          <path d={svgPaths.p3e2df780} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_20" />
          <path d={svgPaths.p30218700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_21" />
          <path d={svgPaths.p247264f8} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_22" />
          <path d={svgPaths.p14ae1880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_23" />
          <path d={svgPaths.pe5b5380} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_24" />
          <path d={svgPaths.p2550b300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_25" />
          <path d={svgPaths.p21556680} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_26" />
          <path d={svgPaths.p16ae4e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_27" />
          <path d={svgPaths.p23d38500} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_28" />
          <path d={svgPaths.p287cfc80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_29" />
          <path d={svgPaths.pf364a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_30" />
          <path d={svgPaths.p56a3f00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_31" />
          <path d={svgPaths.p27cc1700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_32" />
          <path d={svgPaths.p9319800} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_33" />
          <path d={svgPaths.p324162c0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_34" />
          <path d={svgPaths.p3c91a500} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_35" />
          <path d={svgPaths.p6375a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_36" />
          <path d={svgPaths.p2d17be00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_37" />
          <path d={svgPaths.pc99b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_38" />
          <path d={svgPaths.p22950600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_39" />
          <path d={svgPaths.p3d6cfe00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_40" />
          <path d={svgPaths.p1f329410} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_41" />
          <path d={svgPaths.pd108a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_42" />
          <path d={svgPaths.p261c8c80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_43" />
          <path d={svgPaths.p3878cd80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_44" />
          <path d={svgPaths.p1018eb00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_45" />
          <path d={svgPaths.pa4e6900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_46" />
          <path d={svgPaths.p14c78c80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_47" />
          <path d={svgPaths.p27316080} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_48" />
          <path d={svgPaths.p8727400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_49" />
          <path d={svgPaths.p3015ce80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_50" />
          <path d={svgPaths.p1a3ba800} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_51" />
          <path d={svgPaths.p223bb700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_52" />
        </g>
      </svg>
    </div>
  );
}

function MainContentPatternOverlay() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none" data-name="Clip path group">
      <MainContentPatternSecondSvg />
      <MainContentPatternThirdSvg />
      <MainContentPatternFourthSvg />
      <MainContentPatternFifthSvg />
      <MainContentPatternFirstSvg />
    </div>
  );
}

function ContentTracksSection() {
  const trackRows: Array<
    Array<{
      number: string;
      title: string;
      titleClassName?: string;
      cardClassName?: string;
    }>
  > = [
      [
        { number: "01", title: "TECHNOLOGY, AI & INNOVATION" },
        { number: "02", title: "MEDIA, CONTENT & DIGITAL STORYTELLING", titleClassName: "w-[474px]" },
      ],
      [
        { number: "03", title: "CREATIVE ECONOMY, DESIGN & CULTURE" },
        { number: "04", title: "GOVERNANCE, POLICY & CIVIC LEADERSHIP" },
      ],
      [
        { number: "05", title: "BUSINESS, FINANCE & ENTREPRENEURSHIP" },
        { number: "06", title: "LEADERSHIP, EDUCATION & THE FUTURE OF WORK", cardClassName: "h-[77px] justify-between" },
      ],
    ];

  return (
    <MainSectionShell className="content-stretch flex flex-col gap-[60px] items-start">
      <div className="content-stretch flex flex-col gap-[45px] items-start relative shrink-0 w-full">
        <SectionEyebrow label="CONTENT TRACKS" />
        <div className="content-stretch flex items-end relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[718px]">
            <div className="flex flex-col font-['Oswald:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#f0f1f4] text-[48px] w-full">
              <p className="leading-[1.05]">6 CONTENT TRACKS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-full">
        {trackRows.map((row, rowIndex) => (
          <div
            key={`track-row-${rowIndex + 1}`}
            className="content-stretch flex flex-wrap items-center justify-between gap-[22px] relative shrink-0 w-full"
          >
            {row.map((track) => (
              <div
                key={track.number}
                className={`bg-[rgba(164,198,230,0.1)] content-stretch flex flex-1 flex-col items-start min-w-[min(100%,320px)] p-[24px] relative shrink-0 ${"cardClassName" in track ? track.cardClassName || "" : ""}`.trim()}
              >
                <div aria-hidden="true" className="absolute border border-[#a4c6e6] border-solid inset-0 pointer-events-none" />
                <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center justify-between leading-[0] min-h-px min-w-px not-italic relative text-center whitespace-nowrap">
                    <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#f0f1f4] text-[18px] tracking-[0.72px]">
                      <p className="leading-[1.2]">{track.number}</p>
                    </div>
                    <div className={`flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#a4c6e6] text-[24px] tracking-[-1.44px] ${"titleClassName" in track ? track.titleClassName || "" : ""}`.trim()}>
                      <p className="leading-[1.4]">{track.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </MainSectionShell>
  );
}

function SummitHighlightsSection() {
  const highlightRows = [
    {
      rowClassName: "h-[319px]",
      cards: [
        {
          key: "awards",
          media: (
            <div className="h-[117.095px] relative shrink-0 w-[103px]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103 117.095">
                <g id="Vector">
                  <path d={svgPaths.p1145d200} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p29acff00} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p3de16d80} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p24ea5e80} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p3cba8100} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p58e7500} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p3392ed00} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p2572eb00} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p70b9000} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p18ef6000} fill="var(--fill-0, black)" />
                </g>
              </svg>
            </div>
          ),
          headerClassName: "items-center w-full",
          titleBlockClassName: "h-[81px] w-[200px]",
          titleClassName: "tracking-[0.36px] whitespace-nowrap",
          titleLines: ["100UNDER40 AWARDS"],
          subtitleContainerClassName: "flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full",
          subtitleTextClassName: "-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[54px] justify-center leading-[0] left-0 not-italic text-[#050b11] text-[18px] top-[27px] tracking-[0.36px] w-[200px]",
          subtitleLines: ["Africa's most", "prestigious award"],
          description: "of young excellence — honouring 100 outstanding achievers under 40 drawn from business, governance, arts, technology and social impact. Celebrated at the Gala Night on August 13.",
        },
        {
          key: "guinness",
          media: (
            <div className="relative shrink-0 size-[103px]" data-name="GWR LOGO 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={guinnessWorldRecordsLogo.src} />
            </div>
          ),
          cardClassName: "gap-[10px] h-full items-start",
          headerClassName: "items-center",
          titleBlockClassName: "w-[200px]",
          titleClassName: "tracking-[0.36px] whitespace-nowrap",
          titleLines: ["GUINNESS WORLD ", "REECORD ATTEMPT"],
          subtitleContainerClassName: "h-[50px] overflow-clip relative shrink-0 w-full",
          subtitleTextClassName: "-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#050b11] text-[18px] top-[22px] tracking-[0.36px] w-[200px]",
          subtitleLines: ["On August 12 — International Youth"],
          description: "Day and Convener Emmanuel Agida's birthday — all 5,000+ attendees will participate in an official Guinness World Records attempt. Category revealed one month before the Summit. All participants receive official certificates.",
          descriptionClassName: "min-w-full w-[min-content]",
          spacerClassName: "absolute h-[50px] left-[42.47px] top-[153px] w-[200px]",
        },
        {
          key: "foodbank",
          media: (
            <div className="overflow-clip relative shrink-0 size-[103px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+3.69px)] size-[142.627px] top-1/2" data-name="EAF-removebg-preview 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={eafLogoImage.src} />
              </div>
            </div>
          ),
          cardClassName: "h-full items-start justify-between",
          headerClassName: "items-center w-full",
          titleBlockClassName: "w-[200px]",
          titleClassName: "w-full",
          titleLines: ["CSR — MAKOKO FOODBANK DRIVE"],
          subtitleContainerClassName: "content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-full",
          subtitleTextClassName: "flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#050b11] text-[18px] tracking-[0.36px] whitespace-nowrap",
          subtitleLines: ["The Achievers Summit "],
          description: "CSR Foodbank Drive collects and distributes food supplies to families in the Makoko community, Lagos. Attendees contribute at registration or on-site drop-off points. Brands are invited to co-sponsor for co-branded recognition across all Summit channels.",
        },
      ],
    },
    {
      rowClassName: "h-[330.612px]",
      cards: [
        {
          key: "gala",
          media: (
            <div className="h-[92.612px] relative shrink-0 w-[103px]" data-name="image 3">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={galaAwardsImage.src} />
            </div>
          ),
          cardClassName: "h-full items-start",
          headerClassName: "items-center w-full",
          titleBlockClassName: "h-[81px] w-[200px]",
          titleClassName: "tracking-[0.36px] whitespace-nowrap",
          titleLines: ["GALA & AWARDS NIGHT"],
          subtitleContainerClassName: "flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full",
          subtitleTextClassName: "-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[54px] justify-center leading-[0] left-0 not-italic text-[#050b11] text-[18px] top-[27px] tracking-[0.36px] w-[200px]",
          subtitleLines: ["A black-tie celebration closing the "],
          description: "Summit in style. The Gala Night features the 100 Under 40 awards ceremony, headline entertainment, gala dinner, cocktail reception and meet & greet moments with speakers and performers.",
        },
        {
          key: "deal-room",
          media: (
            <div className="h-[92.612px] relative shrink-0 w-[103px]" data-name="image 2">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={investorDealRoomImage.src} />
            </div>
          ),
          cardClassName: "gap-[10px] h-full items-start",
          headerClassName: "items-start",
          titleBlockClassName: "w-[200px]",
          titleClassName: "tracking-[0.36px] w-full",
          titleLines: ["INVESTOR ROUNDTABLE & DEAL ROOM"],
          subtitleContainerClassName: "h-[50px] overflow-clip relative shrink-0 w-full",
          subtitleTextClassName: "-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#050b11] text-[18px] top-[22px] tracking-[0.36px] w-[200px]",
          subtitleLines: ["This is the Summit's highest-stakes "],
          description: "private session — a closed-room environment where serious capital meets serious founders. It is  accessible only to First Class pass holders and verified investors (angel investors, VCs, family offices, institutional funds).",
          descriptionClassName: "min-w-full whitespace-pre-wrap w-[min-content]",
          spacerClassName: "absolute h-[50px] left-[42.47px] top-[153px] w-[200px]",
        },
        {
          key: "idea-pitch",
          media: (
            <div className="h-[92.612px] relative shrink-0 w-[103px]" data-name="image 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={ideaPitchImage.src} />
            </div>
          ),
          cardClassName: "h-full items-start justify-between",
          headerClassName: "items-center w-full",
          titleBlockClassName: "w-[200px]",
          titleClassName: "w-full",
          titleLines: ["IDEA PITCH"],
          subtitleContainerClassName: "content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-full",
          subtitleTextClassName: "flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#050b11] text-[18px] tracking-[0.36px]",
          subtitleLines: ["This is a competition-meets-opportunity"],
          description: "platform embedded inside the Summit. Founders, social entrepreneurs, students and innovators get a structured slot to pitch a business idea, a sustainability project, or a social impact initiative to a panel of judges — with real, tangible support on the line: Grants, Material donations & Partners",
          descriptionClassName: "whitespace-pre-wrap w-full",
        },
      ],
    },
  ];

  const renderCard = (card: (typeof highlightRows)[number]["cards"][number]) => (
    <div key={card.key} className="flex flex-row items-center self-stretch">
      <div className={`bg-[#f0f1f4] content-stretch flex flex-col relative rounded-[15px] shrink-0 w-[378.873px] ${card.cardClassName}`.trim()}>
        <div aria-hidden="true" className="absolute border border-[#a4c6e6] border-solid inset-0 pointer-events-none rounded-[15px]" />
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start px-[24px] py-[20px] relative w-full">
            <div className={`content-stretch flex gap-[10px] relative shrink-0 ${card.headerClassName}`.trim()}>
              {card.media}
              <div className={`content-stretch flex flex-col gap-[9px] items-start relative shrink-0 ${card.titleBlockClassName}`.trim()}>
                <div className={`flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#050b11] text-[18px] ${card.titleClassName}`.trim()}>
                  {card.titleLines.map((line, index) => (
                    <p key={`${card.key}-title-${index}`} className={`leading-[1.2] ${index === 0 && card.titleLines.length > 1 ? "mb-0" : ""}`.trim()}>
                      {line}
                    </p>
                  ))}
                </div>
                <div className={card.subtitleContainerClassName}>
                  <div className={card.subtitleTextClassName}>
                    {card.subtitleLines.map((line, index) => (
                      <p key={`${card.key}-subtitle-${index}`} className={`leading-[1.2] ${index === 0 && card.subtitleLines.length > 1 ? "mb-0" : ""}`.trim()}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#050b11] text-[18px] text-justify tracking-[0.36px] ${card.descriptionClassName || "w-full"}`.trim()}>
              <p className="leading-[1.2]">{card.description}</p>
            </div>
          </div>
        </div>
        {card.spacerClassName ? <div className={card.spacerClassName} /> : null}
      </div>
    </div>
  );

  return (
    <MainSectionShell className="content-stretch flex flex-col gap-[60px] items-start">
      <div className="content-stretch flex flex-col gap-[45px] items-start relative shrink-0 w-full">
        <SectionEyebrow label="CATALYZING A GENERATIONAL LEGACY" />
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[718px]">
            <div className="flex flex-col font-['Oswald:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#f0f1f4] text-[48px] w-full">
              <p className="leading-[1.05]">SUMMIT HIGHLIGHT & INITIATIVES</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[52px] items-center relative shrink-0">
            <FilledActionButton href="/tickets" label="Get your ticket" />
            <div className="flex flex-row items-center self-stretch">
              <OutlinedActionButton href="/get-involved#become-a-sponsor" label="Become a sponsor" />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0">
        {highlightRows.map((row, rowIndex) => (
          <div key={`highlight-row-${rowIndex + 1}`} className={`content-stretch flex flex-wrap items-center justify-between gap-[24px] relative shrink-0 w-full ${row.rowClassName}`.trim()}>
            {row.cards.map(renderCard)}
          </div>
        ))}
      </div>
    </MainSectionShell>
  );
}

function SponsorsTeaserSection() {
  return (
    <MainSectionShell className="content-stretch flex flex-col items-start">
      <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
        <SectionEyebrow label="SPONSORS" />
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[718px]">
            <div className="flex flex-col font-['Oswald:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#f0f1f4] text-[48px] w-full">
              <p className="leading-[1.05]">SPONSORS REVEAL (COMING SOON)</p>
            </div>
          </div>
          <div className="content-stretch flex h-[52px] items-center relative shrink-0">
            <FilledActionButton backgroundClassName="bg-[#ffd966]" href="/get-involved#become-a-sponsor" label="Become a sponsor" withArrow={false} />
          </div>
        </div>
      </div>
    </MainSectionShell>
  );
}

function SpeakersSection() {
  return (
    <MainSectionShell className="content-stretch flex flex-col gap-[60px] items-center justify-center" id="speakers">
      <div className="content-stretch flex flex-col gap-[45px] items-start relative shrink-0 w-full">
        <SectionEyebrow label="SPEAKERS" />
        <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[718px]">
            <div className="flex flex-col font-['Oswald:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#f0f1f4] text-[48px] w-full">
              <p className="leading-[1.05]">MEET OUR SPEAKERS</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[52px] items-center relative shrink-0">
            <FilledActionButton href="/tickets" label="Get your ticket" />
            <div className="flex flex-row items-center self-stretch">
              <OutlinedActionButton href="/get-involved#apply-to-speak" label="Apply to speak" />
            </div>
          </div>
        </div>
      </div>
      <ActionButton borderClassName="border-[#f0f1f4]" label="View more speakers" textClassName="text-[#f0f1f4]" variant="outline" />
    </MainSectionShell>
  );
}

function ScheduleSection() {
  const scheduleDays = [
    {
      day: "Day 1",
      date: "11th AUGUST",
      details: "Main Summit Event · 4 Stages Active from 10:45 AM · Venue Opens 8:00 AM",
      rowClassName: "text-center whitespace-nowrap",
      detailsClassName: "text-[18px] tracking-[0.36px]",
    },
    {
      day: "Day 2",
      date: "12th AUGUST",
      details: "Three Keynotes · Four Stages · 100 Under 40 Awards · Guinness World Records Attempt · International Youth Day",
      labelClassName: "items-end",
      rowClassName: "w-full",
      detailsClassName: "text-[18px] text-right tracking-[0.36px] w-[775.5px] whitespace-pre-wrap",
    },
    {
      day: "Day 3",
      date: "13th AUGUST",
      details: "Investors Roundtable & Deal Room (12 PM) · Red Carpet (4 PM) · Gala & Awards Night (7 PM)",
      rowClassName: "text-center whitespace-nowrap",
      detailsClassName: "text-[18px] tracking-[0.36px]",
    },
  ];

  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" id="event-schedule">
      <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[45px] items-start relative shrink-0 w-full">
          <SectionEyebrow label="SCHEDULE" />
          <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-[760px]">
              <div className="flex flex-col font-['Oswald:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#f0f1f4] text-[48px] w-full">
                <p className="leading-[1.05]">EVENT SCHEDULE</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[52px] items-center relative shrink-0">
              <FilledActionButton href="/tickets" label="Get your ticket" />
              <div className="flex flex-row items-center self-stretch">
                <OutlinedActionButton href="/#event-schedule" label="View full schedule" />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[25px] items-start relative shrink-0 w-full">
          {scheduleDays.map((scheduleDay) => (
            <div key={scheduleDay.day} className="bg-[rgba(164,198,230,0.1)] relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border border-[#a4c6e6] border-solid inset-0 pointer-events-none" />
              <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
                <div className={`content-stretch flex items-center justify-between leading-[0] not-italic relative shrink-0 text-[#f0f1f4] w-full ${scheduleDay.rowClassName || ""}`.trim()}>
                  <div className={`content-stretch flex gap-[20px] justify-center relative shrink-0 ${scheduleDay.labelClassName || "items-center"}`.trim()}>
                    <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[24px] tracking-[-1.44px]">
                      <p className="leading-[1.4]">{scheduleDay.day}</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[32px]">
                      <p className="leading-[1.02]">{scheduleDay.date}</p>
                    </div>
                  </div>
                  <div className={`flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 ${scheduleDay.detailsClassName}`.trim()}>
                    <p className="leading-[1.2]">{scheduleDay.details}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutEaiSection() {
  return (
    <div className="bg-[rgba(164,198,230,0.1)] relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[45px] items-start justify-center p-[48px] relative w-full">
          <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
            <SectionEyebrow label="ABOUT EAI" className="w-full" textClassName="text-left" />
            <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
              <div className="content-stretch flex items-center relative shrink-0 w-[744px]">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[25px] items-start leading-[0] min-h-px min-w-px relative">
                  <div className="flex flex-col font-['Oswald:SemiBold',sans-serif] font-semibold justify-center relative shrink-0 text-[#ffd966] text-[48px] w-full">
                    <p className="leading-[1.05]">ABOUT EMMANUEL AGIDA INTERNATIONAL</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center not-italic relative shrink-0 text-[#f0f1f4] text-[24px] text-justify tracking-[-1.44px] w-full">
                    <p className="leading-[1.4]">EAI operates at the intersection of leadership, strategy, innovation, governance, and development, providing advisory services and implementing programs that drive sustainable growth, institutional excellence, and societal transformation.</p>
                  </div>
                </div>
              </div>
              <div className="h-[261px] overflow-clip relative shrink-0 w-[372px]">
                <div className="-translate-y-1/2 absolute left-0 size-[372px] top-[calc(50%+0.5px)]" data-name="EAI 1">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={eaiShowcaseImage.src} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center relative shrink-0">
            <FilledActionButton label="Learn more" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqToggleIcon({ className }: { className?: string }) {
  return (
    <div className={className || "relative shrink-0 size-[24px]"} data-name="cross">
      <div className="absolute bottom-1/4 left-1/2 right-1/2 top-1/4">
        <div className="absolute inset-[-8.33%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 14">
            <path d="M1 1V13" id="Vector 52" stroke="var(--stroke-0, #F0F1F4)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 flex items-center justify-center left-1/4 right-1/4 top-1/2">
        <div className="flex-none h-[12px] rotate-90 w-px">
          <div className="relative size-full">
            <div className="absolute inset-[-8.33%_-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 14">
                <path d="M1 1V13" id="Vector 53" stroke="var(--stroke-0, #F0F1F4)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqSection() {
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
  ];

  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[45px] items-start relative shrink-0 w-full">
        <SectionEyebrow label="FREQUENTLY ASKED QUESTIONS" />
        <div className="content-stretch flex items-end relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[718px]">
            <div className="flex flex-col font-['Oswald:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#f0f1f4] text-[48px] w-full">
              <p className="leading-[1.05]">EVERYTHING YOU NEED TO KNOW</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        {faqQuestions.map((question) => (
          <div key={question} className="content-stretch flex gap-[15px] items-start py-[24px] relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#f0f1f4] text-[18px] tracking-[0.36px]">
              <p className="leading-[1.2]">{question}</p>
            </div>
            <FaqToggleIcon />
          </div>
        ))}
      </div>
    </div>
  );
}

function ClosingCtaSection() {
  return (
    <div className="bg-[rgba(255,217,102,0.1)] content-stretch flex flex-col gap-[60px] items-center justify-center py-[60px] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
        <SectionEyebrow label="THE ACHIEVERS SUMMIT 2026" />
        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[25px] items-start leading-[0] min-h-px min-w-px relative text-[#f0f1f4] text-center">
            <div className="flex flex-col font-['Oswald:SemiBold',sans-serif] font-semibold justify-center relative shrink-0 text-[48px] w-full">
              <p className="leading-[1.05]">YOUR SEAT AT THE TABLE IS WAITING</p>
            </div>
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center not-italic relative shrink-0 text-[24px] tracking-[-1.44px] w-full">
              <p className="leading-[1.4]">Three days. Four tracks. One conversation that changes everything.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[52px] items-center relative shrink-0">
        <FilledActionButton href="/tickets" label="Get your ticket" />
        <div className="flex flex-row items-center self-stretch">
          <OutlinedActionButton href="/get-involved#become-a-sponsor" label="Become a sponsor" />
        </div>
      </div>
    </div>
  );
}

function ScheduleAboutAndCtaSection() {
  return (
    <MainSectionShell className="content-stretch flex flex-col gap-[120px] items-start" id="schedule">
      <ScheduleSection />
      <AboutEaiSection />
      <FaqSection />
      <ClosingCtaSection />
    </MainSectionShell>
  );
}

function MainContentSections() {
  return (
    <section className="relative overflow-hidden bg-[#050b11]" data-name="Main content">
      <div className="absolute inset-0" data-name="Asset 1 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={pageBackgroundImage.src} />
      </div>
      <MainContentPatternOverlay />
      <div className="relative flex flex-col gap-[120px] py-[120px]">
        <ContentTracksSection />
        <SummitHighlightsSection />
        <SponsorsTeaserSection />
        <SpeakersSection />
        <ScheduleAboutAndCtaSection />
      </div>
    </section>
  );
}

function HeroPatternSvg() {
  return (
    <div className="absolute h-[1350px] left-[-117.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[117.75px_135px] mask-size-[1440px_1110px] top-[-135px] w-[2155.5px]" data-name="Group" style={{ maskImage: `url('${imgGroup4}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2155.5 1350">
        <g id="Group" opacity="0.07">
          <path d={svgPaths.p1fcbae00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector" />
          <path d={svgPaths.p304ddb80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_2" />
          <path d={svgPaths.p135d2400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_3" />
          <path d={svgPaths.p240e7500} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_4" />
          <path d={svgPaths.p2eb94b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_5" />
          <path d={svgPaths.p578000} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_6" />
          <path d={svgPaths.p1fa2e900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_7" />
          <path d={svgPaths.p9fb1880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_8" />
          <path d={svgPaths.p33b3200} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_9" />
          <path d={svgPaths.p250b8e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_10" />
          <path d={svgPaths.p19f9cc00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_11" />
          <path d={svgPaths.p18b0b5f0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_12" />
          <path d={svgPaths.p91cab00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_13" />
          <path d={svgPaths.p3005f100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_14" />
          <path d={svgPaths.p29b84600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_15" />
          <path d={svgPaths.p233c3a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_16" />
          <path d={svgPaths.pcb3a500} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_17" />
          <path d={svgPaths.p36b1e00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_18" />
          <path d={svgPaths.p3953700} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_19" />
          <path d={svgPaths.p18c97580} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_20" />
          <path d={svgPaths.p1baf1180} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_21" />
          <path d={svgPaths.p3c32de00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_22" />
          <path d={svgPaths.p2d1ec300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_23" />
          <path d={svgPaths.pe5b5380} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_24" />
          <path d={svgPaths.p2550b300} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_25" />
          <path d={svgPaths.p21556680} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_26" />
          <path d={svgPaths.pa2e1d30} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_27" />
          <path d={svgPaths.p6c04580} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_28" />
          <path d={svgPaths.p287cfc80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_29" />
          <path d={svgPaths.pf364a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_30" />
          <path d={svgPaths.p56a3f00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_31" />
          <path d={svgPaths.p58fb900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_32" />
          <path d={svgPaths.p7bc4880} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_33" />
          <path d={svgPaths.p324162c0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_34" />
          <path d={svgPaths.p3c91a500} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_35" />
          <path d={svgPaths.p6375a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_36" />
          <path d={svgPaths.p52e6000} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_37" />
          <path d={svgPaths.pc99b00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_38" />
          <path d={svgPaths.p22950600} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_39" />
          <path d={svgPaths.pf73db00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_40" />
          <path d={svgPaths.p1d701c00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_41" />
          <path d={svgPaths.pd108a00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_42" />
          <path d={svgPaths.p1a65e100} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_43" />
          <path d={svgPaths.p3878cd80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_44" />
          <path d={svgPaths.p1366bdc0} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_45" />
          <path d={svgPaths.p1f25a200} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_46" />
          <path d={svgPaths.p14c78c80} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_47" />
          <path d={svgPaths.p37f23900} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_48" />
          <path d={svgPaths.p35074400} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_49" />
          <path d={svgPaths.pd5c3f00} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_50" />
          <path d={svgPaths.p1bcbf070} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_51" />
          <path d={svgPaths.pf9f2180} fill="var(--fill-0, #A4C6E6)" fillOpacity="0.2" id="Vector_52" />
        </g>
      </svg>
    </div>
  );
}

function HeroPatternBackdrop() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Clip path group">
      <div className="absolute contents left-[-117.75px] top-[-135px]" data-name="Group">
        <HeroPatternSvg />
      </div>
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <div className={className || "relative shrink-0 size-[24px]"} data-name="Calendar_duotone_line">
      <div className="absolute bottom-[54.17%] left-[12.5%] right-[12.5%] top-1/4">
        <div className="absolute inset-[-12%_-3.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2 6.2">
            <path d={svgPaths.p35fc3000} id="Rectangle 26" stroke="var(--stroke-0, #F0F1F4)" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[12.5%] right-[12.5%] rounded-[2px] top-1/4">
        <div aria-hidden="true" className="absolute border-[#f0f1f4] border-[1.2px] border-solid inset-[-0.6px] pointer-events-none rounded-[2.6px]" />
      </div>
      <div className="absolute inset-[66.67%_37.5%_33.33%_37.5%]">
        <div className="absolute inset-[-0.6px_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 1.2">
            <path d="M0.6 0.6H6.6" id="Vector 4" stroke="var(--stroke-0, #7E869E)" strokeLinecap="round" strokeOpacity="0.25" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[12.5%_66.67%_70.83%_33.33%] items-center justify-center">
        <div className="flex-none h-px rotate-90 w-[4px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.6px_-15%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2 1.2">
                <path d="M0.6 0.6H4.6" id="Line 1" stroke="var(--stroke-0, #F0F1F4)" strokeLinecap="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[12.5%_33.33%_70.83%_66.67%] items-center justify-center">
        <div className="flex-none h-px rotate-90 w-[4px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.6px_-15%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2 1.2">
                <path d="M0.6 0.6H4.6" id="Line 1" stroke="var(--stroke-0, #F0F1F4)" strokeLinecap="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <div className={className || "relative shrink-0 size-[24px]"} data-name="Pin_alt">
      <div className="absolute inset-[8.33%_20.83%_25.41%_20.83%]" data-name="Subtract">
        <div className="absolute inset-[-6.29%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 17.9021">
            <path d={svgPaths.p2eb50200} fill="var(--stroke-0, #F0F1F4)" id="Subtract" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_12.5%]">
        <div className="absolute inset-[8.33%_-5.56%_-16.67%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 6.50017">
            <path d={svgPaths.p28013a00} id="Ellipse 40" stroke="var(--stroke-0, #F0F1F4)" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HeroSectionContent() {
  const metaBadges = [
    { icon: <CalendarIcon />, label: "August 11-13, 2026" },
    { icon: <MapPinIcon />, label: "Lagos, Nigeria" },
  ];
  const countdownStats = [
    { value: "142", label: "Days", containerClassName: "w-[46px]" },
    { value: "00", label: "Hours", containerClassName: "w-[73px]" },
    { value: "52", label: "Min", containerClassName: "w-[46px]" },
    { value: "25", label: "Sec", containerClassName: "w-[46px]" },
  ];

  return (
    <div className="relative mx-auto flex min-h-[998px] w-[calc(100%-32px)] max-w-[1248px] flex-col items-center gap-[60px] py-[120px] pt-[112px]">
      <div className="content-stretch flex flex-col gap-[45px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-wrap justify-center gap-4 items-center relative shrink-0 md:gap-10 xl:gap-[80px]">
          {metaBadges.map((badge) => (
            <div key={badge.label} className="bg-[rgba(164,198,230,0.1)] content-stretch flex gap-[10px] items-center justify-center px-[18px] py-[9px] relative shrink-0">
              <div aria-hidden="true" className="absolute border border-[#a4c6e6] border-solid inset-0 pointer-events-none" />
              {badge.icon}
              <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f0f1f4] text-[18px] tracking-[0.36px] whitespace-nowrap">
                <p className="leading-[1.2]">{badge.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
          <h1 className="flex flex-col font-['Oswald:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f0f1f4] text-[0px] text-center">
            <span className="block mb-0 text-[clamp(40px,7vw,72px)] whitespace-pre-wrap">
              <span className="leading-[1.05]">{`AFRICA’S `}</span>
              <span className="font-['Oswald:Bold',sans-serif] font-bold leading-[1.05] text-[#f0f1f4]">MOST</span>
              <span className="leading-[1.05]">{` `}</span>
            </span>
            <span className="block mb-0 text-[clamp(40px,7vw,72px)] whitespace-pre-wrap">
              <span className="font-['Oswald:Bold',sans-serif] font-bold leading-[1.05] text-[#f0f1f4]">INFLUENTIAL</span>
              <span className="leading-[1.05]">{` LEADERSHIP `}</span>
            </span>
            <span className="block leading-[1.05] mb-0 text-[clamp(40px,7vw,72px)] whitespace-pre-wrap">{`AND ENTREPRENEURSHIP `}</span>
            <span className="block leading-[1.05] text-[clamp(40px,7vw,72px)] whitespace-pre-wrap">SUMMIT</span>
          </h1>
        </div>
        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full max-w-[692px] px-4">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#a4c6e6] text-[24px] text-center tracking-[-1.44px]">
            <p className="leading-[1.4]">{` A 3-day high-level experience uniting innovators, policymakers, and changemakers redefining the African narrative.`}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-wrap justify-center gap-4 items-center relative shrink-0 md:gap-[52px]">
          <FilledActionButton href="/tickets" label="Get your ticket" />
          <div className="flex flex-row items-center self-stretch">
            <OutlinedActionButton href="/get-involved#become-a-sponsor" label="Become a sponsor" />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f0f1f4] text-[18px] tracking-[0.36px] whitespace-nowrap">
          <p className="leading-[1.2]">EVENT STARTS IN</p>
        </div>
        <div className="content-stretch flex flex-wrap justify-center gap-[21px] items-center relative shrink-0 w-full">
          {countdownStats.map((stat) => (
            <div key={stat.label} className={`content-stretch flex flex-col gap-[10px] items-center relative shrink-0 ${stat.containerClassName}`.trim()}>
              <div className="flex flex-col font-['Oswald:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f0f1f4] text-[32px] text-center whitespace-nowrap">
                <p className="leading-[1.02]">{stat.value}</p>
              </div>
              <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f0f1f4] text-[16px] text-center tracking-[0.8px] whitespace-nowrap">
                <p className="leading-[1.02]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImpactAndMediaSection() {
  const stats = [
    { value: "5,000+", label: "Attendees", widthClassName: "w-[166.5px]" },
    { value: "25,000+", label: "Virtual audience", widthClassName: "w-[270px]" },
    { value: "50+", label: "Speakers", widthClassName: "w-[149px]" },
    { value: "6", label: "Content Tracks", widthClassName: "w-[258px]" },
    { value: "4", label: "Stages", widthClassName: "w-[157px]" },
  ];

  return (
    <section className="relative w-full bg-[#f0f1f4] py-[120px]" data-name="Impact and media">
      <MainSectionShell className="content-stretch flex flex-col gap-[60px] items-start">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          {stats.map((stat) => (
            <div key={stat.label} className={`content-stretch flex flex-col gap-[30px] items-center relative shrink-0 ${stat.label === "Content Tracks" ? stat.widthClassName : ""}`.trim()}>
              <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
                <div className="flex flex-col font-['Oswald:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#050b11] text-[72px] text-center whitespace-nowrap">
                  <p className="leading-[1.05]">{stat.value}</p>
                </div>
              </div>
              <div className={`content-stretch flex items-center justify-center relative shrink-0 ${stat.widthClassName}`.trim()}>
                <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#050b11] text-[32px] text-center">
                  <p className="leading-[1.02]">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="content-stretch flex flex-col gap-[60px] items-center relative shrink-0 w-full">
          <div className="h-[510px] relative shrink-0 w-[1028px]">
            <div className="absolute inset-0 bg-[#d9d9d9]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic text-[32px] text-black text-center whitespace-nowrap">
                <p className="leading-[1.02]">Youtube Video</p>
              </div>
            </div>
          </div>
          <FilledActionButton label="Download summit prospectus" />
          <div className="content-stretch flex flex-col gap-[24px] items-end leading-[0] not-italic relative shrink-0 text-[#050b11] text-[32px] w-full">
            <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-center w-full">
              <p className="leading-[1.02]">"The conversation Africa needs is not happening in boardrooms behind closed doors. It is happening here — in the open, with urgency, and with the next generation in the room."</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center relative shrink-0 text-right w-full">
              <p className="leading-[1.02]">―Emmanuel Agida, Convener</p>
            </div>
          </div>
        </div>
      </MainSectionShell>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[1110px]" data-name="Hero section">
      <div className="absolute h-[1110px] inset-x-0 top-0 w-full" data-name="Asset 1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={pageBackgroundImage.src} />
      </div>
      <HeroPatternBackdrop />
      <div className="absolute h-[33px] left-[86.18px] top-[939px] w-[46px]" />
      <HeroSectionContent />
    </section>
  );
}

export default function HomePage() {
  return (
    <ResponsiveArtboard fillViewportWidth>
      <section className="relative min-h-full w-full " data-name="Home page">
        <HeroSection />
        <ImpactAndMediaSection />
        <MainContentSections />
      </section>
    </ResponsiveArtboard>
  );
}
