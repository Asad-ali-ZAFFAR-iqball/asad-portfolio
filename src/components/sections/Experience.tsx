"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { experiences } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { cn, formatDateRange, calculateDuration } from "@/lib/utils";

function TimelineItem({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[number];
  index: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  const isPresent = exp.endDate === "Present";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-10">
        {/* Node */}
        <div
          className={cn(
            "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300",
            isPresent
              ? "border-brand-400 bg-brand-500/20 shadow-[0_0_24px_-2px_rgb(var(--brand-500)/0.7)]"
              : "border-gray-300 dark:border-white/20 bg-white/80 dark:bg-gray-950/70 backdrop-blur shadow-[0_0_16px_-4px_rgb(var(--violet-500)/0.5)]"
          )}
        >
          <Briefcase
            size={16}
            className={isPresent ? "text-brand-500" : "text-gray-400 dark:text-gray-500"}
          />
          {isPresent && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white dark:border-gray-900 animate-pulse-slow" />
          )}
        </div>

        {/* Spine line */}
        {!isLast && (
          <div className="flex-1 w-0.5 mt-3 rounded-full bg-gradient-to-b from-brand-500/80 via-cyan-400/50 to-violet-500/10 shadow-[0_0_10px_rgb(var(--cyan-400)/0.45)]" />
        )}
      </div>

      {/* Card */}
      <div className="glass-panel glass-glow flex-1 mb-10 rounded-2xl p-5 sm:p-6">
        {/* Header */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="w-full text-left group"
          aria-expanded={expanded}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                  {exp.role}
                </h3>
                <Badge
                  variant={isPresent ? "glow" : "default"}
                  className={cn(isPresent && "animate-pulse-slow")}
                >
                  {isPresent ? "Current" : exp.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-brand-500 dark:text-brand-400 font-semibold hover:underline"
                  >
                    {exp.company}
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="font-semibold text-brand-500 dark:text-brand-400">
                    {exp.company}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={13} />
                {formatDateRange(exp.startDate, exp.endDate)}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                {calculateDuration(exp.startDate, exp.endDate)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={12} />
              {exp.location} · {exp.locationType}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {exp.summary}
          </p>

          {/* Expand toggle */}
          <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-brand-500 dark:text-brand-400">
            <span>{expanded ? "Show less" : "View details"}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-6">
                {/* Responsibilities */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                    Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
                    <TrendingUp size={12} />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 text-emerald-500 flex-shrink-0"
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32"
      aria-label="Experience section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Work History"
          title="Where I've made impact."
          description="From internship to building multi-tenant SaaS products with Laravel, Vue.js, React.js and TypeScript."
        />

        <div className="relative">
          {experiences.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
