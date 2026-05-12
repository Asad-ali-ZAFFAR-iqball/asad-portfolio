"use client";

import { useState, useEffect } from "react";

interface UseTypingEffectOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

/**
 * Produces a typing + deleting animation cycling through a list of words.
 */
export function useTypingEffect({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetween = 1800,
}: UseTypingEffectOptions): { text: string; isDeleting: boolean } {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!words.length) return;

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
  }, [text, wordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, delayBetween]);

  return { text, isDeleting };
}
