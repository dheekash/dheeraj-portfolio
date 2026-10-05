import fs from "node:fs";
import path from "node:path";
import {
  siApachekafka,
  siApachespark,
  siDatabricks,
  siGit,
  siGithub,
  siMlflow,
  siPython,
  siScikitlearn,
  siSnowflake,
  type SimpleIcon,
} from "simple-icons";
import { Blend, ChartColumnBig, Cloud, Database, Sigma, Workflow, type LucideIcon } from "lucide-react";

/**
 * One logo language for the whole site: every mark is drawn in a single
 * colour (currentColor), sized to the text beside it, and turns sage on
 * hover via CSS. Brand colours are never used.
 *
 * Resolution order for a name:
 *   1. A file you add at public/logos/<slug>.svg (or .png). It is applied
 *      as a mask, so any official logo file is recoloured to match.
 *   2. The brand mark from simple-icons, where the brand allows it.
 *   3. A neutral icon for products whose marks are not freely available
 *      (Microsoft removed theirs from simple-icons). These are generic
 *      symbols, not imitations of the product logos.
 *   4. Nothing: the label stands alone.
 *
 * Server-only (reads the filesystem at build time).
 */

const brand: Record<string, SimpleIcon> = {
  snowflake: siSnowflake,
  databricks: siDatabricks,
  python: siPython,
  pyspark: siApachespark,
  "apache-spark": siApachespark,
  "apache-kafka": siApachekafka,
  kafka: siApachekafka,
  git: siGit,
  github: siGithub,
  mlflow: siMlflow,
  "scikit-learn": siScikitlearn,
};

const neutral: Record<string, LucideIcon> = {
  "power-bi": ChartColumnBig,
  "microsoft-fabric": Blend,
  fabric: Blend,
  azure: Cloud,
  sql: Database,
  dax: Sigma,
  "azure-data-factory": Workflow,
  adf: Workflow,
};

export const slugOf = (name: string) =>
  name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function fileFor(slug: string): string | null {
  for (const ext of ["svg", "png"]) {
    const rel = `/logos/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export function hasMark(name: string) {
  const slug = slugOf(name);
  return Boolean(fileFor(slug) || brand[slug] || neutral[slug]);
}

export function Mark({ name, size = 16, className = "" }: { name: string; size?: number; className?: string }) {
  const slug = slugOf(name);
  const file = fileFor(slug);
  const cls = `mark ${className}`.trim();

  if (file) {
    return (
      <span
        aria-hidden
        className={cls}
        style={{
          width: size,
          height: size,
          WebkitMaskImage: `url(${file})`,
          maskImage: `url(${file})`,
        }}
      />
    );
  }
  const si = brand[slug];
  if (si) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} className={cls} fill="currentColor">
        <path d={si.path} />
      </svg>
    );
  }
  const Icon = neutral[slug];
  if (Icon) return <Icon aria-hidden size={size} strokeWidth={1.75} className={cls} />;
  return null;
}

/** Company logo for the experience timeline, only when a file was added. */
export function companyLogo(company: string): string | null {
  for (const ext of ["svg", "png"]) {
    const rel = `/logos/companies/${slugOf(company)}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
