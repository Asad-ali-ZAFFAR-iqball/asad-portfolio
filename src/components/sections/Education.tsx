"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  ExternalLink,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import { education, certifications } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

function EducationCard({ edu }: { edu: (typeof education)[number] }) {
  return (
    <GlassCard className="p-6 hover:border-brand-500/30 transition-colors duration-300">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-brand-500/10 text-brand-500 flex-shrink-0">
          <GraduationCap size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            {edu.startYear} – {edu.endYear}
          </p>
          <h3 className="font-bold text-gray-900 dark:text-white">
            {edu.degree} in {edu.field}
          </h3>
          <p className="text-sm text-brand-500 dark:text-brand-400 font-medium mt-0.5">
            {edu.institution}
          </p>
          {edu.grade && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              GPA: {edu.grade}
            </p>
          )}
          {edu.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
              {edu.description}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard hover glow className="p-5 h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500 flex-shrink-0">
            <Award size={18} />
          </div>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View credential"
              className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>

        <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug mb-1">
          {cert.name}
        </h3>
        <p className="text-xs font-semibold text-brand-500 dark:text-brand-400 mb-2">
          {cert.issuer}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Calendar size={12} />
          <span>Issued {cert.issuedDate}</span>
          {cert.expiryDate && (
            <>
              <span>·</span>
              <span>Expires {cert.expiryDate}</span>
            </>
          )}
        </div>

        {cert.credentialId && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-3">
            <BadgeCheck size={12} className="text-emerald-500" />
            <span className="font-mono truncate">{cert.credentialId}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200/80 dark:border-white/[0.06]">
          {cert.skills.map((skill) => (
            <Badge key={skill} variant="default" size="sm">
              {skill}
            </Badge>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative py-24 sm:py-32"
      aria-label="Education and certifications section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-gray-950 via-gray-50/30 dark:via-gray-900/30 to-white dark:to-gray-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Education & Certifications"
          title="Foundations and continuous growth."
          description="Academic foundation complemented by industry-recognized certifications in cloud, DevOps, and agile engineering."
        />

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-2">
            <GraduationCap size={14} />
            Academic Background
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <EducationCard edu={edu} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-2">
            <Award size={14} />
            Professional Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
