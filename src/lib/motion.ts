import { useSyncExternalStore } from "react";

/**
 * Motion system — one language for the whole site.
 *
 * Durations sit inside Material Design 3's token bands (short 50-200ms,
 * medium 250-400ms, long 450-500ms). Anything past ~500ms reads as lag
 * rather than polish, which is why entrance reveals land at 420ms instead
 * of the 550-900ms this site used to run.
 *
 * A single easing curve is used everywhere: M3's "emphasized" decelerate
 * cubic-bezier(0.2, 0, 0, 1). Motion that starts fast and settles reads as
 * responsive; symmetric ease-in-out reads as sluggish.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in SiteChrome, which strips transform animations and keeps opacity. Do not
 * re-implement per-component reduced-motion branches on top of it.
 */

/** M3 emphasized easing. The only curve this site uses. */
export const EASE = [0.2, 0, 0, 1] as const;

/** CSS-side equivalent of EASE, for transition/animation declarations. */
export const EASE_CSS = "cubic-bezier(0.2, 0, 0, 1)";

export const DURATION = {
  /** Tactile press feedback. Must feel instant. */
  feedback: 0.12,
  /** Hover colour, border, icon nudge. */
  fast: 0.18,
  /** Hover elevation, small state changes. */
  base: 0.28,
  /** Scroll-reveal entrance. Top of M3's medium band. */
  reveal: 0.42,
  /** Count-up. Longer is justified: the number itself is the content. */
  counter: 1.2,
} as const;

/** Delay between siblings in a staggered group. */
export const STAGGER = 0.06;

/** Entrance travel distance. Short: the fade carries the reveal, not the slide. */
export const REVEAL_Y = 16;

/*
 * Section entrances are switched off by design. One orchestrated moment
 * (the hero results chart, pure CSS) lands harder than a fade-and-rise on
 * every section, which reads as a template. It is also more robust: content
 * no longer depends on JS hydrating before it becomes visible, which is how
 * the hero once rendered blank when a chunk failed to load.
 *
 * The helpers keep their signatures so call sites need no edits; they now
 * return no animation props. Motion that answers a user action (dialogs,
 * the contact form's states) and the scroll-scrubbed pipeline diagram are
 * unaffected — those show something changing.
 */
export function reveal(_delay = 0) {
  return {} as const;
}

export function enter(_delay = 0) {
  return {} as const;
}

/** Stagger delay for the nth item in a group. */
export const stagger = (i: number, base = 0) => base + i * STAGGER;

/**
 * SSR-safe media query subscription. Server snapshot is `false`, so the
 * first client paint matches the server and nothing flashes.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * Sequenced group reveal.
 *
 * Use when the order of arrival carries meaning — a case study reading
 * outcome, then name, then method, then stack — rather than as decoration.
 * A block that has no narrative order should use reveal() and arrive at once.
 *
 * Spread `staggerParent` on the container and `staggerItem` on each child.
 * Nest `staggerGroup()` on a child that is itself a container to continue
 * the sequence one level down.
 */
export const staggerParent = {} as const;

export const staggerGroup = (_delay = STAGGER) => ({} as const);

export const staggerItem = {} as const;
