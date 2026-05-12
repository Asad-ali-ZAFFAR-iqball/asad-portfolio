"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { projects } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn, getStatusColor } from "@/lib/utils";
import type { Project } from "@/types";

const FILTERS = ["All", "Featured", "Fintech", "EdTech", "Healthcare", "DevOps", "Open Source"] as const;
type Filter = (typeof FILTERS)[number];

function filterProjects(projects: Project[], filter: Filter): Project[] {
  if (filter === "All") return projects;
  if (filter === "Featured") return projects.filter((p) => p.featured);
  if (filter === "Open Source") return projects.filter((p) => p.status === "Open Source");
  return projects.filter(
    (p) =>
      p.tags.some((t) => t.toLowerCase() === filter.toLowerCase()) ||
      p.title.toLowerCase().includes(filter.toLowerCase())
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
    >
      <GlassCard
        hover
        glow
        className="relative overflow-hidden h-full flex flex-col"
      >
        {/* Top accent gradient */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-cyan-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-6 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                    getStatusColor(project.status)
                  )}
                >
                  {project.status}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <Star size={11} className="fill-amber-500" />
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                {project.subtitle} · {project.year}
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <Github size={16} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live site"
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/5 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {project.metrics.slice(0, 4).map((metric) => (
                <div
                  key={metric}
                  className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200/80 dark:border-emerald-500/20 rounded-lg px-2.5 py-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="truncate">{metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="ghost" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Tech stack */}
          <div className="pt-4 border-t border-gray-200/80 dark:border-white/[0.06]">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 6 && (
                <span className="px-2 py-0.5 text-xs font-mono text-gray-400 dark:text-gray-500">
                  +{project.technologies.length - 6} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover reveal arrow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 4 }}
          className="absolute bottom-4 right-4"
        >
          <ArrowUpRight size={18} className="text-brand-500" />
        </motion.div>
      </GlassCard>
    </motion.article>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = filterProjects(projects, activeFilter);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Projects section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-900/30 dark:via-gray-950 dark:to-gray-900/30" />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured Work"
          title="Products I've helped ship."
          description="Selected projects spanning fintech, edtech, healthcare, and developer tooling — built for scale."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {FILTERS.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                activeFilter === filter
                  ? "bg-brand-600 text-white shadow-glow"
                  : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
              )}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No projects match this filter.
          </div>
        )}
      </div>
    </section>
  );
}
