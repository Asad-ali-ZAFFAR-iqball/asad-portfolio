"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

/**
 * Reusable section heading with eyebrow text, title, and optional description.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter ? "text-center" : "text-left", "mb-16", className)}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full border border-brand-500/30 text-brand-400 bg-brand-500/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed",
            isCenter && "max-w-2xl mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
