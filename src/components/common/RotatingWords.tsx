/**
 * Words that roll upward one after another inside a clipped line (after a
 * Uiverse.io loader by kennyotsu). The first word is repeated at the end so
 * the loop restarts without a jump. Screen readers get the plain list once;
 * under reduced motion the first word simply stays.
 */
/* `suffix` (such as a full stop) is set inside each word so it sits right after it. */
export function RotatingWords({ words, suffix = "", className = "" }: { words: string[]; suffix?: string; className?: string }) {
  const list = [...words, words[0]];
  return (
    <span className={`rw ${className}`.trim()} style={{ "--rw-n": words.length } as React.CSSProperties}>
      <span className="sr-only">{words.slice(0, -1).join(", ")} and {words[words.length - 1]}{suffix}</span>
      <span className="rw-window" aria-hidden>
        {list.map((w, i) => (
          <span key={i} className="rw-word">{w}<span className="rw-suffix">{suffix}</span></span>
        ))}
      </span>
    </span>
  );
}
