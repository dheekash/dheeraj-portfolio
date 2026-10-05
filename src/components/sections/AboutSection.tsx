const specializations = [
  "Microsoft Fabric",
  "Power BI",
  "SQL",
  "Azure",
  "Python",
  "Databricks",
];

const industries = [
  "Manufacturing",
  "Sales Intelligence",
  "Risk & Fraud",
  "Retail & E-commerce",
  "Customer Analytics",
];

const coreMicrosoft = ["DP-600", "PL-300", "AZ-104", "DP-700", "DP-100"];

/**
 * About: the bio and the question that drives the work on the left, the
 * facts at a glance on the right.
 *
 * The right column used to be a constellation diagram that re-drew the
 * industries list as orbiting dots with six infinite SVG animations, beside
 * a card that listed the same industries again. Each fact now appears once,
 * in a definition list, which is what it is.
 */
export function AboutSection() {
  return (
    <section id="about">
      <div className="container-page section-pad">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-6">About me</h2>
            <div className="about-copy">
              <p>
                I build BI platforms, Lakehouse architectures, and analytics solutions for enterprise teams across 15 countries. My work spans Microsoft Fabric, Power BI, Databricks, Snowflake, dbt, Azure, and PySpark. I design semantic models, build data pipelines, and deliver reporting systems for finance, operations, sales, and executive teams.
              </p>
              <p>
                I value clear architecture, fast performance, and reliable data. Every solution starts with a business problem and ends with measurable results.
              </p>
              <p>One question drives every project.</p>
            </div>
            <blockquote className="about-quote">
              <p>&ldquo;Does this help people make better decisions?&rdquo;</p>
            </blockquote>
          </div>

          <dl className="about-facts lg:col-span-5">
            <div>
              <dt>Based in</dt>
              <dd>Bengaluru, India<span className="about-sub">IST (UTC+5:30)</span></dd>
            </div>
            <div>
              <dt>Core tools</dt>
              <dd translate="no">{specializations.join(", ")}</dd>
            </div>
            <div>
              <dt>Industries</dt>
              <dd>{industries.join(", ")}</dd>
            </div>
            <div>
              <dt>Microsoft certified</dt>
              <dd>
                <span className="about-figure">11&times;</span>
                <span className="about-sub" translate="no">{coreMicrosoft.join(", ")}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
