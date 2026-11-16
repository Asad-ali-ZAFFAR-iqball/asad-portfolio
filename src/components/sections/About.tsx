"use client";

import { m } from "framer-motion";
import {
  Layers,
  Users,
  Zap,
  Target,
  BookOpen,
  Globe,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Counter } from "@/components/ui/Counter";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { personalInfo, stats } from "@/data";

const QUALITIES = [
  {
    icon: <Layers size={22} className="text-brand-500" />,
    title: "Laravel Specialist",
    description:
      "Deep experience across the Laravel ecosystem — MVC, routing, middleware, Eloquent ORM, Queues & Jobs, Horizon and Inertia.js.",
  },
  {
    icon: <Users size={22} className="text-violet-500" />,
    title: "Team Collaborator",
    description:
      "Works closely with teams on feature design, UI and code reviews using Git, Bitbucket, Jira and Slack.",
  },
  {
    icon: <Zap size={22} className="text-amber-500" />,
    title: "Performance Focused",
    description:
      "Improves speed with Redis caching on high-traffic Eloquent queries and moves heavy work into queued background jobs.",
  },
  {
    icon: <Target size={22} className="text-emerald-500" />,
    title: "End-to-End Ownership",
    description:
      "Owns features from database design through third-party integrations and production release.",
  },
  {
    icon: <BookOpen size={22} className="text-cyan-500" />,
    title: "DevOps Minded",
    description:
      "Containerizes apps with Docker, sets up CI/CD with GitHub Actions, manages SSH deployments and monitors errors with Sentry.",
  },
  {
    icon: <Globe size={22} className="text-pink-500" />,
    title: "Integration Expert",
    description:
      "Connects Laravel backends to Google, Facebook, Instagram, LinkedIn, Twilio, Google Maps and VONQ.",
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
        <m.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="Scalable web apps, built end-to-end."
          description="A Laravel and full-stack developer who ships clean, maintainable features from database to UI."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio text column */}
          <AnimatedSection as="div" direction="right" className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                I&apos;m{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {personalInfo.name}
                </span>
                , a Laravel Developer and Full-Stack Engineer based in{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {personalInfo.location}
                </span>{" "}
                with{" "}
                <span className="font-semibold text-brand-500">3+ years</span>{" "}
                of experience building scalable web applications across the
                PHP/Laravel ecosystem and modern JavaScript frameworks (Vue.js,
                React.js) using TypeScript.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                I have hands-on experience with{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Eloquent ORM, RESTful API design, Laravel Queues/Jobs
                </span>{" "}
                monitored via Laravel Horizon, Redis caching, Docker
                containerization, and CI/CD pipelines with{" "}
                <span className="font-semibold text-brand-500">
                  SSH-managed deployments
                </span>
                .
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                I&apos;m comfortable{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  owning features end-to-end
                </span>{" "}
                — from database design through third-party integrations (Google,
                Facebook, Twilio, Google Maps) and production release — on
                products like an AI-based HR system, a healthcare monitoring
                platform and a LinkedIn lead generation app.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel glass-glow p-4 rounded-xl transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                    <Counter value={stat.value} />
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
                &ldquo;Clean, maintainable code and a responsive UI — from the
                first migration to the production release.&rdquo;
              </p>
            </blockquote>
          </AnimatedSection>

          {/* Qualities grid */}
          <AnimatedSection as="div" direction="left" className="grid sm:grid-cols-2 gap-4">
            {QUALITIES.map((quality, i) => (
              <m.div
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
              </m.div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
