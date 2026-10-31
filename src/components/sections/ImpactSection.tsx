import { Mark } from "@/components/common/Mark";
import { allCredentials } from "@/data/credentials";
import { layers } from "@/data/skills";
import { caseStudies, metaOf } from "@/data/work";
import { leadOf, ratioOf } from "@/lib/results";
import { ReportCanvas, type ReportStudy } from "@/components/sections/ReportCanvas";

/* Short slicer labels for the featured studies. */
const TAB: Record<string, string> = {
  "fabric-lakehouse-migration": "Fabric migration",
  "seller-analytics-platform": "Seller analytics",
  "manufacturing-analytics-suite": "Rockwool",
  "real-time-fraud-monitoring": "Fraud monitoring",
};

const technologies = new Set(layers.flatMap((l) => l.items)).size;

const kpis = [
  { value: "7+", label: "Years" },
  { value: String(allCredentials.length), label: "Certifications" },
  { value: String(technologies), label: "Technologies" },
  { value: String(caseStudies.length), label: "Projects" },
  { value: "15", label: "Markets" },
];

const studies: ReportStudy[] = caseStudies
  .filter((s) => s.featured)
  .slice(0, 4)
  .map((s) => {
    const [lead, ...more] = s.impact;
    return {
      slug: s.slug,
      tab: TAB[s.slug] ?? s.title,
      title: s.title,
      meta: metaOf(s),
      lead: { ...lead, ratio: ratioOf(lead.value) },
      more: more.slice(0, 2),
      mark: <Mark name={leadOf[s.slug]} size={18} />,
    };
  });

/** Impact & highlights: the headline numbers and results as a live report. */
export function ImpactSection() {
  return (
    <section id="impact" className="section sx" aria-labelledby="impact-title">
      <div className="container">
        <header className="sx-head reveal">
          <p className="sx-eyebrow">Impact</p>
          <h2 id="impact-title" className="sx-title">
            Impact &amp; highlights<span className="sx-dot">.</span>
          </h2>
          <p className="sx-intro">The numbers behind the work. Pick a project to see its measured result.</p>
        </header>
        <div className="reveal">
          <ReportCanvas kpis={kpis} studies={studies} />
        </div>
      </div>
    </section>
  );
}
