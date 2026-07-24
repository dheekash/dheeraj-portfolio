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

/**
 * Standard scroll-triggered entrance. Fires once, when 20% of the element
 * has entered the viewport.
 */
export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: REVEAL_Y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: DURATION.reveal, delay, ease: EASE },
  } as const;
}

/**
 * Above-the-fold entrance. Same shape as reveal() but plays on mount
 * instead of waiting for an intersection, so the hero never flashes empty.
 */
export function enter(delay = 0) {
  return {
    initial: { opacity: 0, y: REVEAL_Y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.reveal, delay, ease: EASE },
  } as const;
}

/** Stagger delay for the nth item in a group. */
export const stagger = (i: number, base = 0) => base + i * STAGGER;
