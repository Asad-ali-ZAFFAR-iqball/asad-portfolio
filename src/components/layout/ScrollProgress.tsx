"use client";

import { motion, useSpring } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * A thin scroll progress bar pinned to the top of the viewport.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();
  const springProgress = useSpring(progress, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-gradient-to-r from-brand-500 via-accent-cyan to-accent-violet origin-left"
      style={{ scaleX: springProgress.get() / 100 }}
      aria-hidden="true"
    />
  );
}
