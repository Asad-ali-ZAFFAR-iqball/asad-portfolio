import { Github, Linkedin, Mail, Code2, ArrowUp } from "lucide-react";
import { personalInfo } from "@/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-200/50 dark:border-white/[0.06] bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-600 text-white">
              <Code2 size={14} strokeWidth={2.5} />
            </span>
            <span>
              <span className="text-brand-500">Asad</span>.dev
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              {
                href: "https://www.linkedin.com/in/asad-ali-zaffar",
                icon: <Linkedin size={18} />,
                label: "LinkedIn",
              },
              {
                href: "https://github.com/asad-ali-zaffar",
                icon: <Github size={18} />,
                label: "GitHub",
              },
              {
                href: `mailto:${personalInfo.email}`,
                icon: <Mail size={18} />,
                label: "Email",
              },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {year} {personalInfo.name}. Built with Next.js & ❤️
          </p>
        </div>
      </div>

      {/* Back to top */}
      <a
        href="#hero"
        aria-label="Back to top"
        className="absolute right-6 -top-5 flex items-center justify-center w-10 h-10 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition-colors"
      >
        <ArrowUp size={18} />
      </a>
    </footer>
  );
}
