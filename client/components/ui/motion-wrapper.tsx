"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, type Variant } from "framer-motion";
import gsap from "gsap";

// ─── Fade In on Scroll ───────────────────────────────────────────────
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const directionOffsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Container ──────────────────────────────────────────────
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Item (must be child of StaggerContainer) ────────────────
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directionOffsets[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter (GSAP-powered) ─────────────────────────────────
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated.current && counterRef.current) {
      hasAnimated.current = true;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent =
              Math.round(obj.value).toLocaleString() + suffix;
          }
        },
      });
    }
  }, [isInView, target, suffix, duration]);

  return (
    <div ref={ref}>
      <span ref={counterRef} className={className}>
        0{suffix}
      </span>
    </div>
  );
}

// ─── Scale on Hover ──────────────────────────────────────────────────
interface ScaleOnHoverProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export function ScaleOnHover({
  children,
  className,
  scale = 1.03,
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Text Reveal (word by word) ──────────────────────────────────────
interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
}

export function TextReveal({ text, className, once = true }: TextRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04 } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.4, ease: "easeOut" },
            },
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
