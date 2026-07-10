"use client";

import { useEffect, useState } from "react";

/**
 * Typewriter cycle: types each word, holds, deletes, moves to the next.
 * Renders a blinking cyan caret (.tw-caret). Respects reduced motion by
 * showing the first word statically.
 */
export function TypeWriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const word = words[wordIdx % words.length];
    let delay: number;

    if (!deleting && text === word) {
      delay = 1800; // hold the full word
    } else if (deleting && text === "") {
      delay = 350;
    } else {
      delay = deleting ? 40 : 75;
    }

    const id = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, wordIdx, words, reduced]);

  const shown = reduced ? words[0] : text;

  return (
    <span className={className} aria-label={words.join(", ")}>
      <span aria-hidden>{shown}</span>
      {!reduced && <span className="tw-caret" aria-hidden />}
    </span>
  );
}
