"use client";

import { motion } from "framer-motion";

/**
 * Full-page loading state shown during Next.js route transitions.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo spinner */}
        <div className="relative w-16 h-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-brand-500/20 border-t-brand-500"
          />
          <div className="absolute inset-2 rounded-full bg-brand-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1.5"
        >
          {["L", "o", "a", "d", "i", "n", "g"].map((char, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
              className="text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
