import { Building2, CalendarClock, MapPin, Network, Target, Users, Workflow, Wrench } from "lucide-react";

/* Figures from the experience section: years since Mar 2019, and the
   current role's models, pipelines and stakeholders. */
const stats = [
  { Icon: CalendarClock, value: "7+", label: "Years in BI & analytics" },
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
              Over 7+ years I&rsquo;ve moved from support-floor reporting, to risk and fraud analytics
              at Amazon, to Fabric lakehouse platforms for clients across 15 countries.
              One question drives every project: <strong>&ldquo;Does this help people make better
              decisions?&rdquo;</strong>
            </p>
            <p className="small">
              Outside the data world, you&rsquo;ll usually find me lifting, watching football,
              exploring anime and movies, or looking for good food.
            </p>
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

        <dl className="sx-facts reveal">
          <div><dt><MapPin size={14} aria-hidden /> Based in</dt><dd>Bengaluru, India · IST (UTC+5:30)</dd></div>
          <div><dt><Target size={14} aria-hidden /> Focus</dt><dd>Semantic models, lakehouses, pipelines, executive reporting</dd></div>
          <div><dt><Wrench size={14} aria-hidden /> Core tools</dt><dd translate="no">Power BI, Fabric, SQL, Azure, Python, Databricks, Snowflake</dd></div>
          <div><dt><Building2 size={14} aria-hidden /> Industries</dt><dd>Manufacturing, sales, risk &amp; fraud, retail, customer analytics</dd></div>
        </dl>
      </div>
    </section>
  );
}
