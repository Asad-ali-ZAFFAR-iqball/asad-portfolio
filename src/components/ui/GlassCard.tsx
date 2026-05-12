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
          ? { y: -4, boxShadow: "0 20px 40px rgba(59,130,246,0.12)" }
          : undefined
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border",
        "bg-white/60 dark:bg-white/[0.03]",
        "border-gray-200/80 dark:border-white/[0.06]",
        "backdrop-blur-sm",
        glow && "hover:border-brand-500/30 hover:shadow-glow",
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
