import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { allCredentials, flagshipCredentials } from "@/data/credentials";
import { Mark } from "@/components/common/Mark";

/* The product each credential certifies, for its mark and colour. */
const productOf: Record<string, { name: string; colour: string }> = {
  "PL-300": { name: "Power BI", colour: "#E6AD10" },
  "DP-600": { name: "Microsoft Fabric", colour: "#1B8A7A" },
  "DP-700": { name: "Microsoft Fabric", colour: "#1B8A7A" },
  "AZ-104": { name: "Azure", colour: "#0A7BD6" },
  "DE-A": { name: "Databricks", colour: "#FF3621" },
  SnowPro: { name: "Snowflake", colour: "#29B5E8" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "Sep 2021" as a month count, for ordering and spotting gaps. */
const monthIndex = (earned: string) => {
  const [m, y] = earned.split(" ");
  return Number(y) * 12 + MONTHS.indexOf(m);
};

/**
 * The six flagship credentials as a learning timeline, earliest first.
 * Stops are evenly spaced, not to scale; each carries its own date, and a
 * break on the line marks a gap of more than a year. The full register
 * lives on /certifications. Status is not shown because it has not been
 * re-checked: each stop states when it was earned, which is verifiable.
 */
export function CertificationsSection() {
  const issuers = new Set(allCredentials.map((c) => c.issuer)).size;
  const timeline = [...flagshipCredentials].sort((a, b) => monthIndex(a.earned) - monthIndex(b.earned));

  return (
    <section id="certifications" className="section sx" aria-labelledby="certs-title">
      <div className="container">
        <header className="sx-head reveal">
          <p className="sx-eyebrow">Credentials</p>
          <h2 id="certs-title" className="sx-title">
            Certifications<span className="sx-dot">.</span>
          </h2>
          <p className="sx-intro">
            {allCredentials.length} certifications from {issuers} vendors. These six matter most for
            Power BI and Fabric work.
          </p>
        </header>

        <ol className="ct reveal" aria-label="Key certifications, earliest first">
          {timeline.map((c, i) => {
            const product = productOf[c.code];
            const gap = i > 0 && monthIndex(c.earned) - monthIndex(timeline[i - 1].earned) > 12;
            return (
              <li
                key={c.code}
                className="ct-item"
                style={{ "--n": i, "--cert": product?.colour } as React.CSSProperties}
              >
                {gap && <span className="ct-break" aria-hidden />}
                <p className="ct-date">{c.earned}</p>
                <span className="ct-dot" aria-hidden />
                {product && (
                  <span className="ct-mark" title={product.name}>
                    <Mark name={product.name} size={28} />
                  </span>
                )}
                <p className="ct-code" translate="no">{c.code}</p>
                <h3 className="ct-name">{c.name}</h3>
                <p className="ct-issuer">{c.issuer}</p>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="ct-link">
                    Exam details <ArrowUpRight size={14} aria-hidden />
                    <span className="sr-only">for {c.code} {c.name} (opens in a new tab)</span>
                  </a>
                )}
              </li>
            );
          })}
        </ol>

        <div className="after-grid reveal">
          <Link href="/certifications" className="link-arrow">
            View all {allCredentials.length} credentials <ArrowRight size={16} className="arrow" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
