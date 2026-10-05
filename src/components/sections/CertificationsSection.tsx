import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { allCredentials, flagshipCredentials } from "@/data/credentials";

/**
 * Six flagship credentials as cards; the full register lives on
 * /certifications. Status is not shown because it has not been re-checked:
 * the card states when each was earned, which is verifiable.
 */
export function CertificationsSection() {
  const issuers = new Set(allCredentials.map((c) => c.issuer)).size;

  return (
    <section id="certifications" className="section" aria-labelledby="certs-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="certs-title" className="section-title">Certifications</h2>
          <p className="lead">
            {allCredentials.length} certifications from {issuers} vendors. These six matter most for
            Power BI and Fabric work.
          </p>
        </header>

        <ul className="cert-grid list-none m-0 p-0">
          {flagshipCredentials.map((c) => (
            <li key={c.code} className="card cert-card reveal">
              <span className="label">{c.issuer}</span>
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
            View all {allCredentials.length} certifications <ArrowRight size={16} className="arrow" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
