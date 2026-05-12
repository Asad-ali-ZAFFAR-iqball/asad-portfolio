"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  as?: "section" | "div" | "article";
}

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/**
 * A wrapper that animates children into view when they enter the viewport.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as: Tag = "section",
}: AnimatedSectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      ref={ref}
      variants={variants[direction]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
