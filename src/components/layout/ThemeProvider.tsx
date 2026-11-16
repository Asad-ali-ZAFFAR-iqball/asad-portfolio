"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app in next-themes provider for dark/light mode support.
 * Dark on first visit (regardless of OS setting); next-themes saves the visitor's toggle choice in localStorage.
 * MotionConfig makes every framer-motion animation honour the OS "reduce motion" setting.
 * LazyMotion + m.* keeps the motion runtime small; domMax because the navbar and skills use layoutId.
 * strict: a stray full `motion.*` component throws in dev instead of silently re-bloating the bundle.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </NextThemesProvider>
  );
}
