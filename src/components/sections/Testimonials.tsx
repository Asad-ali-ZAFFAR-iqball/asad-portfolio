"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import { testimonials } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 dark:text-gray-600"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: (typeof testimonials)[number];
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <GlassCard className="p-8 sm:p-10 relative overflow-hidden">
        {/* Large quote decoration */}
        <div className="absolute top-6 right-8 text-gray-100 dark:text-white/[0.03]">
          <Quote size={80} className="fill-current" />
        </div>

        {/* Stars */}
        <div className="mb-6">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Content */}
        <blockquote className="relative z-10 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8 italic">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar placeholder */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {testimonial.name[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {testimonial.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonial.title} at {testimonial.company}
              </p>
              <p className="text-xs text-brand-500 dark:text-brand-400 font-medium mt-0.5">
                {testimonial.relationship}
              </p>
            </div>
          </div>

          {testimonial.linkedinUrl && (
            <a
              href={testimonial.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors flex-shrink-0"
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Testimonials section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-900/30 via-white dark:via-gray-950 to-gray-50/50 dark:to-gray-900/30" />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-500/5 blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Recommendations"
          title="What colleagues say."
          description="Endorsed by engineering leaders, product managers, and team members who've experienced the results firsthand."
        />

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={activeIndex}
              testimonial={testimonials[activeIndex]}
              isActive
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? "w-6 h-2 bg-brand-500"
                      : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={prev}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:border-brand-500/40 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={next}
                aria-label="Next testimonial"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:border-brand-500/40 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mini testimonial cards row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-12">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setActiveIndex(i)}
              whileHover={{ y: -2 }}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                i === activeIndex
                  ? "border-brand-500/50 bg-brand-500/5"
                  : "border-gray-200/80 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] hover:border-brand-500/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                    {t.name}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {t.relationship}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
