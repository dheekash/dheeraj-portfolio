/**
 * A result figure such as "12% → <1%". Manrope draws "<" and ">" as small
 * chevrons that read as "‹1%", so those two characters are set in Inter.
 */
export function Figure({ value }: { value: string }) {
  if (!/[<>]/.test(value)) return <>{value}</>;
  return (
    <>
      {value.split(/([<>])/).map((part, i) =>
        part === "<" || part === ">" ? <span key={i} className="fig-sym">{part}</span> : part,
      )}
    </>
  );
}
