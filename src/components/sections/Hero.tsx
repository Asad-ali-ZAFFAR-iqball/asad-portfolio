"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Download, MapPin, CheckCircle2 } from "lucide-react";
import { personalInfo, stats } from "@/data";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { Button } from "@/components/ui/Button";

const TYPING_WORDS = [
  "Laravel Development",
  "Vue.js & React.js",
  "Full-Stack Engineering",
  "Inertia.js & Livewire",
  "REST API Design",
  "MySQL & PHP",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/asad-ali-full-stack-developer",
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/asad-ali",
    icon: <Github size={18} />,
    label: "GitHub",
  },
  {
    href: `mailto:${personalInfo.email}`,
    icon: <Mail size={18} />,
    label: "Email",
  },
];

export function Hero() {
  const { text: typedText } = useTypingEffect({ words: TYPING_WORDS, typingSpeed: 75 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20" />
        {/* Orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl"
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={14} className="text-emerald-500" />
              Open to New Opportunities
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 dark:text-white leading-none mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-brand-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                Asad Ali Zaffar
              </span>
              {/* Underline accent */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-brand-500 via-cyan-500 to-violet-500 origin-left"
              />
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-4">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              Full Stack Developer
            </p>
          </motion.div>

          {/* Typing effect */}
          <motion.div variants={itemVariants} className="mb-6 h-10 flex items-center">
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">
              Specializing in{" "}
              <span className="font-mono font-semibold text-brand-500 dark:text-brand-400">
                {typedText}
                <span className="inline-block w-0.5 h-5 ml-0.5 bg-brand-500 animate-pulse align-middle" />
              </span>
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-10"
          >
            <MapPin size={14} />
            {personalInfo.location}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
            >
              Get in Touch
            </Button>
            <Button
              href="/asad-ali-zaffar.pdf"
              external
              variant="secondary"
              size="lg"
              icon={<Download size={18} />}
              iconPosition="left"
              download="Asad-Ali-Zafar-CV.pdf"
            >
              Download CV
            </Button>
          </motion.div>

          {/* Socials */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-16">
            {SOCIAL_LINKS.map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-500/40 dark:hover:border-brand-500/40 bg-white/60 dark:bg-white/5 hover:bg-brand-50 dark:hover:bg-brand-500/5 transition-colors backdrop-blur-sm"
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center p-5 rounded-2xl border border-gray-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm"
              >
                <span className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
                  {stat.value}
                  <span className="text-brand-500">{stat.suffix}</span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
