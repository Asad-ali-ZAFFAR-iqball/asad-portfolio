"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, ChevronDown } from "lucide-react";
import { projects } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn, getStatusColor, withBasePath } from "@/lib/utils";
import type { Project } from "@/types";

const FILTERS = ["All", "Invictus Hub", "Freelance", "KFUEIT", "Healthcare"] as const;
type Filter = (typeof FILTERS)[number];

function filterProjects(projects: Project[], filter: Filter): Project[] {
  if (filter === "All") return projects;
  return projects.filter((p) => p.tags.includes(filter));
}

function ProjectThumbnail({ project }: { project: Project }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export; images are pre-optimized WebP
      <img
        src={withBasePath(project.image)}
        alt={`Screenshot of ${project.title}`}
        width={800}
        height={400}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  const initials = project.title
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  // Placeholder is labelled so it is never mistaken for a real screenshot.
  return (
    <div
      role="img"
      aria-label={`${project.title}: no preview available`}
      className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-500/15 via-cyan-500/10 to-violet-500/15 dark:from-brand-500/20 dark:via-cyan-500/10 dark:to-violet-500/20"
    >
      <span className="text-4xl font-bold tracking-tight text-brand-600/70 dark:text-brand-400/70 transition-transform duration-500 group-hover:scale-110">
        {initials}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Preview unavailable
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasDetails = Boolean(project.longDescription) || project.technologies.length > 6;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <TiltCard className="h-full">
      <GlassCard
        hover
        glow
        className="relative overflow-hidden h-full flex flex-col"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[2/1] overflow-hidden border-b border-gray-200/80 dark:border-white/[0.06]">
          <ProjectThumbnail project={project} />
          {/* Top accent gradient */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-500 via-cyan-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="mb-4">
            {(project.status || project.featured) && (
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {project.status && (
                  <span
                    className={cn(
                      "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                      getStatusColor(project.status)
                    )}
                  >
                    {project.status}
                  </span>
                )}
                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <Star size={11} className="fill-amber-500" />
                    Featured
                  </span>
                )}
              </div>
            )}
            <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
              {project.subtitle} · {project.year}
            </p>
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
            <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.technologies.slice(0, 6).map((tech) => (
                <li
                  key={tech}
                  className="px-2 py-0.5 text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded"
                >
                  {tech}
                </li>
              ))}
              {project.technologies.length > 6 && (
                <li className="px-2 py-0.5 text-xs font-mono text-gray-400 dark:text-gray-500">
                  +{project.technologies.length - 6} more
                </li>
              )}
            </ul>
          </div>

          {/* Details */}
          {hasDetails && (
            <details className="group/details mt-4 text-sm">
              <summary className="inline-flex items-center gap-1 cursor-pointer list-none font-medium text-brand-600 dark:text-brand-400 hover:text-brand-500 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 [&::-webkit-details-marker]:hidden">
                View details
                <ChevronDown size={14} className="transition-transform duration-200 group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.longDescription && <p>{project.longDescription}</p>}
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Technologies: </span>
                  {project.technologies.join(", ")}
                </p>
              </div>
            </details>
          )}

          {/* Actions */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-2 mt-5">
              {project.liveUrl && (
                <Button href={project.liveUrl} external size="sm" icon={<ExternalLink size={14} />}>
                  Live Demo<span className="sr-only"> of {project.title} (opens in new tab)</span>
                </Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} external size="sm" variant="secondary" icon={<Github size={14} />}>
                  GitHub<span className="sr-only"> repository for {project.title} (opens in new tab)</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </GlassCard>
      </TiltCard>
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
          description="Products and websites I've built at Invictus Hub, at KFUEIT and as a freelancer — spanning HR tech, healthcare, lead generation and education."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {FILTERS.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
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
