type Issuer = "Microsoft" | "Snowflake" | "Databricks";

interface Cert {
  name: string;
  code: string;
  issuer: Issuer;
  date: string;
  featured?: boolean;
  verifyUrl?: string;
}

const certGroups: { category: string; color: string; certs: Cert[] }[] = [
  {
    category: "Power BI",
    color: "rgba(21,145,220,0.12)",
    certs: [
      { name: "Power BI Data Analyst",    code: "PL-300", issuer: "Microsoft", date: "Sep 2021", featured: true, verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/" },
      { name: "Power Platform Fundamentals", code: "PL-900", issuer: "Microsoft", date: "Aug 2021", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/" },
    ],
  },
  {
    category: "Microsoft Fabric",
    color: "rgba(124,58,237,0.1)",
    certs: [
      { name: "Fabric Analytics Engineer", code: "DP-600", issuer: "Microsoft", date: "Dec 2024", featured: true, verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/" },
      { name: "Fabric Data Engineer",      code: "DP-700", issuer: "Microsoft", date: "Jun 2025", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/" },
    ],
  },
  {
    category: "Azure",
    color: "rgba(8,145,178,0.1)",
    certs: [
      { name: "Azure Administrator",   code: "AZ-104", issuer: "Microsoft", date: "Dec 2021", featured: true, verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/" },
      { name: "Azure Fundamentals",    code: "AZ-900", issuer: "Microsoft", date: "Dec 2021", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/" },
      { name: "Azure AI Fundamentals", code: "AI-900", issuer: "Microsoft", date: "Sep 2021", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/" },
    ],
  },
  {
    category: "Data & AI",
    color: "rgba(217,119,6,0.1)",
    certs: [
      { name: "Azure Data Scientist",             code: "DP-100", issuer: "Microsoft", date: "Feb 2023", featured: true, verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/" },
      { name: "Azure Data Fundamentals",          code: "DP-900", issuer: "Microsoft", date: "Feb 2022", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/" },
      { name: "Security, Compliance & Identity",  code: "SC-900", issuer: "Microsoft", date: "Feb 2022", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/" },
      { name: "Microsoft 365 Fundamentals",       code: "MS-900", issuer: "Microsoft", date: "Dec 2021", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/" },
    ],
  },
  {
    category: "Platform Engineering",
    color: "rgba(5,150,105,0.1)",
    certs: [
      { name: "SnowPro Associate: Core", code: "SnowPro", issuer: "Snowflake",  date: "Jan 2026", verifyUrl: "https://learn.snowflake.com/en/certifications/" },
      { name: "Data Engineer Associate", code: "DE-A",    issuer: "Databricks", date: "May 2026", verifyUrl: "https://www.databricks.com/learn/certification/data-engineer-associate" },
    ],
  },
];

/**
 * Certifications as a register.
 *
 * Previously four of these were flip cards whose code, date and verify link
 * only appeared on hover, so touch users could not reach them at all. Every
 * field is now visible in one table, grouped by area. Role-critical
 * credentials are set in a heavier weight rather than tagged, and issuer is
 * plain text: brand-coloured logos were the only colour in the section and
 * they meant nothing about the credential.
 */
export function CertificationsSection() {
  const all = certGroups.flatMap((g) => g.certs);
  const count = (i: Issuer) => all.filter((c) => c.issuer === i).length;

  return (
    <section id="certifications">
      <div className="container-page section-pad">
        <div className="max-w-[60ch] mb-[clamp(1.75rem,3vw,2.75rem)]">
          <h2 className="mb-3">Certifications</h2>
          <p className="text-muted-foreground text-[1.0625rem] leading-relaxed">
            {all.length} certifications across 5 years, each earned while actively shipping the
            technology it covers: {count("Microsoft")} from Microsoft, {count("Snowflake")} from
            Snowflake and {count("Databricks")} from Databricks.
          </p>
        </div>

        <table className="cert-table">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Certification</th>
              <th scope="col" className="cert-col-issuer">Issuer</th>
              <th scope="col">Earned</th>
              <th scope="col"><span className="sr-only">Verification</span></th>
            </tr>
          </thead>
          {certGroups.map((g) => (
            <tbody key={g.category}>
              <tr className="cert-group">
                <th scope="rowgroup" colSpan={5}>{g.category}</th>
              </tr>
              {g.certs.map((c) => (
                <tr key={c.code} className={c.featured ? "is-core" : undefined}>
                  <td className="cert-code" translate="no">{c.code}</td>
                  <th scope="row" className="cert-name">{c.name}</th>
                  <td className="cert-col-issuer cert-issuer" translate="no">{c.issuer}</td>
                  <td className="cert-date">{c.date}</td>
                  <td className="cert-verify">
                    {c.verifyUrl && (
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify ${c.code} ${c.name} (opens in a new tab)`}
                      >
                        Verify
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}
