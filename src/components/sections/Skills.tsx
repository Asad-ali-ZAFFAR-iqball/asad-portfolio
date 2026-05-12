"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { skillCategories } from "@/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn, getSkillLevelColor } from "@/lib/utils";
import type { SkillCategory } from "@/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  monitor: <Monitor size={20} />,
  server: <Server size={20} />,
  database: <Database size={20} />,
  cloud: <Cloud size={20} />,
  zap: <Zap size={20} />,
  "shield-check": <ShieldCheck size={20} />,
};

function SkillBar({
  name,
  proficiency,
  level,
  delay = 0,
}: {
  name: string;
  proficiency: number;
  level: string;
  delay?: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {name}
        </span>
        <span className={cn("text-xs font-semibold", getSkillLevelColor(level))}>
          {level}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500"
        />
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  isActive,
  onClick,
}: {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-2xl border transition-all duration-200",
        isActive
          ? "border-brand-500/50 bg-brand-500/5 dark:bg-brand-500/10 shadow-glow"
          : "border-gray-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] hover:border-brand-500/30"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "p-2 rounded-xl text-white bg-gradient-to-br",
            category.color
          )}
        >
          {ICON_MAP[category.icon] ?? <Monitor size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
            {category.category}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {category.skills.length} technologies
          </p>
        </div>
        {isActive && (
          <motion.div
            layoutId="active-dot"
            className="w-2 h-2 rounded-full bg-brand-500"
          />
        )}
      </div>
    </motion.button>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>(
    skillCategories[0].id
  );

  const currentCategory = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Skills section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-gray-950 to-gray-50/30 dark:to-gray-900/30" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 bottom-0 w-[600px] h-[400px] rounded-full bg-brand-500/10 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Technical Skills"
          title="The toolkit behind the craft."
          description="Proficiency built through years of real-world production systems, not just side projects."
        />

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Category selector */}
          <div className="flex flex-col gap-3">
            {skillCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>

          {/* Skills panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="p-8">
                {/* Panel header */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className={cn(
                      "p-2.5 rounded-xl text-white bg-gradient-to-br",
                      currentCategory.color
                    )}
                  >
                    {ICON_MAP[currentCategory.icon] ?? <Monitor size={22} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {currentCategory.category}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {currentCategory.skills.length} core technologies
                    </p>
                  </div>
                </div>

                {/* Skill bars */}
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  {currentCategory.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      proficiency={skill.proficiency}
                      level={skill.level}
                      delay={i * 0.05}
                    />
                  ))}
                </div>

                {/* Level legend */}
                <div className="mt-8 pt-6 border-t border-gray-200/80 dark:border-white/[0.06] flex flex-wrap gap-4">
                  {(["Expert", "Advanced", "Proficient", "Familiar"] as const).map(
                    (level) => (
                      <div key={level} className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            getSkillLevelColor(level)
                          )}
                        >
                          ●
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {level}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating tech badges — decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 flex flex-wrap gap-2.5 justify-center"
        >
          {[
            "Node.js", "React", "TypeScript", "Python", "PostgreSQL", "Redis",
            "Kafka", "Docker", "Kubernetes", "AWS", "GraphQL", "Next.js",
            "Django", "Terraform", "Go", "Elasticsearch",
          ].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.04 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1.5 text-xs font-mono font-medium rounded-full border border-gray-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.03] text-gray-600 dark:text-gray-400 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
