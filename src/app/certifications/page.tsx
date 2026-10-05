import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { allCredentials, credentialGroups } from "@/data/credentials";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "All 13 certifications held by Dheeraj Kashyap across Microsoft Fabric, Power BI, Azure, Snowflake and Databricks.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <div className="container" style={{ paddingBlock: "var(--section-y)" }}>
      <Link href="/#certifications" className="link-arrow cs-back">
        <ArrowLeft size={16} aria-hidden /> Back to home
      </Link>
      <header className="section-head">
        <h1 className="display-2">All certifications</h1>
        <p className="lead">
          {allCredentials.length} certifications from Microsoft, Snowflake and Databricks, grouped by
          area, with the month each was earned.
        </p>
      </header>

      <table className="register">
        <caption className="sr-only">Certifications by area</caption>
        <thead>
          <tr>
            <th scope="col" className="label">Code</th>
            <th scope="col" className="label">Certification</th>
            <th scope="col" className="label r-hide-sm">Issuer</th>
            <th scope="col" className="label">Earned</th>
            <th scope="col"><span className="sr-only">Exam page</span></th>
          </tr>
        </thead>
        {credentialGroups.map((g) => (
          <tbody key={g.category}>
            <tr className="group">
              <th scope="rowgroup" colSpan={5}>{g.category}</th>
            </tr>
            {g.items.map((c) => (
              <tr key={c.code}>
                <td className="r-code" translate="no">{c.code}</td>
                <th scope="row" className="r-name" style={{ fontWeight: c.flagship ? 600 : 400 }}>{c.name}</th>
                <td className="r-muted r-hide-sm" translate="no">{c.issuer}</td>
                <td className="r-muted">{c.earned}</td>
                <td className="r-link">
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      Exam details<span className="sr-only"> for {c.code} (opens in a new tab)</span>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
