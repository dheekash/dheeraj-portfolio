"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Slide data ─────────────────────────────────────── */
const slides = [
  { section: "Cover",           sub: "BI & Analytics Engineer" },
  { section: "The Problem",     sub: "Why data teams struggle" },
  { section: "What I Do",       sub: "End-to-end analytics" },
  { section: "Case Study 1",    sub: "Real-Time Sales Intelligence" },
  { section: "Case Study 2",    sub: "Customer Churn Analytics" },
  { section: "Case Study 3",    sub: "Fabric Lakehouse Migration" },
  { section: "Impact Numbers",  sub: "Metrics from real delivery" },
  { section: "Tech Stack",      sub: "The tools I deploy" },
  { section: "Get in Touch",    sub: "Let's build something great" },
];

/* ─── Slide content components ───────────────────────── */

function SlideCover() {
  return (
    <div className="slide-inner s-cover">
      <div className="s-cover-inner">
        <div className="s-cover-glow" />
        <div className="eyebrow reveal"><span className="dt" />Analytics · BI · Data Engineering</div>
        <h1 className="h-display">
          <span className="line"><span>Dheeraj <span className="grd">Kashyap</span></span></span>
          <span className="line"><span>BI &amp; Analytics Engineer.</span></span>
        </h1>
        <p className="body-lg reveal" style={{ maxWidth: 660 }}>
          7+ years turning raw data into executive decisions — across <strong style={{ color: "#fff" }}>Microsoft Fabric</strong>, <strong style={{ color: "#fff" }}>Databricks</strong>, <strong style={{ color: "#fff" }}>Power BI</strong>, and <strong style={{ color: "#fff" }}>Snowflake</strong>.
        </p>
        <div className="s-cover-meta reveal">
          <span>7+ Years Experience</span><span className="sep" />
          <span>50+ Dashboards Delivered</span><span className="sep" />
          <span>13 Certifications</span>
        </div>
        <div className="s-cover-cta reveal">
          <a href="#contact" className="btn-primary" data-goto="9">Get in Touch →</a>
          <a href="/" className="btn-secondary">← Back to Portfolio</a>
        </div>
        <div className="s-cover-version">PORTFOLIO / DECK / 2026 · DHEERAJ KASHYAP</div>
      </div>
    </div>
  );
}

