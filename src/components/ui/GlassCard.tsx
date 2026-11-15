"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

/**
 * A frosted-glass card with optional hover lift and glow effect.
 */
export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover
          ? { y: -4 }
          : undefined
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "glass-panel rounded-2xl",
        glow && "glass-glow",
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
