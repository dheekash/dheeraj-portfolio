import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { allCredentials, flagshipCredentials } from "@/data/credentials";
import { Mark } from "@/components/common/Mark";

/* The product each credential certifies, for its mark. */
const productOf: Record<string, string> = {
  "PL-300": "Power BI",
  "DP-600": "Microsoft Fabric",
  "DP-700": "Microsoft Fabric",
  "AZ-104": "Azure",
  "DE-A": "Databricks",
  SnowPro: "Snowflake",
};

/**
 * Six flagship credentials as cards; the full register lives on
 * /certifications. Status is not shown because it has not been re-checked:
 * the card states when each was earned, which is verifiable.
 */
export function CertificationsSection() {
  const issuers = new Set(allCredentials.map((c) => c.issuer)).size;

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

        <ul className="cert-grid list-none m-0 p-0">
          {flagshipCredentials.map((c) => (
            <li key={c.code} className="card cert-card reveal" data-product={productOf[c.code]?.toLowerCase().replace(/ /g, "-")}>
              <span className="cert-top">
                <span className="label">{c.issuer}</span>
                {productOf[c.code] && (
                  <span className="cert-mark" title={productOf[c.code]}>
                    <Mark name={productOf[c.code]} size={22} />
                  </span>
                )}
              </span>
              <span className="cert-name">{c.name}</span>
              <div className="cert-meta">
                <span className="small">
                  <span className="cert-code" translate="no">{c.code}</span> · Earned {c.earned}
                </span>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    Exam details <ArrowUpRight size={14} className="arrow-out" aria-hidden />
                    <span className="sr-only">for {c.code} {c.name} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="after-grid reveal">
          <Link href="/certifications" className="link-arrow">
            View all {allCredentials.length} credentials <ArrowRight size={16} className="arrow" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
