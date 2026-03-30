"use client";

import { type ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type ResponsiveArtboardProps = {
  children: ReactNode;
  desktopWidth?: number;
  fillViewportWidth?: boolean;
};

export default function ResponsiveArtboard({
  children,
  desktopWidth = 1440,
  fillViewportWidth = false,
}: ResponsiveArtboardProps) {
  const [viewportWidth, setViewportWidth] = useState(() =>
    desktopWidth,
  );
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outerElement = outerRef.current;

    if (!outerElement) {
      return;
    }

    const updateViewportWidth = () => {
      const nextWidth = Math.max(Math.round(outerElement.getBoundingClientRect().width), 1);
      setViewportWidth((currentWidth) => (currentWidth === nextWidth ? currentWidth : nextWidth));
    };

    updateViewportWidth();

    const resizeObserver = new ResizeObserver(updateViewportWidth);
    resizeObserver.observe(outerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [desktopWidth]);

  useLayoutEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement) {
      return;
    }

    let frameId = 0;

    const updateContentHeight = () => {
      const rootRect = contentElement.getBoundingClientRect();
      let maxBottom = rootRect.bottom;

      for (const element of contentElement.querySelectorAll<HTMLElement>("*")) {
        const style = window.getComputedStyle(element);

        if (style.display === "none" || style.visibility === "hidden" || style.position === "fixed") {
          continue;
        }

        const rect = element.getBoundingClientRect();

        if (rect.width === 0 && rect.height === 0) {
          continue;
        }

        maxBottom = Math.max(maxBottom, rect.bottom);
      }

      const nextHeight = Math.max(
        Math.ceil(maxBottom - rootRect.top),
        Math.ceil(contentElement.scrollHeight),
        Math.ceil(contentElement.offsetHeight),
        1,
      );

      setContentHeight((currentHeight) => (currentHeight === nextHeight ? currentHeight : nextHeight));
    };

    const scheduleContentHeightUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateContentHeight);
    };

    scheduleContentHeightUpdate();

    const resizeObserver = new ResizeObserver(scheduleContentHeightUpdate);
    const mutationObserver = new MutationObserver(scheduleContentHeightUpdate);
    const imageElements = Array.from(contentElement.querySelectorAll("img"));

    resizeObserver.observe(contentElement);
    mutationObserver.observe(contentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    for (const imageElement of imageElements) {
      if (!imageElement.complete) {
        imageElement.addEventListener("load", scheduleContentHeightUpdate);
      }
    }

    window.addEventListener("load", scheduleContentHeightUpdate);
    document.fonts?.ready.then(scheduleContentHeightUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("load", scheduleContentHeightUpdate);

      for (const imageElement of imageElements) {
        imageElement.removeEventListener("load", scheduleContentHeightUpdate);
      }
    };
  }, [children, desktopWidth]);

  const scale = useMemo(() => {
    if (fillViewportWidth) {
      return viewportWidth / desktopWidth;
    }

    if (viewportWidth >= desktopWidth) {
      return 1;
    }

    return viewportWidth / desktopWidth;
  }, [desktopWidth, fillViewportWidth, viewportWidth]);

  const scaledHeight = contentHeight === null ? null : contentHeight * scale;
  const shouldScale = scale < 1;
  const shouldStretch = fillViewportWidth && scale !== 1;

  return (
    <div
      ref={outerRef}
      className="relative w-full overflow-x-hidden bg-[#050b11]"
      style={scaledHeight === null ? { minHeight: "100vh" } : { height: `${scaledHeight}px` }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          transform: shouldScale || shouldStretch ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
          width: `${desktopWidth}px`,
        }}
      >
        <div
          ref={contentRef}
          style={{
            minHeight: '500px',
            position: "relative",
            width: `${desktopWidth}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
