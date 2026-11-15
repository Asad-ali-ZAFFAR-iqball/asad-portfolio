"use client";

import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * Counts up to a numeric string the first time it scrolls into view.
 * Renders the real value first, so server HTML, crawlers and no-JS visitors never see "0".
 */
export function Counter({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const target = Number(value);
  const reduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || !Number.isFinite(target) || reduce) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, target, reduce, duration]);

  return <span ref={ref}>{shown}</span>;
}
