"use client";

import React, { Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

// Dynamically import the standard Spline component with SSR disabled
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl animate-pulse" />
  ),
});

export function SplineBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fix Spline canvas to always fill the container on resize
  useEffect(() => {
    const resizeCanvas = () => {
      if (!containerRef.current) return;
      const canvas = containerRef.current.querySelector("canvas");
      if (canvas) {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      }
    };
    // Run on load and on every resize
    const observer = new ResizeObserver(resizeCanvas);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", resizeCanvas);
    // Delay first run to let Spline mount the canvas
    const t = setTimeout(resizeCanvas, 500);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden w-screen h-dvh"
    >
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        {/* Spline renders a canvas; we scale it to cover the full viewport */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/*
            On mobile (<640px), the 3D scene is scaled up and shifted
            to center on the most visually interesting part.
            On tablet / desktop it fills naturally.
          */}
          <div
            className={cn(
              "pointer-events-none w-full h-full",
              "[&>canvas]:w-full! [&>canvas]:h-full! [&>canvas]:object-cover",
              "scale-[1.5] origin-top",
              "sm:scale-[1.15] sm:origin-center",
              "md:scale-100 md:origin-center",
            )}
          >
            <Spline scene="https://prod.spline.design/qXPwShKp8X-0YIt0/scene.splinecode" />
          </div>
        </div>
      </Suspense>

      {/* Gradient overlays for readability across themes */}
      {/* Bottom fade — strongest, ensures footer area is readable */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background to-transparent" />
      {/* Top fade — subtle, blends under navbar */}
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background/60 to-transparent" />
      {/* Overall dark tint — stronger in dark mode */}
      <div className="absolute inset-0 bg-background/5 dark:bg-background/50" />
      {/* Side fades on mobile to prevent scene clipping looking abrupt */}
      <div className="absolute inset-y-0 left-0 w-8 bg-linear-to-r from-background/30 to-transparent sm:hidden" />
      <div className="absolute inset-y-0 right-0 w-8 bg-linear-to-l from-background/30 to-transparent sm:hidden" />
    </div>
  );
}