function SlideProblem() {
  return (
    <div className="slide-inner s-problem">
      <div className="s-problem-grid">
        <div className="s-problem-left">
          <div className="eyebrow reveal"><span className="dt" />The challenge</div>
          <h2 className="h-display reveal">Most organisations sit on <em>gold</em> but see only noise.</h2>
          <p className="body-lg reveal" style={{ maxWidth: 500 }}>
            Data teams spend over <strong style={{ color: "#fff" }}>60% of their time</strong> cleaning, wrangling, and plumbing — not delivering insight. The stack is complex, the stakeholders are impatient, and the dashboards tell you what happened, never why.
          </p>
        </div>
        <div className="s-problem-right">
          {[
            { n: "01", title: "Fragmented pipelines", body: "Data lives in silos — ERP, CRM, flat files — with no single version of truth. Reconciliation eats weeks." },
            { n: "02", title: "Dashboards nobody trusts", body: "Numbers conflict across reports. Stakeholders build their own spreadsheets. Adoption collapses." },
            { n: "03", title: "Insights arrive too late", body: "Batch-based reporting means yesterday's data drives today's decisions. Opportunities are missed in real time." },
          ].map(c => (
            <div className="problem-card glass-card reveal" key={c.n}>
              <div className="pc-num">{c.n}</div>
              <div className="pc-body">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideProduct() {
  return (
    <div className="slide-inner s-product">
      <div className="s-product-grid">
        <div className="s-product-left">
          <span className="product-tag reveal">⬟ End-to-end · From source to decision</span>
          <h2 className="h-display reveal">I build the full <span className="grd">data stack</span> — from ingestion to boardroom.</h2>
          <p className="body-lg reveal">Not just dashboards. Full pipelines, semantic models, and the BI layer — designed to scale, documented to last, and built to be trusted.</p>
          <div className="s-product-features reveal">
            {[
              { ic: "⚡", t: "ETL / ELT Pipelines" },
              { ic: "☁", t: "Lakehouse Architecture" },
              { ic: "◈",  t: "Semantic Modelling" },
              { ic: "▦",  t: "Executive Dashboards" },
            ].map(f => (
              <div className="pf" key={f.t}>
                <div className="pf-ic">{f.ic}</div>
                <span>{f.t}</span>
              </div>
            ))}
          </div>
          <div className="s-product-cta reveal">
            <a data-goto="4" className="btn-primary" style={{ cursor: "pointer" }}>See case studies →</a>
            <a href="mailto:kash.dheeraj.yap@gmail.com" className="btn-secondary">Book a call</a>
          </div>
        </div>
        <div className="s-product-right">
          <div className="mock-ui glass-card">
            <div className="mock-head">
              <div className="mh-l"><span className="mh-dot" />Power BI · Production</div>
              <div className="mh-r"><i /><i /><i /></div>
            </div>
            <div className="mock-stat">
              <div className="ms-l">
                <span>Revenue vs Target · MTD</span>
                <strong>£2.4<span style={{ fontSize: ".55em", color: "var(--ink-3)", fontWeight: 400 }}>M</span></strong>
              </div>
              <div className="ms-delta">↑ 9% vs plan</div>
            </div>
            <div className="mock-chart">
              <svg viewBox="0 0 500 140" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="mockGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a5b4fc" stopOpacity=".45" />
                    <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="area-path" d="M0,100 C40,90 70,80 100,75 S160,55 200,50 S260,40 300,35 S360,20 400,22 S460,30 500,18 L500,140 L0,140 Z" />
                <path className="line-path" d="M0,100 C40,90 70,80 100,75 S160,55 200,50 S260,40 300,35 S360,20 400,22 S460,30 500,18" />
              </svg>
            </div>
            <div className="mock-tiles">
              <div className="mock-tile"><span>Pipeline SLA</span><strong>99.9%</strong></div>
              <div className="mock-tile"><span>Dashboards</span><strong>50+</strong></div>
              <div className="mock-tile"><span>Countries</span><strong>8</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CaseSlideProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  problem: string;
  results: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  color: string;
}

function CaseSlide({ eyebrow, title, subtitle, problem, results, metrics, stack, color }: CaseSlideProps) {
  return (
    <div className="slide-inner s-problem">
      <div className="s-problem-grid">
        <div className="s-problem-left">
          <div className="eyebrow reveal"><span className="dt" />{eyebrow}</div>
          <h2 className="h-display reveal" style={{ fontSize: "clamp(32px,4.2vw,60px)" }}>{title}</h2>
          <p className="body-md reveal" style={{ color: "var(--ink-3)", marginBottom: 12 }}>{subtitle}</p>
          <p className="body-lg reveal" style={{ maxWidth: 500, fontSize: "clamp(13px,1.2vw,16px)" }}>{problem}</p>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {stack.map(s => (
              <span key={s} style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".15em", padding: "4px 10px",
                border: `1px solid ${color}40`, borderRadius: 100, color, background: `${color}12`
              }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="s-problem-right">
          {/* Metrics row */}
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            {metrics.map(m => (
              <div key={m.label} className="glass-card" style={{ padding: "14px 16px", borderColor: `${color}30` }}>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "clamp(22px,2.5vw,36px)", letterSpacing: "-.04em", color }}>{m.value}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
          {/* Results */}
          {results.map((r, i) => (
            <div className="problem-card glass-card reveal" key={i} style={{ padding: "14px 18px" }}>
              <div className="pc-num" style={{ color }}>{String(i + 1).padStart(2, "0")}</div>
              <div className="pc-body"><p style={{ color: "var(--ink-2)" }}>{r}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideMetrics() {
  const metrics = [
    { num: "7+", unit: "yrs", lbl: "end-to-end analytics engineering across enterprise clients" },
    { num: "50+", unit: "", lbl: "Power BI dashboards delivered to production with active users" },
    { num: "100M+", unit: "", lbl: "records processed through pipelines I designed and maintain" },
    { num: "13", unit: "", lbl: "professional certifications across Microsoft, Databricks & Snowflake" },
  ];
  return (
    <div className="slide-inner s-metrics">
      <div className="s-metrics-head">
        <div className="eyebrow reveal"><span className="dt" />Proven delivery</div>
        <h2 className="h-display reveal">Numbers from <span className="grd">real projects</span>, real clients.</h2>
      </div>
      <div className="metric-grid">
        {metrics.map((m, i) => (
          <div className="metric glass-card reveal" key={i}>
            <div>
              <div className="metric-num grd">{m.num}{m.unit && <span className="unit">{m.unit}</span>}</div>
              <div className="metric-lbl">{m.lbl}</div>
            </div>
            <div className="metric-spark">
              <svg viewBox="0 0 100 24" preserveAspectRatio="none">
                <path d={i % 2 === 0 ? "M0,20 L25,16 L50,10 L75,6 L100,3" : "M0,12 L25,10 L50,7 L75,5 L100,2"} />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="s-metrics-quote glass-card reveal">
        <div className="q-mark">&ldquo;</div>
        <blockquote>Great analytics isn&apos;t about beautiful dashboards — it&apos;s about <em style={{ color: "var(--indigo-soft)", fontStyle: "normal" }}>faster, better decisions</em> for the business.</blockquote>
        <div className="q-attr">
          <strong>Dheeraj Kashyap</strong>
          <span>BI &amp; Analytics Engineer</span>
        </div>
      </div>
    </div>
  );
}

function SlideStack() {
  const categories = [
    {
      num: "01", icon: "◈", title: "Visualisation & BI",
      desc: "Executive-grade dashboards built for adoption, not just aesthetics.",
      items: ["Power BI + DAX", "Zebra BI", "Grafana", "Semantic Models", "Row-Level Security"],
    },
    {
      num: "02", icon: "⚡", title: "Data Engineering",
      desc: "Pipelines that are reliable, tested, and version-controlled.",
      items: ["Azure Data Factory", "dbt / SQLMesh", "PySpark", "Databricks", "Medallion Architecture"],
    },
    {
      num: "03", icon: "☁", title: "Cloud Platforms",
      desc: "Modern lakehouse and warehouse architectures on enterprise cloud.",
      items: ["Microsoft Fabric", "Snowflake", "ADLS Gen2", "Delta Lake", "Azure Synapse"],
    },
    {
      num: "04", icon: "⬡", title: "Languages & Tools",
      desc: "SQL-first mindset with Python for ML integration and automation.",
      items: ["SQL · KQL", "Python · Pandas", "Kafka · Airflow", "Git · Terraform", "MLflow"],
    },
  ];
  return (
    <div className="slide-inner s-features">
      <div className="s-features-head">
        <div className="sf-l">
          <div className="eyebrow reveal"><span className="dt" />Tech stack</div>
          <h2 className="h-display reveal">The full modern data stack.</h2>
        </div>
        <p className="sf-r reveal">Certified across Microsoft Fabric, Databricks, and Snowflake. Hands-on with every layer — from raw ingestion to executive insight.</p>
      </div>
      <div className="feature-grid">
        {categories.map(c => (
          <div className="feature glass-card reveal" key={c.num}>
            <div className="f-num">{c.num}</div>
            <div className="f-ic">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
              {c.items.map(it => (
                <li key={it} style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--ink-3)", paddingLeft: 12, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--indigo-soft)" }}>—</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideCta() {
  return (
    <div className="slide-inner s-cta">
      <div className="s-cta-inner">
        <div className="s-cta-glow" />
        <div className="eyebrow reveal"><span className="dt" />Available for new engagements</div>
        <h2 className="h-display">
          <span className="mw"><span>Let&apos;s build</span></span><br />
          <span className="mw"><span><span className="grd">great analytics.</span></span></span>
        </h2>
        <p className="body-lg reveal" style={{ maxWidth: 560 }}>
          Looking for a <strong style={{ color: "#fff" }}>Business Analyst</strong>, <strong style={{ color: "#fff" }}>BI Engineer</strong>, or <strong style={{ color: "#fff" }}>Analytics Consultant</strong>? Let&apos;s talk about what you need.
        </p>
        <div className="s-cta-row reveal">
          <a href="https://calendly.com/dheerajkashyap" target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Call →</a>
          <a href="mailto:kash.dheeraj.yap@gmail.com" className="btn-secondary">Email Me</a>
        </div>
        <div className="s-cta-launch-info reveal">
          <div className="launch-item"><span className="li-l">Location</span><span className="li-v">Bengaluru, <span className="accent">India</span></span></div>
          <div className="launch-item"><span className="li-l">Open to</span><span className="li-v">Remote &amp; <span className="accent">On-site</span></span></div>
          <div className="launch-item"><span className="li-l">LinkedIn</span><span className="li-v"><span className="accent">kashyap-dheeraj</span></span></div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main deck client ────────────────────────────────── */

export function DeckClient() {
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState(0); // rendered active slide
  const [menuOpen, setMenuOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const exitingRef = useRef<number | null>(null);

  const go = useCallback((t: number) => {
    if (animating || t === idx || t < 0 || t >= slides.length) return;
    setAnimating(true);
    exitingRef.current = idx;
    setIdx(t);
    setTimeout(() => {
      setActive(t);
      exitingRef.current = null;
      setTimeout(() => setAnimating(false), 900);
    }, 350);
  }, [animating, idx]);

  // keyboard + swipe
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) { setMenuOpen(false); return; }
      if (menuOpen) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(idx + 1); }
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "m" || e.key === "M") setMenuOpen(o => !o);
      if (/^[1-9]$/.test(e.key)) go(parseInt(e.key, 10) - 1);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [go, idx, menuOpen]);

  useEffect(() => {
    let tx = 0, ty = 0, scrolling = false;
    const ts = (e: TouchEvent) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; scrolling = false; };
    const tm = (e: TouchEvent) => { if (Math.abs(e.touches[0].clientY - ty) > Math.abs(e.touches[0].clientX - tx)) scrolling = true; };
    const te = (e: TouchEvent) => {
      if (scrolling || menuOpen) return;
      const dx = e.changedTouches[0].clientX - tx;
      const dy = Math.abs(e.changedTouches[0].clientY - ty);
      if (Math.abs(dx) > 60 && dy < 40) dx < 0 ? go(idx + 1) : go(idx - 1);
    };
    window.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchmove", tm, { passive: true });
    window.addEventListener("touchend", te, { passive: true });
    return () => { window.removeEventListener("touchstart", ts); window.removeEventListener("touchmove", tm); window.removeEventListener("touchend", te); };
  }, [go, idx, menuOpen]);

  const curr = String(idx + 1).padStart(2, "0");
  const total = String(slides.length).padStart(2, "0");

  const slideContent = [
    <SlideCover key="cover" />,
    <SlideProblem key="problem" />,
    <SlideProduct key="product" />,
    <CaseSlide key="cs1"
      eyebrow="Case Study 01 · Amazon"
      title="Real-Time Sales Intelligence Platform"
      subtitle="End-to-end streaming analytics for global retail"
      problem="A global retail enterprise was operating on batch-based reporting with 6-hour latency, preventing real-time decisions across 8 regional markets."
      results={[
        "Reduced reporting latency from 6 hours to under 10 minutes",
        "Enabled real-time decision-making for 8 regional sales teams",
        "Processed 5M+ daily transactions at 99.9% pipeline reliability",
      ]}
      metrics={[
        { value: "5M+", label: "Daily transactions" },
        { value: "<10min", label: "Reporting latency" },
        { value: "8", label: "Regional markets" },
        { value: "99.9%", label: "Pipeline reliability" },
      ]}
      stack={["Databricks", "Azure Data Factory", "PySpark", "Power BI", "Delta Lake"]}
      color="#3B82F6"
    />,
    <CaseSlide key="cs2"
      eyebrow="Case Study 02 · SaaS Enterprise"
      title="Customer Churn Analytics Pipeline"
      subtitle="ML-powered prediction with executive BI integration"
      problem="A subscription enterprise had no early-warning system. Customer success teams were reacting to cancellations rather than proactively retaining at-risk accounts."
      results={[
        "Achieved 89% recall on churn prediction model",
        "Reduced customer churn rate by 18% within 6 months",
        "Generated $300K in annual savings from retained accounts",
      ]}
      metrics={[
        { value: "2M+", label: "Customer records" },
        { value: "89%", label: "Model recall" },
        { value: "18%", label: "Churn reduction" },
        { value: "$300K", label: "Annual savings" },
      ]}
      stack={["Databricks", "Snowflake", "dbt", "Power BI", "Python", "MLflow"]}
      color="#F59E0B"
    />,
    <CaseSlide key="cs3"
      eyebrow="Case Study 03 · Enterprise Migration"
      title="Fabric Lakehouse Migration"
      subtitle="Legacy warehouse to Microsoft Fabric modernisation"
      problem="An enterprise data team was running a legacy warehouse with 12% monthly pipeline failure rates, high maintenance overhead, and escalating compute costs."
      results={[
        "Pipeline failure rate reduced from 12% to under 1%",
        "Maintenance overhead reduced by 90%",
        "Compute costs cut by 15% through Fabric capacity optimisation",
      ]}
      metrics={[
        { value: "90%", label: "Maintenance reduction" },
        { value: "<1%", label: "Pipeline failure rate" },
        { value: "15%", label: "Cost reduction" },
        { value: "200+", label: "SQL models migrated" },
      ]}
      stack={["Microsoft Fabric", "SQLMesh", "Delta Lake", "OneLake", "Power BI"]}
      color="#8B5CF6"
    />,
    <SlideMetrics key="metrics" />,
    <SlideStack key="stack" />,
    <SlideCta key="cta" />,
  ];

  return (
    <>
      <style>{`
        :root{
          --ee:cubic-bezier(0.19,1,0.22,1);
          --eq:cubic-bezier(0.77,0,0.175,1);
          --es:cubic-bezier(0.34,1.56,0.64,1);
          --bg:#0a0e1a;
          --bg-2:#0d1220;
          --ink:#ffffff;
          --ink-2:rgba(255,255,255,.7);
          --ink-3:rgba(255,255,255,.5);
          --ink-4:rgba(255,255,255,.3);
          --line:rgba(255,255,255,.1);
          --line-2:rgba(255,255,255,.06);
          --glass-bg:linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02));
          --glass-border:rgba(255,255,255,.1);
          --glass-blur:blur(40px);
          --indigo:#6366f1;
          --indigo-soft:#a5b4fc;
          --pink:#ec4899;
          --pink-soft:#f9a8d4;
          --cyan:#22d3ee;
          --green:#4ade80;
          --amber:#fbbf24;
          --grad-a:linear-gradient(135deg,#fff 0%,#a5b4fc 50%,#ec4899 100%);
          --grad-b:linear-gradient(135deg,#6366f1,#ec4899);
          --grad-c:linear-gradient(90deg,#6366f1,#a5b4fc);
          --font-sans:'Space Grotesk',sans-serif;
          --font-body:'DM Sans',sans-serif;
          --font-mono:'JetBrains Mono',monospace;
          --r-sm:10px;
          --r-md:16px;
          --r-lg:22px;
          --r-xl:28px;
        }
        html,body{height:100%;width:100%;background:var(--bg);color:var(--ink);font-family:var(--font-sans);-webkit-font-smoothing:antialiased;overflow:hidden;margin:0;padding:0;box-sizing:border-box}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .deck::before{content:'';position:fixed;inset:0;background:radial-gradient(circle at 15% 20%,rgba(99,102,241,.22) 0%,transparent 50%),radial-gradient(circle at 85% 80%,rgba(236,72,153,.15) 0%,transparent 50%),radial-gradient(circle at 50% 50%,rgba(34,211,238,.08) 0%,transparent 60%);z-index:0;animation:ambient 14s ease-in-out infinite alternate;pointer-events:none}
        @keyframes ambient{to{opacity:.7;transform:scale(1.05)}}
        .deck::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at center,black 25%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse at center,black 25%,transparent 80%);z-index:0;pointer-events:none}
        .deck{position:fixed;inset:0;overflow:hidden}

        .slide{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity .9s var(--eq),visibility .9s;z-index:1;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}
        .slide.active{opacity:1;visibility:visible;transition-delay:.4s}
        .slide.exiting{transition-delay:0s}
        .slide-inner{min-height:100%;padding:90px 6vmin 80px;display:flex;flex-direction:column;position:relative}

        .brand{position:fixed;top:28px;left:32px;z-index:100;display:flex;align-items:center;gap:11px;font-family:var(--font-sans);font-weight:600;font-size:16px;letter-spacing:-.01em;color:var(--ink)}
        .brand .logo{width:28px;height:28px;border-radius:8px;background:var(--grad-b);position:relative;flex-shrink:0}
        .brand .logo::after{content:'';position:absolute;inset:5px;background:var(--bg);border-radius:4px}

        .nav{position:fixed;top:24px;right:24px;display:flex;gap:6px;align-items:center;z-index:100;font-family:var(--font-mono)}
        .nav button{background:rgba(255,255,255,.1);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.22);color:var(--ink);cursor:pointer;width:34px;height:34px;display:grid;place-items:center;border-radius:50%;font-family:inherit;font-size:13px;transition:all .25s}
        .nav button:hover{background:rgba(255,255,255,.22);transform:scale(1.06)}
        .counter{font-size:11px;letter-spacing:.18em;padding:0 14px;color:var(--ink);min-width:62px;text-align:center;background:rgba(255,255,255,.08);border:1px solid var(--glass-border);height:34px;display:flex;align-items:center;justify-content:center;border-radius:100px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}

        .section-tag{position:fixed;bottom:28px;left:32px;z-index:100;font-family:var(--font-mono);font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--ink-3);display:flex;gap:10px;align-items:center;pointer-events:none}
        .section-tag .pip{width:5px;height:5px;border-radius:50%;background:var(--indigo-soft);box-shadow:0 0 10px var(--indigo);animation:pip 2s infinite}
        @keyframes pip{0%,100%{opacity:1}50%{opacity:.3}}

        .menu-btn .icon{display:flex;flex-direction:column;gap:3px;align-items:center}
        .menu-btn .icon i{display:block;width:14px;height:1.5px;background:currentColor;border-radius:1px;transition:all .3s var(--ee)}
        .menu-btn.open .icon i:nth-child(1){transform:translateY(4.5px) rotate(45deg)}
        .menu-btn.open .icon i:nth-child(2){opacity:0;transform:scaleX(0)}
        .menu-btn.open .icon i:nth-child(3){transform:translateY(-4.5px) rotate(-45deg)}

        .menu-overlay{position:fixed;inset:0;background:rgba(10,14,26,.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:200;opacity:0;visibility:hidden;transition:opacity .35s var(--ee),visibility .35s}
        .menu-overlay.open{opacity:1;visibility:visible}
        .menu-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-48%) scale(.96);width:min(560px,92vw);max-height:84vh;overflow-y:auto;background:linear-gradient(180deg,rgba(20,24,42,.95) 0%,rgba(13,18,32,.95) 100%);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,.14);border-radius:24px;z-index:201;opacity:0;visibility:hidden;transition:opacity .4s var(--ee),visibility .4s,transform .5s var(--es);box-shadow:0 30px 80px rgba(0,0,0,.5),0 0 60px rgba(99,102,241,.15)}
        .menu-panel.open{opacity:1;visibility:visible;transform:translate(-50%,-50%) scale(1)}
        .menu-header{padding:24px 28px 20px;border-bottom:1px solid var(--line-2);display:flex;justify-content:space-between;align-items:center}
        .menu-header h3{font-family:var(--font-sans);font-weight:500;font-size:17px;letter-spacing:-.01em}
        .menu-header .menu-meta{font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-3)}
        .menu-list{padding:12px 12px 20px;display:flex;flex-direction:column;gap:2px}
        .menu-item{display:flex;align-items:center;gap:18px;padding:14px 18px;border-radius:14px;cursor:pointer;transition:all .25s var(--ee);border:1px solid transparent}
        .menu-item:hover{background:rgba(255,255,255,.05);border-color:var(--line)}
        .menu-item.current{background:linear-gradient(90deg,rgba(99,102,241,.18),rgba(236,72,153,.08));border-color:rgba(99,102,241,.3)}
        .menu-item .mi-num{font-family:var(--font-mono);font-size:11px;color:var(--ink-3);letter-spacing:.15em;width:28px;flex-shrink:0}
        .menu-item.current .mi-num{color:var(--indigo-soft)}
        .menu-item .mi-label{font-family:var(--font-sans);font-weight:500;font-size:15px;letter-spacing:-.01em;flex:1}
        .menu-item .mi-sub{font-family:var(--font-body);font-size:12px;color:var(--ink-3);margin-top:2px}
        .menu-item .mi-arr{color:var(--ink-4);font-size:14px;transition:all .25s}
        .menu-item:hover .mi-arr{color:var(--ink);transform:translateX(3px)}
        .menu-item.current .mi-arr{color:var(--indigo-soft)}
        .menu-footer{padding:14px 28px 22px;border-top:1px solid var(--line-2);display:flex;justify-content:space-between;align-items:center;font-family:var(--font-mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3)}
        .menu-footer kbd{background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:5px;padding:3px 8px;font-family:var(--font-mono);font-size:9.5px;color:var(--ink-2);margin:0 4px}

        .reveal{opacity:0;transform:translateY(30px);transition:opacity 1s var(--ee),transform 1s var(--ee)}
        .slide.active .reveal{opacity:1;transform:translateY(0)}
        .slide.active .reveal:nth-of-type(1){transition-delay:.5s}
        .slide.active .reveal:nth-of-type(2){transition-delay:.65s}
        .slide.active .reveal:nth-of-type(3){transition-delay:.8s}
        .slide.active .reveal:nth-of-type(4){transition-delay:.95s}
        .slide.active .reveal:nth-of-type(5){transition-delay:1.1s}
        .slide.active .reveal:nth-of-type(6){transition-delay:1.25s}
        .slide.active .reveal:nth-of-type(7){transition-delay:1.4s}
        .slide.active .reveal:nth-of-type(8){transition-delay:1.55s}

        .mw{display:inline-block;overflow:hidden;vertical-align:bottom}
        .mw>span{display:inline-block;transform:translateY(110%);transition:transform 1.2s var(--ee)}
        .slide.active .mw>span{transform:translateY(0)}

        .eyebrow{display:inline-flex;align-items:center;gap:9px;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.3);padding:7px 16px;border-radius:100px;font-family:var(--font-body);font-size:12px;color:var(--indigo-soft);width:fit-content;letter-spacing:.02em}
        .eyebrow .dt{width:6px;height:6px;border-radius:50%;background:var(--indigo);box-shadow:0 0 10px var(--indigo);animation:pip 2s infinite}

        .h-display{font-family:var(--font-sans);font-weight:500;line-height:1.02;letter-spacing:-.035em}
        .h-display .grd{background:var(--grad-a);-webkit-background-clip:text;background-clip:text;color:transparent}
        .grd{background:var(--grad-a);-webkit-background-clip:text;background-clip:text;color:transparent}

        .body-lg{font-family:var(--font-body);font-size:clamp(15px,1.4vw,18px);line-height:1.6;color:var(--ink-2);font-weight:400}
        .body-md{font-family:var(--font-body);font-size:14px;line-height:1.6;color:var(--ink-2)}

        .btn-primary{background:#fff;color:var(--bg);padding:13px 24px;border-radius:100px;font-family:var(--font-body);font-size:14px;font-weight:600;display:inline-flex;align-items:center;gap:10px;cursor:pointer;transition:all .3s;border:none;text-decoration:none}
        .btn-primary:hover{background:linear-gradient(135deg,var(--indigo-soft),#fff);transform:translateY(-2px);box-shadow:0 10px 30px rgba(165,180,252,.25)}
        .btn-secondary{background:rgba(255,255,255,.06);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);color:var(--ink);padding:13px 24px;border-radius:100px;font-family:var(--font-body);font-size:14px;font-weight:500;display:inline-flex;align-items:center;gap:10px;cursor:pointer;transition:all .3s;border:1px solid var(--glass-border);text-decoration:none}
        .btn-secondary:hover{background:rgba(255,255,255,.12)}

        .glass-card{background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:var(--r-lg);position:relative;overflow:hidden}

        /* Cover */
        .s-cover{align-items:center;justify-content:center;text-align:center;padding:90px 6vmin 80px}
        .s-cover-inner{max-width:1100px;width:100%;display:flex;flex-direction:column;align-items:center;gap:32px;position:relative;margin:auto 0}
        .s-cover-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120%;height:140%;background:radial-gradient(ellipse,rgba(99,102,241,.25),transparent 60%);filter:blur(60px);z-index:-1;animation:coverPulse 6s ease-in-out infinite alternate}
        @keyframes coverPulse{to{opacity:.7;transform:translate(-50%,-50%) scale(1.1)}}
        .s-cover h1{font-size:clamp(54px,8vw,140px)}
        .s-cover h1 .line{display:block;overflow:hidden}
        .s-cover h1 .line>span{display:inline-block;transform:translateY(110%);transition:transform 1.4s var(--ee)}
        .slide.active .s-cover h1 .line>span{transform:translateY(0)}
        .slide.active .s-cover h1 .line:nth-child(1)>span{transition-delay:.5s}
        .slide.active .s-cover h1 .line:nth-child(2)>span{transition-delay:.7s}
        .s-cover-meta{display:flex;gap:32px;align-items:center;flex-wrap:wrap;justify-content:center;margin-top:8px;font-family:var(--font-mono);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-3)}
        .s-cover-meta .sep{width:24px;height:1px;background:var(--ink-4)}
        .s-cover-cta{display:flex;gap:14px;margin-top:16px;flex-wrap:wrap;justify-content:center}
        .s-cover-version{position:absolute;bottom:-32px;left:50%;transform:translateX(-50%);font-family:var(--font-mono);font-size:10px;color:var(--ink-4);letter-spacing:.3em;text-transform:uppercase;white-space:nowrap}

        /* Problem */
        .s-problem{justify-content:center}
        .s-problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:6vmin;align-items:center;flex:1}
        .s-problem-left{padding-left:2vmin;display:flex;flex-direction:column;gap:24px}
        .s-problem h2{font-size:clamp(40px,5.5vw,80px)}
        .s-problem h2 em{font-style:normal;background:linear-gradient(135deg,var(--pink-soft),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent}
        .s-problem-right{display:flex;flex-direction:column;gap:14px}
        .problem-card{padding:22px 24px;display:flex;gap:18px;align-items:flex-start;transition:all .4s var(--ee)}
        .problem-card:hover{border-color:rgba(255,255,255,.2);transform:translateX(6px)}
        .pc-num{font-family:var(--font-mono);font-size:11px;color:var(--indigo-soft);letter-spacing:.15em;flex-shrink:0;margin-top:5px;width:24px}
        .pc-body h3{font-family:var(--font-sans);font-weight:500;font-size:18px;margin-bottom:6px;letter-spacing:-.01em}
        .pc-body p{font-family:var(--font-body);font-size:13px;line-height:1.55;color:var(--ink-3)}

        /* Product */
        .s-product{justify-content:center}
        .s-product-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:5vmin;align-items:center;flex:1}
        .s-product-left{padding-left:2vmin;display:flex;flex-direction:column;gap:24px}
        .s-product h2{font-size:clamp(38px,5vw,72px)}
        .s-product .product-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.3);color:var(--cyan);padding:6px 14px;border-radius:100px;font-family:var(--font-body);font-size:12px;width:fit-content}
        .s-product-features{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px}
        .s-product-features .pf{padding:14px 16px;background:rgba(255,255,255,.03);border:1px solid var(--line-2);border-radius:12px;display:flex;align-items:center;gap:12px}
        .s-product-features .pf .pf-ic{width:28px;height:28px;border-radius:8px;background:rgba(99,102,241,.18);color:var(--indigo-soft);display:grid;place-items:center;font-size:14px;flex-shrink:0}
        .s-product-features .pf span{font-family:var(--font-body);font-size:13px;color:var(--ink);font-weight:500}
        .s-product-cta{display:flex;gap:12px;margin-top:8px;flex-wrap:wrap}
        .s-product-right{position:relative;display:flex;align-items:center;justify-content:center;min-height:340px}
        .mock-ui{width:100%;max-width:520px;aspect-ratio:1.15/1;padding:20px;display:flex;flex-direction:column;gap:14px;transform:perspective(1400px) rotateY(-8deg) rotateX(2deg);transition:transform 1s var(--ee)}
        .slide.active .mock-ui{transform:perspective(1400px) rotateY(-4deg) rotateX(1deg)}
        .mock-ui::before{content:'';position:absolute;top:-30%;right:-15%;width:240px;height:240px;background:radial-gradient(circle,rgba(99,102,241,.4),transparent 70%);filter:blur(50px);z-index:-1}
        .mock-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:12px;border-bottom:1px solid var(--line-2)}
        .mock-head .mh-l{display:flex;align-items:center;gap:8px;font-family:var(--font-body);font-size:12px;color:var(--ink-2)}
        .mock-head .mh-dot{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green)}
        .mock-head .mh-r{display:flex;gap:6px}
        .mock-head .mh-r i{width:6px;height:6px;border-radius:50%;background:var(--ink-4);display:inline-block}
        .mock-stat{display:flex;justify-content:space-between;align-items:flex-end;padding:4px 0}
        .mock-stat .ms-l span{display:block;font-family:var(--font-body);font-size:11px;color:var(--ink-3);margin-bottom:4px}
        .mock-stat .ms-l strong{font-family:var(--font-sans);font-weight:500;font-size:24px;letter-spacing:-.02em}
        .mock-stat .ms-delta{font-family:var(--font-body);font-size:11px;color:var(--green);background:rgba(74,222,128,.12);padding:3px 8px;border-radius:100px;font-weight:600}
        .mock-chart{flex:1;position:relative;min-height:0}
        .mock-chart svg{width:100%;height:100%}
        .mock-chart .area-path{fill:url(#mockGrad);opacity:0;transition:opacity 1s var(--ee) 1.5s}
        .slide.active .mock-chart .area-path{opacity:1}
        .mock-chart .line-path{fill:none;stroke:var(--indigo-soft);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1200;stroke-dashoffset:1200;transition:stroke-dashoffset 2s var(--ee) 1.3s}
        .slide.active .mock-chart .line-path{stroke-dashoffset:0}
        .mock-tiles{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding-top:12px;border-top:1px solid var(--line-2)}
        .mock-tile{padding:10px;background:rgba(255,255,255,.03);border-radius:10px}
        .mock-tile span{display:block;font-family:var(--font-body);font-size:9px;color:var(--ink-3);margin-bottom:4px;letter-spacing:.05em;text-transform:uppercase}
        .mock-tile strong{font-family:var(--font-sans);font-weight:500;font-size:14px}

        /* Features */
        .s-features{gap:5vmin;justify-content:center}
        .s-features-head{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;flex-wrap:wrap}
        .s-features-head .sf-l{flex:1;min-width:300px}
        .s-features-head h2{font-size:clamp(36px,4.6vw,64px);margin-top:18px}
        .s-features-head .sf-r{font-family:var(--font-body);font-size:14px;color:var(--ink-2);max-width:340px;line-height:1.55}
        .feature-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
        .feature{padding:24px;display:flex;flex-direction:column;gap:14px;transition:all .4s var(--ee)}
        .feature:hover{border-color:rgba(165,180,252,.4);transform:translateY(-4px);background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.03))}
        .feature .f-num{font-family:var(--font-mono);font-size:11px;color:var(--indigo-soft);letter-spacing:.15em}
        .feature .f-ic{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;font-size:18px;background:rgba(99,102,241,.15);color:var(--indigo-soft)}
        .feature:nth-child(2) .f-ic{background:rgba(236,72,153,.15);color:var(--pink-soft)}
        .feature:nth-child(3) .f-ic{background:rgba(34,211,238,.15);color:var(--cyan)}
        .feature:nth-child(4) .f-ic{background:rgba(74,222,128,.15);color:var(--green)}
        .feature h3{font-family:var(--font-sans);font-weight:500;font-size:17px;letter-spacing:-.01em;line-height:1.3}
        .feature p{font-family:var(--font-body);font-size:12.5px;line-height:1.55;color:var(--ink-3);flex:1}

        /* Metrics */
        .s-metrics{justify-content:center;gap:5vmin}
        .s-metrics-head{max-width:780px}
        .s-metrics-head h2{font-size:clamp(40px,5.4vw,76px);margin-top:18px}
        .metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
        .metric{padding:28px 26px;display:flex;flex-direction:column;justify-content:space-between;min-height:200px;position:relative;overflow:hidden}
        .metric-num{font-family:var(--font-sans);font-weight:500;font-size:clamp(36px,4.5vw,60px);letter-spacing:-.04em;line-height:1}
        .metric-num.grd{background:var(--grad-a);-webkit-background-clip:text;background-clip:text;color:transparent}
        .metric-num .unit{font-size:.5em;color:var(--ink-3);font-weight:400;margin-left:2px}
        .metric-lbl{font-family:var(--font-body);font-size:13px;color:var(--ink-2);line-height:1.45;margin-top:14px}
        .metric-spark{margin-top:10px;height:24px}
        .metric-spark svg{width:100%;height:100%}
        .metric-spark path{fill:none;stroke:var(--indigo-soft);stroke-width:1.5;stroke-linecap:round;stroke-dasharray:200;stroke-dashoffset:200;transition:stroke-dashoffset 1.6s var(--ee) 1.2s}
        .slide.active .metric-spark path{stroke-dashoffset:0}
        .s-metrics-quote{display:flex;align-items:center;gap:24px;padding:28px 32px;flex-wrap:wrap}
        .q-mark{font-family:var(--font-sans);font-size:60px;line-height:.6;color:var(--indigo-soft);font-weight:300}
        .q-attr{display:flex;flex-direction:column;gap:4px;font-family:var(--font-body);font-size:13px;color:var(--ink-3);min-width:160px}
        .q-attr strong{color:var(--ink);font-weight:500;font-size:14px}

        /* CTA */
        .s-cta{align-items:center;justify-content:center;text-align:center;padding:90px 6vmin 80px}
        .s-cta-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;height:120%;background:radial-gradient(ellipse,rgba(236,72,153,.18),transparent 60%);filter:blur(60px);z-index:-1;animation:coverPulse 6s ease-in-out infinite alternate}
        .s-cta-inner{max-width:880px;display:flex;flex-direction:column;align-items:center;gap:28px;position:relative;margin:auto 0}
        .s-cta h2{font-size:clamp(46px,7vw,110px)}
        .s-cta-row{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:12px}
        .s-cta-launch-info{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;width:100%;max-width:720px;margin-top:32px;padding-top:32px;border-top:1px solid var(--line)}
        .launch-item{display:flex;flex-direction:column;gap:6px;text-align:left}
        .li-l{font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-3)}
        .li-v{font-family:var(--font-sans);font-weight:500;font-size:18px}
        .li-v .accent{color:var(--indigo-soft)}

        /* Responsive */
        @media (max-width:1024px){
          .s-problem-grid,.s-product-grid{grid-template-columns:1fr;gap:32px}
          .feature-grid,.metric-grid{grid-template-columns:repeat(2,1fr)}
          .s-cta-launch-info{grid-template-columns:1fr;gap:18px;text-align:center}
          .launch-item{align-items:center;text-align:center}
        }
        @media (max-width:640px){
          html,body{overflow:hidden}
          .slide-inner,.s-cover,.s-cta{padding:72px 18px 24px}
          .s-cover-inner{gap:24px}
          .brand{top:18px;left:18px;font-size:14px}
          .nav{top:16px;right:16px;gap:5px}
          .nav button{width:32px;height:32px;font-size:12px}
          .counter{padding:0 10px;font-size:10px;height:32px;min-width:54px}
          .feature-grid,.metric-grid{grid-template-columns:1fr}
          .s-cover h1{font-size:44px}
          .s-cta h2{font-size:42px}
        }
      `}</style>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Brand */}
      <div className="brand">
        <span className="logo" />
        DK
      </div>

      {/* Section tag */}
      <div className="section-tag">
        <span className="pip" />
        <span>{slides[idx].section}</span>
      </div>

      {/* Deck */}
      <div className="deck">
        {slides.map((s, i) => (
          <section
            key={i}
            className={`slide${i === active ? " active" : ""}${exitingRef.current === i ? " exiting" : ""}`}
            data-section={s.section}
          >
            {slideContent[i]}
          </section>
        ))}
      </div>

      {/* Menu overlay */}
      <div
        className={`menu-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`menu-panel${menuOpen ? " open" : ""}`} role="dialog" aria-label="Slide navigation">
        <div className="menu-header">
          <h3>Jump to slide</h3>
          <div className="menu-meta">{curr} / {total}</div>
        </div>
        <div className="menu-list">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`menu-item${i === idx ? " current" : ""}`}
              onClick={() => { go(i); setMenuOpen(false); }}
            >
              <span className="mi-num">{String(i + 1).padStart(2, "0")}</span>
              <div style={{ flex: 1 }}>
                <div className="mi-label">{s.section}</div>
                {s.sub && <div className="mi-sub">{s.sub}</div>}
              </div>
              <span className="mi-arr">→</span>
            </div>
          ))}
        </div>
        <div className="menu-footer">
          <span>Press <kbd>M</kbd> to toggle</span>
          <span><kbd>←</kbd><kbd>→</kbd> navigate</span>
        </div>
      </div>

      {/* Nav */}
      <div className="nav">
        <button onClick={() => go(idx - 1)} aria-label="Previous slide">←</button>
        <button
          className={`menu-btn${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Open slide menu"
        >
          <span className="icon"><i /><i /><i /></span>
        </button>
        <div className="counter">{curr} / {total}</div>
        <button onClick={() => go(idx + 1)} aria-label="Next slide">→</button>
      </div>
    </>
  );
}
