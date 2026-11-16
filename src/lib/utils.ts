import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes intelligently, resolving conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date range string for display.
 */
export function formatDateRange(start: string, end: string | "Present"): string {
  return `${start} – ${end}`;
}

/**
 * Calculates duration in years/months between two date strings.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Dec 2023" → months since year 0. Parsed by hand: new Date("Dec 2023") is engine-dependent. */
function monthIndex(value: string): number {
  const [mon, year] = value.trim().split(/\s+/);
  const m = MONTHS.indexOf(mon.slice(0, 3));
  if (m < 0 || !Number.isFinite(Number(year))) throw new Error(`Bad date "${value}", expected "Mon YYYY"`);
  return Number(year) * 12 + m;
}

export function calculateDuration(start: string, end: string | "Present", now: Date = new Date()): string {
  const endMonths = end === "Present" ? now.getFullYear() * 12 + now.getMonth() : monthIndex(end);
  const months = endMonths - monthIndex(start);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${remainingMonths} mo`;
}

/**
 * Maps a skill level string to a display-friendly color class.
 */
export function getSkillLevelColor(level: string): string {
  const map: Record<string, string> = {
    Expert: "text-emerald-500",
    Advanced: "text-blue-500",
    Proficient: "text-violet-500",
    Familiar: "text-amber-500",
  };
  return map[level] ?? "text-gray-500";
}

/**
 * Maps a project status to badge color classes.
 */
export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    Live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "In Development": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Archived: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    "Open Source": "bg-violet-500/10 text-violet-500 border-violet-500/20",
  };
  return map[status] ?? "bg-gray-500/10 text-gray-400 border-gray-500/20";
}

/** Canonical public URL (no trailing slash). Netlify is primary; the GitHub Pages copy points its canonical here too. */
export const SITE_URL = "https://asad-ali-zaffar-portfolio.netlify.app";

/** Prefixes a /public path with the basePath — plain <a>/<img> paths don't get it automatically. */
export const withBasePath = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
