"use client";

import { m } from "framer-motion";
import { Mail, UserCheck } from "lucide-react";
import { references } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export function Testimonials() {
  return (
    <section
      id="references"
      className="relative py-24 sm:py-32"
      aria-label="Professional references section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Professional References"
          title="People who can vouch for my work."
          description="References are available to confirm my experience and contributions."
        />

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {references.map((ref, i) => (
            <m.div
              key={ref.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={references.length === 1 ? "sm:col-span-2" : undefined}
            >
              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl icon-tile flex-shrink-0">
                    <UserCheck size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white">{ref.name}</h3>
                    <p className="text-sm text-brand-500 dark:text-brand-400 font-medium mt-0.5">
                      {ref.title}, {ref.company}
                    </p>
                    <a
                      href={`mailto:${ref.email}`}
                      className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 mt-3 transition-colors"
                    >
                      <Mail size={14} />
                      {ref.email}
                    </a>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
