import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14 lg:mb-16", align === "center" && "text-center", className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-px bg-blue-500/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-400">
            {eyebrow}
          </span>
          <div className="w-8 h-px bg-blue-500/60" />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed",
          align === "center" && "max-w-2xl mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
