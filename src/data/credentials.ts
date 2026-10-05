export type Issuer = "Microsoft" | "Snowflake" | "Databricks";

export interface Credential {
  name: string;
  code: string;
  issuer: Issuer;
  /** Month and year earned. Current status is not shown: it has not been
      re-checked, and Microsoft associate certifications lapse yearly
      unless renewed. */
  earned: string;
  /** Flagship credentials shown on the home page, in display order. */
  flagship?: number;
  /** The exam's public page. Not a personal credential record. */
  url?: string;
}

export const credentialGroups: { category: string; items: Credential[] }[] = [
  {
    category: "Microsoft Fabric",
    items: [
      { name: "Fabric Analytics Engineer Associate", code: "DP-600", issuer: "Microsoft", earned: "Dec 2024", flagship: 2, url: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/" },
      { name: "Fabric Data Engineer Associate", code: "DP-700", issuer: "Microsoft", earned: "Jun 2025", flagship: 3, url: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/" },
    ],
  },
  {
    category: "Power BI",
    items: [
      { name: "Power BI Data Analyst Associate", code: "PL-300", issuer: "Microsoft", earned: "Sep 2021", flagship: 1, url: "https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/" },
      { name: "Power Platform Fundamentals", code: "PL-900", issuer: "Microsoft", earned: "Aug 2021", url: "https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/" },
    ],
  },
  {
    category: "Data platforms",
    items: [
      { name: "Data Engineer Associate", code: "DE-A", issuer: "Databricks", earned: "May 2026", flagship: 5, url: "https://www.databricks.com/learn/certification/data-engineer-associate" },
      { name: "SnowPro Associate: Core", code: "SnowPro", issuer: "Snowflake", earned: "Jan 2026", flagship: 6, url: "https://learn.snowflake.com/en/certifications/" },
    ],
  },
  {
    category: "Azure",
    items: [
      { name: "Azure Administrator Associate", code: "AZ-104", issuer: "Microsoft", earned: "Dec 2021", flagship: 4, url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/" },
      { name: "Azure Fundamentals", code: "AZ-900", issuer: "Microsoft", earned: "Dec 2021", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/" },
      { name: "Azure AI Fundamentals", code: "AI-900", issuer: "Microsoft", earned: "Sep 2021", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/" },
    ],
  },
  {
    category: "Data & AI",
    items: [
      { name: "Azure Data Scientist Associate", code: "DP-100", issuer: "Microsoft", earned: "Feb 2023", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/" },
      { name: "Azure Data Fundamentals", code: "DP-900", issuer: "Microsoft", earned: "Feb 2022", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/" },
      { name: "Security, Compliance & Identity Fundamentals", code: "SC-900", issuer: "Microsoft", earned: "Feb 2022", url: "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/" },
      { name: "Microsoft 365 Fundamentals", code: "MS-900", issuer: "Microsoft", earned: "Dec 2021", url: "https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/" },
    ],
  },
];

export const allCredentials = credentialGroups.flatMap((g) => g.items);

export const flagshipCredentials = allCredentials
  .filter((c) => c.flagship)
  .sort((a, b) => (a.flagship ?? 0) - (b.flagship ?? 0));
