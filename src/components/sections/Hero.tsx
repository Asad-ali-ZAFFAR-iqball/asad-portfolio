"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { m, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { ArrowRight, Github, Linkedin, Mail, MapPin, CheckCircle2, Sparkles, Pause, Play } from "lucide-react";
import { personalInfo, stats } from "@/data";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";

// three.js is ~150 KB gzipped: load it only on the client, after first paint.
// If the chunk fails to load (slow dev compile, flaky network) fall back to the CSS orbs instead of crashing the hero.
const HeroScene = dynamic(
  () => import("./HeroScene").catch(() => function NoScene() { return null; }),
  { ssr: false }
);

const TYPING_WORDS = [
  "Laravel & PHP",
  "Vue.js & React.js",
  "TypeScript & Inertia.js",
  "Queues, Horizon & Redis",
  "REST API Design",
  "Docker & CI/CD",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

// Slide only, never fade: the hero text must be visible in the server HTML (it is the LCP element).
const itemVariants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const SOCIAL_LINKS = [
  {
    href: personalInfo.socials.find((s) => s.platform === "LinkedIn")!.url,
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
  },
  {
    href: personalInfo.socials.find((s) => s.platform === "GitHub")!.url,
    icon: <Github size={18} />,
    label: "GitHub",
  },
  {
    href: `mailto:${personalInfo.email}`,
    icon: <Mail size={18} />,
    label: "Email",
  },
];

/** Typing line in its own component so its 75 ms ticks re-render only this, not the whole hero. */
function TypedText({ inView, reduceMotion }: { inView: boolean; reduceMotion: boolean }) {
  const [paused, setPaused] = useState(false);
  const { text } = useTypingEffect({ words: TYPING_WORDS, typingSpeed: 75, enabled: inView && !paused && !reduceMotion });

  return (
    <div className="mb-6 h-10 flex items-center gap-2">
      <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">
        Specializing in{" "}
        {/* Screen readers get the full list once instead of half-typed words */}
        <span className="sr-only">{TYPING_WORDS.join(", ")}</span>
        <span aria-hidden className="font-mono font-semibold text-brand-500 dark:text-brand-400">
          {reduceMotion ? TYPING_WORDS[0] : text}
          {!reduceMotion && <span className="inline-block w-0.5 h-5 ml-0.5 bg-brand-500 animate-pulse align-middle" />}
        </span>
      </p>
      {!reduceMotion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play typing animation" : "Pause typing animation"}
          aria-pressed={paused}
          className="p-1.5 rounded-full text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px) and (pointer: fine)");
  const show3D = mounted && isDesktop && !reduceMotion;
  const { ref: heroRef, inView } = useInView({ threshold: 0 });
  const { resolvedTheme } = useTheme();

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-24"
      aria-label="Hero section"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 3D scene (desktop, motion allowed); the CSS orbs below are the fallback everywhere else */}
        {show3D && (
          <div className="absolute inset-0">
            <HeroScene active={inView} dark={resolvedTheme !== "light"} />
          </div>
        )}
        {/* Orbs */}
        <m.div
          animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl"
        />
        <m.div
          animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl"
        />
        <m.div
          animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          // Centre via motion x/y: an animated scale overwrites Tailwind's translate classes and the orb jumps (CLS)
          style={{ x: "-50%", y: "-50%" }}
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl"
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--brand-500)/0.03)_1px,transparent_1px),linear-gradient(to_right,rgb(var(--brand-500)/0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <m.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="glass-panel mx-auto max-w-5xl rounded-[2rem] px-5 py-12 sm:px-12 sm:py-16 flex flex-col items-center text-center"
        >
          {/* Status badge */}
          <m.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={14} className="text-emerald-500" />
              Open to New Opportunities
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
            </span>
          </m.div>

          {/* Name */}
          {/* xl:min-h-[2em]: at xl the name always wraps in Inter but fits one line in the fallback font,
              so reserve both lines up front or the font swap shifts the whole hero down (CLS) */}
          <m.h1
            variants={itemVariants}
            className="xl:min-h-[2em] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 dark:text-white leading-none mb-4"
          >
            Hi, I&apos;m{" "}
            {/* text-decoration follows the name onto a second line; an absolute bar did not */}
            <span className="text-brand-500 underline decoration-brand-500 decoration-[0.06em] underline-offset-[0.14em] [text-decoration-skip-ink:none]">
              {personalInfo.name}
            </span>
          </m.h1>

          {/* Title */}
          <m.div variants={itemVariants} className="mb-4">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              {personalInfo.title}
            </p>
          </m.div>

          {/* Typing effect */}
          <m.div variants={itemVariants}>
            <TypedText inView={inView} reduceMotion={!!reduceMotion} />
          </m.div>

          {/* Tagline */}
          <m.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
          >
            {personalInfo.tagline}
          </m.p>

          {/* Location */}
          <m.div
            variants={itemVariants}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-10"
          >
            <MapPin size={14} />
            {personalInfo.location}
          </m.div>

          {/* CTAs */}
          <m.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
              className="bg-gradient-to-r from-brand-600 via-brand-500 to-violet-600 border-transparent"
            >
              Explore My Work
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              icon={<Sparkles size={18} />}
              iconPosition="left"
              className="glass-panel glass-glow dark:bg-white/[0.06]"
            >
              Let&apos;s Connect
            </Button>
          </m.div>

          {/* Socials */}
          <m.div variants={itemVariants} className="flex items-center gap-3 mb-16">
            {SOCIAL_LINKS.map(({ href, icon, label }) => (
              <m.a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={href.startsWith("mailto:") ? label : `${label} (opens in new tab)`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-500/40 dark:hover:border-brand-500/40 bg-white/60 dark:bg-white/5 hover:bg-brand-50 dark:hover:bg-brand-500/5 transition-colors backdrop-blur-sm"
              >
                {icon}
              </m.a>
            ))}
          </m.div>

          {/* Stats */}
          <m.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl"
          >
            {stats.map((stat, i) => (
              <m.div
                key={stat.label}
                initial={reduceMotion ? false : { y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                className="glass-panel glass-glow flex flex-col items-center p-5 rounded-2xl"
              >
                <span className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
                  <Counter value={stat.value} />
                  <span className="text-brand-500">{stat.suffix}</span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 leading-tight">
                  {stat.label}
                </span>
              </m.div>
            ))}
          </m.div>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <m.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">
          Scroll
        </span>
        <m.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
        </m.div>
      </m.div>
    </section>
  );
}
