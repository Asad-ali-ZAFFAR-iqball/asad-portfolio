"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence, useScroll } from "framer-motion";
import { Moon, Sun, Menu, X, Code2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn, withBasePath } from "@/lib/utils";
import { personalInfo } from "@/data";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

// hero and references have no link but must be observed, or the previous link stays highlighted over them.
const SECTION_IDS = ["hero", ...NAV_LINKS.map((l) => l.href.slice(1)), "references"];
// Absolute to the home page so the links also work from the 404 page.
const HOME = withBasePath("/");

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  // Motion value drives the bar directly: no React re-render per scroll event.
  const { scrollYProgress } = useScroll();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Prevent body scroll when mobile menu open; Escape closes it and returns focus to the toggle
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return () => { document.body.style.overflow = ""; };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const apply = () => {
      // next-themes sets the class in an effect; set it now so the view transition snapshots the new theme
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
    };
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) apply();
    else document.startViewTransition(apply);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <m.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-brand-600 via-gray-500 to-brand-600 dark:via-brand-200"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-4">
        <nav
          aria-label="Main"
          className={cn(
            "glass-panel max-w-6xl mx-auto h-14 sm:h-16 pl-3 pr-2 sm:pl-5 sm:pr-3 flex items-center justify-between rounded-full transition-colors duration-300",
            isScrolled && "bg-white/75 dark:bg-[#101422]/70"
          )}
        >
          {/* Logo */}
          <m.a
            href={`${HOME}#hero`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white"
            aria-label="Home"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-on-brand">
              <Code2 size={16} strokeWidth={2.5} />
            </span>
            <span className="hidden sm:inline">
              <span className="text-brand-500">Asad</span>
              <span className="text-gray-900 dark:text-white">.dev</span>
            </span>
          </m.a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={HOME + href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium rounded-full transition-colors duration-150",
                      isActive
                        ? "text-brand-500 dark:text-brand-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    )}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full bg-brand-500/10 border border-brand-400/30 shadow-[0_0_18px_-2px_rgb(var(--brand-500)/0.45)]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <m.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleTheme}
                aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </m.button>
            )}

            {/* Resume CTA */}
            <m.a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full bg-brand-600 hover:bg-brand-500 text-on-brand transition-colors shadow-sm hover:shadow-glow"
            >
              Resume
              <span className="sr-only">(opens in new tab)</span>
            </m.a>

            {/* Mobile menu toggle */}
            <m.button
              ref={menuButtonRef}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((p) => !p)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </m.button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <m.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              id="mobile-menu"
              className="glass-panel lg:hidden overflow-hidden mt-2 max-w-6xl mx-auto rounded-3xl bg-white/90 dark:bg-[#101422]/90"
            >
              <nav aria-label="Mobile">
              <ul className="flex flex-col px-4 py-4 gap-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={HOME + href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-200 dark:border-white/10 mt-2">
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-brand-600 text-on-brand hover:bg-brand-500 transition-colors"
                  >
                    Download Resume
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </li>
              </ul>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
