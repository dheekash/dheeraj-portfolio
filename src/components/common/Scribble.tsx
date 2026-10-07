/**
 * A hand-drawn underline under one word. The stroke draws in once, when
 * its section is revealed; it is static under reduced motion.
 */
export function Scribble({ children }: { children: React.ReactNode }) {
  return (
    <span className="scribble">
      {children}
      <svg className="scribble-line" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden focusable="false">
        <path d="M3 14c22-6 48-9 76-8 26 1 46 4 70 2 18-1 32-4 48-8" pathLength={1} />
        <path d="M30 17c34-4 70-5 108-3" pathLength={1} />
      </svg>
    </span>
  );
}
