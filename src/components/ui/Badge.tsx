import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "glow";
  size?: "sm" | "md";
  className?: string;
}

/**
 * A versatile badge / pill component for tags and labels.
 */
export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border transition-colors",
        {
          "bg-gray-100 text-gray-700 border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10":
            variant === "default",
          "bg-transparent text-brand-500 border-brand-500/40 dark:text-brand-400 dark:border-brand-400/40":
            variant === "outline",
          "bg-transparent text-gray-500 border-transparent dark:text-gray-400":
            variant === "ghost",
          "bg-brand-500/10 text-brand-400 border-brand-500/20 shadow-glow":
            variant === "glow",
          "text-xs px-2.5 py-0.5": size === "sm",
          "text-sm px-3 py-1": size === "md",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
