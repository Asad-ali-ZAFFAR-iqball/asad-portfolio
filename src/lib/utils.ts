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
export function calculateDuration(start: string, end: string | "Present"): string {
  const startDate = new Date(start);
  const endDate = end === "Present" ? new Date() : new Date(end);

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${remainingMonths} mo`;
}

/**
 * Truncates text to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Generates a slug from a string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
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

/**
 * Delays execution for a specified duration.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
