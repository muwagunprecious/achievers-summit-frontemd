"use client";

import { type CSSProperties, type ReactNode } from "react";

type ResponsiveArtboardProps = {
  children: ReactNode;
  desktopWidth?: number;
  fillViewportWidth?: boolean;
};

export default function ResponsiveArtboard({
  children,
  desktopWidth = 1440,
  fillViewportWidth: _fillViewportWidth = false,
}: ResponsiveArtboardProps) {
  const artboardStyle: CSSProperties | undefined = desktopWidth === 1440
    ? undefined
    : { maxWidth: `${desktopWidth}px` };

  return (
    <section
      id="responsive-artboard"
      className="relative w-full overflow-x-hidden bg-[#050b11]"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px]"
        style={artboardStyle}
      >
        <div className="relative w-full">
          {children}
        </div>
      </div>
    </section>
  );
}
