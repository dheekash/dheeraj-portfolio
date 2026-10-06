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
 * Logos across the site, always shown next to the product name.
 *
 * Resolution order for a name:
 *   1. An official file at public/logos/<slug>.svg (or .png), shown as-is.
 *      Power BI, Fabric, Azure and Data Factory come from Microsoft's
 *      official icon sets (Fabric icons, Azure architecture icons).
 *   2. The brand mark from simple-icons, in its brand colour.
 *   3. A neutral icon in the site accent, for items with no official mark.
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
    /* Official files are shown unaltered, in their original colours, as
       Microsoft's icon terms require; every call site labels them. */
    return (
      // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG
      <img src={file} alt="" aria-hidden width={size} height={size} className={`${cls} mark-file`} />
    );
  }
  const si = brand[slug];
  if (si) {
    /* Brand colour, except near-black marks (GitHub, Kafka), which follow
       the text colour so they stay visible on dark backgrounds. */
    const sum = [0, 2, 4].reduce((t, i) => t + parseInt(si.hex.slice(i, i + 2), 16), 0);
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={`${cls} mark-brand`}
        fill={sum < 160 ? "currentColor" : `#${si.hex}`}
      >
        <path d={si.path} />
      </svg>
    );
  }
  const Icon = neutral[slug];
  if (Icon) return <Icon aria-hidden size={size} strokeWidth={1.9} className={`${cls} mark-neutral`} />;
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
