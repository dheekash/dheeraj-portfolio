"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Reads the reduced-motion preference without a setState-in-effect cascade,
 * and stays correct if the user changes the setting mid-session. The server
 * snapshot is `false` so SSR and first client paint agree.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

/**
 * Typewriter cycle: types each word, holds, deletes, moves to the next.
 * Under reduced motion the first word is shown statically.
 *
 * Accessibility: the animated text is decorative presentation of a fixed
 * list, so the visible span is aria-hidden and the full list is exposed once
 * to assistive tech via visually-hidden text. (An aria-label on the wrapper
 * span was invalid — aria-label is prohibited on a span with no role, and
 * axe flags it.) No live region: the value is not new information arriving,
 * it is the same four words looping.
 */
export function TypeWriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = usePrefersReducedMotion();

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
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span className={className} aria-hidden>
        {shown}
        {!reduced && <span className="tw-caret" />}
      </span>
    </>
  );
}
