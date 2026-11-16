"use client";

import { useState, useEffect } from "react";

interface UseTypingEffectOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  /** false freezes the text where it is (paused, off screen or reduced motion) */
  enabled?: boolean;
}

/**
 * Produces a typing + deleting animation cycling through a list of words.
 * Starts on the first word, fully typed, so server-rendered HTML already shows real text.
 */
export function useTypingEffect({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetween = 1800,
  enabled = true,
}: UseTypingEffectOptions): { text: string; isDeleting: boolean } {
  const [text, setText] = useState(words[0] ?? "");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (!words.length || !enabled) return;

    const currentWord = words[wordIndex % words.length];

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delayBetween);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentWord.slice(0, text.length + 1);
          setText(next);
          if (next === currentWord) setIsPaused(true);
        } else {
          const next = currentWord.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setIsDeleting(false);
            setWordIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, delayBetween, enabled]);

  return { text, isDeleting };
}
