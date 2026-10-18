/* Shared helpers for presenting case-study results. */

/* Lead technology for each case study, for its mark. No screenshots exist
   yet, so covers show the project's real headline result instead. */
export const leadOf: Record<string, string> = {
  "fabric-lakehouse-migration": "Microsoft Fabric",
  "seller-analytics-platform": "Power BI",
  "manufacturing-analytics-suite": "Power BI",
  "real-time-fraud-monitoring": "Databricks",
  "sales-intelligence-platform": "Databricks",
  "customer-churn-platform": "Snowflake",
};

/* Turns a headline result into an after/before ratio for the before/after
   bars, straight from its own figures: "12% → <1%" is 1/12, "4 hrs → 15 min"
   is 15/240, "−70%" is 30/100. Anything else gets no chart. */
const toMinutes = (n: number, unit = "") => (/^hr/.test(unit) ? n * 60 : n);
export function ratioOf(value: string): number | null {
  const v = value.replace(/−/g, "-").trim();
  const ft = v.match(/^([\d.]+)\s*(%|hrs?|min)?\s*→\s*<?\s*([\d.]+)\s*(%|hrs?|min)?$/);
  if (ft) {
    const from = toMinutes(parseFloat(ft[1]), ft[2]);
    const to = toMinutes(parseFloat(ft[3]), ft[4] ?? ft[2]);
    return from > 0 ? to / from : null;
  }
  const cut = v.match(/^-([\d.]+)%$/);
  return cut ? 1 - parseFloat(cut[1]) / 100 : null;
}
