"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  external?: boolean;
  download?: string;
}

/**
 * Premium button with micro-interaction hover effects.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "right",
      className,
      disabled,
      href,
      external,
      download,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-brand-600 hover:bg-brand-500 text-white shadow-md hover:shadow-glow border border-brand-700 hover:border-brand-500",
      secondary:
        "bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/15 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 shadow-sm",
      ghost:
        "bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 border border-transparent",
      outline:
        "bg-transparent border border-brand-500/50 hover:border-brand-500 text-brand-500 dark:text-brand-400 hover:bg-brand-500/5",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "text-sm px-4 py-2 h-9",
      md: "text-sm px-5 py-2.5 h-11",
      lg: "text-base px-7 py-3.5 h-13",
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    const content = (
      <>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </span>
        )}
        {icon && iconPosition === "left" && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span className={isLoading ? "opacity-0" : undefined}>{children}</span>
        {icon && iconPosition === "right" && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          download={download}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={classes}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={classes}
        disabled={disabled || isLoading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
