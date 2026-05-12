"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Code2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const scrollProgress = useScrollProgress();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-brand-500 via-cyan-400 to-violet-500"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/[0.06] shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white"
            aria-label="Home"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white">
              <Code2 size={16} strokeWidth={2.5} />
            </span>
            <span className="hidden sm:inline">
              <span className="text-brand-500">Asad</span>
              <span className="text-gray-900 dark:text-white">.dev</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                      isActive
                        ? "text-brand-500 dark:text-brand-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-brand-500/10 dark:bg-brand-500/10"
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
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            )}

            {/* Resume CTA */}
            <motion.a
              href="/resume-asad-ali-zaffar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-sm hover:shadow-glow"
            >
              Resume
            </motion.a>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/[0.06]"
            >
              <ul className="flex flex-col px-4 py-4 gap-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-200 dark:border-white/10 mt-2">
                  <a
                    href="/resume-asad-ali-zaffar.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-colors"
                  >
                    Download Resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
