"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Code2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Custom 404 page with brand-consistent design.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg"
      >
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-brand-500/10 flex items-center justify-center">
              <Code2 size={40} className="text-brand-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
              404
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-black text-gray-900 dark:text-white mb-4">
          <span className="text-gradient">404</span>
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Page not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Looks like this route doesn&apos;t exist. The endpoint you&apos;re looking for may have moved or 
          been removed from the routing configuration.
        </p>

        <Button
          href="/"
          variant="primary"
          size="md"
          icon={<ArrowLeft size={16} />}
          iconPosition="left"
        >
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
