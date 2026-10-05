import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/* The photo renders once a file exists at public/images/avatar.jpg, so the
   layout never shows a broken image or a placeholder face. */
const PHOTO = "/images/avatar.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

export function AboutSection() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="about-title" className="section-title">About</h2>
        </header>

        <div className="about-grid">
          <div className="about-copy reveal">
            <span className="label">Professional</span>
            <p className="about-first">
              BI &amp; Analytics Engineer focused on enterprise reporting, semantic modelling and
              modern data platforms.
            </p>
            <p>
              My work sits between business requirements, data engineering and decision-making. I
              design semantic models, build data pipelines and deliver reporting systems for
              finance, operations, sales and executive teams, and I value clear architecture, fast
              performance and reliable data.
            </p>
            <blockquote className="about-quote">
              <p>
                One question drives every project: <strong>&ldquo;Does this help people make better
                decisions?&rdquo;</strong>
              </p>
            </blockquote>

            <span className="label about-outside">Outside work</span>
            <p>
              Outside the data world, you&rsquo;ll usually find me lifting, watching football,
              exploring anime and movies, or looking for good food.
            </p>
          </div>

          <div className="reveal">
            {hasPhoto && (
              <Image
                src={PHOTO}
                alt="Dheeraj Kashyap"
                width={640}
                height={800}
                sizes="320px"
                className="about-photo"
              />
            )}
            <dl className="facts">
              <div>
                <dt className="label">Based in</dt>
                <dd>
                  Bengaluru, India
                  <span className="small">IST (UTC+5:30), working with teams worldwide</span>
                </dd>
              </div>
              <div>
                <dt className="label">Focus</dt>
                <dd>Semantic models, lakehouse architecture, reliable pipelines and executive reporting</dd>
              </div>
              <div>
                <dt className="label">Core tools</dt>
                <dd translate="no">Power BI, Microsoft Fabric, SQL, Azure, Python, Databricks, Snowflake</dd>
              </div>
              <div>
                <dt className="label">Industries</dt>
                <dd>Manufacturing, sales intelligence, risk &amp; fraud, retail &amp; e-commerce, customer analytics</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
