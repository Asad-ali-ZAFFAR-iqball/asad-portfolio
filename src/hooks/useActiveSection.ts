"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Observes multiple sections and returns the id of the one currently in view.
 * Uses IntersectionObserver for performance.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sectionIds]);

  return activeSection;
}
