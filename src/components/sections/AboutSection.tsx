import Image from "next/image";
import { Network, Users, Workflow } from "lucide-react";

/* Figures from the current role in the experience section. Years of
   experience are shown once, in the hero. */
const stats = [
  { Icon: Network, value: "12", label: "Semantic models built" },
  { Icon: Workflow, value: "8", label: "Fabric pipelines deployed" },
  { Icon: Users, value: "42", label: "Stakeholders engaged" },
];

export function AboutSection() {
  return (
    <section id="about" className="section sx" aria-labelledby="about-title">
      <div className="container">
        <header className="sx-head reveal">
          <p className="sx-eyebrow">Introduction</p>
          <h2 id="about-title" className="sx-title">
            About Me<span className="sx-dot">.</span>
          </h2>
        </header>

        <div className="sx-about reveal">
          <div className="sx-about-copy">
            <p>
              I&rsquo;m a BI &amp; Analytics Engineer focused on enterprise reporting, semantic
              modelling and modern data platforms. My work sits between business requirements, data
              engineering and decision-making: I design semantic models, build data pipelines and
              deliver reporting systems for finance, operations, sales and executive teams.
            </p>
            <p>
              In 7+ years I&rsquo;ve moved from support-floor reporting, to risk and fraud analytics
              at Amazon, to Fabric lakehouse platforms for clients across 15 countries.
              One question drives every project: <strong>&ldquo;Does this help people make better
              decisions?&rdquo;</strong>
            </p>
            <p className="small">
              Outside the data world, you&rsquo;ll usually find me lifting, watching football,
              exploring anime and movies, or looking for good food.
            </p>
          </div>

          <div className="sx-about-side">
            {/* Mercury: the portrait lives here instead of the (centred) hero */}
            <div className="sx-portrait">
              <Image src="/images/portrait.webp" alt="Dheeraj Kashyap" width={1000} height={1340} sizes="(min-width: 1000px) 360px, 80vw" />
            </div>
          <dl className="sx-stats">
            {stats.map(({ Icon, value, label }) => (
              <div key={label} className="sx-stat">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <Icon size={18} strokeWidth={1.9} aria-hidden className="sx-stat-icon" />
                  <span className="sx-stat-value">{value}</span>
                  <span className="sx-stat-label" aria-hidden>{label}</span>
                </dd>
              </div>
            ))}
          </dl>
          </div>
        </div>

      </div>
    </section>
  );
}
