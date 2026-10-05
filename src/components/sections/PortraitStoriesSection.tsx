import { Layers, Gauge, Workflow, LineChart, type LucideIcon } from "lucide-react";


const features: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Layers,
    title: "Lakehouse Architecture",
    body: "Medallion-layered Lakehouses on Microsoft Fabric and Databricks: one governed source of truth instead of a dozen disconnected reports.",
  },
  {
    Icon: Gauge,
    title: "Semantic Modeling",
    body: "Power BI datasets built for speed and trust: DAX measures, star schemas, and Direct Lake models that hold up under real usage.",
  },
  {
    Icon: Workflow,
    title: "Reliable Pipelines",
    body: "SQLMesh and dbt with automated quality gates, so schema drift and pipeline failures get caught before they reach a dashboard.",
  },
  {
    Icon: LineChart,
    title: "Executive-Ready Insights",
    body: "Reporting systems built for the people making the call: finance, operations, and leadership teams who need answers, not raw tables.",
  },
];

/**
 * Four disciplines as ruled entries. The WebGL dot field that sat behind
 * this section is gone: it was decoration, and it was the single most
 * expensive thing on the page to render on a phone.
 */
export function PortraitStoriesSection() {
  return (
    <section>
      <div className="container-page section-pad">
        <div className="max-w-[46rem] mb-[clamp(2rem,3vw,3rem)]">
          <p className="eyebrow mb-3">How I work</p>
          <h2 className="mb-4">Every dataset has a story worth telling.</h2>
          <p className="text-[1.0625rem] leading-relaxed text-muted-foreground max-w-[52ch]">
            From messy source systems to boardroom-ready dashboards, four disciplines I lean on for every engagement.
          </p>
        </div>

        {/* Ruled entries, not cards: the case studies already use cards, and
            a second card grid would make the page read as one template. */}
        <ul className="discipline-list">
          {features.map(({ title, body }) => (
            <li key={title}>
              <h3 className="discipline-title">{title}</h3>
              <p className="discipline-body">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
