"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Users,
  Zap,
  Target,
  BookOpen,
  Globe,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { personalInfo, stats } from "@/data";

const QUALITIES = [
  {
    icon: <Layers size={22} className="text-brand-500" />,
    title: "Systems Architect",
    description:
      "Designs distributed, cloud-native systems that scale to millions of users while maintaining reliability, observability, and operational excellence.",
  },
  {
    icon: <Users size={22} className="text-violet-500" />,
    title: "Engineering Leader",
    description:
      "Mentors engineers, drives technical strategy, and bridges the gap between product vision and engineering execution at the team level.",
  },
  {
    icon: <Zap size={22} className="text-amber-500" />,
    title: "Performance Obsessed",
    description:
      "Relentlessly optimizes for speed and efficiency — from database query plans to CDN edge caching and frontend bundle sizes.",
  },
  {
    icon: <Target size={22} className="text-emerald-500" />,
    title: "Product-Minded",
    description:
      "Writes code with business outcomes in mind. Translates ambiguous requirements into clean, maintainable technical implementations.",
  },
  {
    icon: <BookOpen size={22} className="text-cyan-500" />,
    title: "Continuous Learner",
    description:
      "Holds 5 industry certifications across AWS, Kubernetes, and Scrum. Stays current with the evolving tech landscape and best practices.",
  },
  {
    icon: <Globe size={22} className="text-pink-500" />,
    title: "Global Collaborator",
    description:
      "Worked in cross-cultural, globally distributed teams across Pakistan, US, and Europe. Expert in async-first communication and documentation.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="About section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="Engineering excellence, delivered."
          description="A senior engineer who brings clarity to complexity and momentum to ambitious products."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio text column */}
          <AnimatedSection direction="right" className="space-y-6">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                I&apos;m{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {personalInfo.name}
                </span>
                , a Senior Software Engineer based in{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {personalInfo.location}
                </span>{" "}
                with{" "}
                <span className="font-semibold text-brand-500">8+ years</span>{" "}
                of experience architecting and delivering enterprise-grade software
                across fintech, edtech, healthcare, and e-commerce.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                I specialize in{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  full-stack development
                </span>{" "}
                with deep expertise in cloud-native architectures, distributed
                systems, and high-performance APIs. I&apos;ve led teams of up to 8
                engineers and delivered systems processing{" "}
                <span className="font-semibold text-brand-500">
                  10M+ daily transactions
                </span>
                .
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                Beyond the code, I care deeply about{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  engineering culture
                </span>{" "}
                — mentoring engineers, championing best practices, and building
                team environments where great software thrives. I believe the best
                code is written by engineers who understand both the business and
                the bytes.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-gray-50/80 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.06]"
                >
                  <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                    {stat.value}
                    <span className="text-brand-500">{stat.suffix}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech philosophy quote */}
            <blockquote className="relative pl-4 border-l-2 border-brand-500">
              <p className="italic text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                &ldquo;The best architecture is the one that makes the next change
                easier, not the one that anticipates every future requirement.&rdquo;
              </p>
            </blockquote>
          </AnimatedSection>

          {/* Qualities grid */}
          <AnimatedSection direction="left" className="grid sm:grid-cols-2 gap-4">
            {QUALITIES.map((quality, i) => (
              <motion.div
                key={quality.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard
                  hover
                  className="p-5 h-full"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-lg bg-gray-100 dark:bg-white/5 flex-shrink-0">
                      {quality.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                        {quality.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {quality.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
