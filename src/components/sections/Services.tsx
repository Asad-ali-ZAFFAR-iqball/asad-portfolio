"use client";

import { motion } from "framer-motion";
import { Server, Layers, Plug, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

// Drawn from the CV (profile bio + experience); edit freely.
const SERVICES = [
  {
    icon: Server,
    title: "Laravel Backend Development",
    description: "Scalable Laravel applications with clean Eloquent models, queues and jobs monitored in Horizon, and Redis caching.",
  },
  {
    icon: Layers,
    title: "Full-Stack Web Apps",
    description: "End-to-end features with Vue.js or React and TypeScript, from database design to a polished, responsive UI.",
  },
  {
    icon: Plug,
    title: "APIs & Integrations",
    description: "RESTful API design and third-party integrations such as Google, Facebook, Twilio and Google Maps.",
  },
  {
    icon: Rocket,
    title: "DevOps & Deployment",
    description: "Docker containerization, CI/CD pipelines and SSH-managed deployments that get features to production safely.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32" aria-label="Services section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title="How I can help."
          description="From the database to the deploy pipeline, I own features end-to-end."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard glow className="p-6 h-full transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-5 inline-flex p-3 rounded-xl bg-brand-600 text-on-brand shadow-[0_6px_16px_-6px_rgb(41_82_85/0.45)] dark:shadow-none dark:bg-brand-500/10 dark:text-brand-400">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
