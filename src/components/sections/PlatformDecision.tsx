"use client";

import { useState } from "react";

type Platform = "Microsoft Fabric" | "Databricks" | "Snowflake";
const PLATFORMS: Platform[] = ["Microsoft Fabric", "Databricks", "Snowflake"];

/* Each question is one of the "reach for it when" / "skip it when" rows in
   the comparison below, phrased as a yes/no. A yes moves the platforms by
   the weights shown, and the matching row is quoted back as the reason. */
const questions: {
  id: string;
  q: string;
  effects: { p: Platform; w: number; why: string }[];
}[] = [
  {
    id: "msft",
    q: "Microsoft-first, with Power BI as the main BI tool?",
    effects: [{ p: "Microsoft Fabric", w: 2, why: "Microsoft-first, and Power BI is the primary BI tool" }],
  },
  {
    id: "licensed",
    q: "Fabric capacity already licensed?",
    effects: [
      { p: "Microsoft Fabric", w: 1, why: "Budget is already allocated to Fabric capacity" },
      { p: "Snowflake", w: -2, why: "Fabric is already licensed, so OneLake overlaps" },
    ],
  },
  {
    id: "ml",
    q: "ML and feature engineering are first-class?",
    effects: [
      { p: "Databricks", w: 2, why: "ML, feature engineering and MLflow are first-class" },
      { p: "Microsoft Fabric", w: -1, why: "Heavy Python/Spark ML workflows need MLflow parity" },
    ],
  },
  {
    id: "multicloud",
    q: "Multi-cloud or non-Azure storage requirement?",
    effects: [
      { p: "Snowflake", w: 2, why: "Multi-cloud requirement (AWS, Azure, GCP)" },
      { p: "Databricks", w: 1, why: "Unity Catalog governance across multiple clouds" },
      { p: "Microsoft Fabric", w: -2, why: "A multi-cloud or non-Azure mandate rules it out" },
    ],
  },
  {
    id: "sql",
    q: "SQL-first team, with dbt for transformation?",
    effects: [{ p: "Snowflake", w: 2, why: "SQL-first team with dbt as the transformation layer" }],
  },
  {
    id: "stream",
    q: "Real-time streaming is a core requirement?",
    effects: [{ p: "Snowflake", w: -2, why: "Skip it when real-time streaming is core" }],
  },
];

export function PlatformDecision() {
  const [yes, setYes] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setYes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const score = Object.fromEntries(PLATFORMS.map((p) => [p, 0])) as Record<Platform, number>;
  const reasons: Record<Platform, { why: string; positive: boolean }[]> = {
    "Microsoft Fabric": [],
    Databricks: [],
    Snowflake: [],
  };
  questions
    .filter((q) => yes.has(q.id))
    .forEach((q) =>
      q.effects.forEach((e) => {
        score[e.p] += e.w;
        reasons[e.p].push({ why: e.why, positive: e.w > 0 });
      })
    );

  const best = Math.max(...PLATFORMS.map((p) => score[p]));
  const leaders = yes.size ? PLATFORMS.filter((p) => score[p] === best && best > 0) : [];

  return (
    <div className="decision card">
      <fieldset className="decision-q">
        <legend className="label">Answer for your project</legend>
        <div className="decision-options">
          {questions.map((q) => (
            <button
              key={q.id}
              type="button"
              className="decision-toggle"
              aria-pressed={yes.has(q.id)}
              onClick={() => toggle(q.id)}
            >
              <span className="dt-box" aria-hidden />
              {q.q}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="decision-out" aria-live="polite">
        <span className="label">Where I would start</span>
        {leaders.length === 0 ? (
          <p className="decision-empty">
            {yes.size === 0
              ? "Select what applies. With nothing else to go on, I start with the simplest platform that meets the requirements."
              : "No clear winner on these answers. This is a conversation about cost, skills and existing contracts."}
          </p>
        ) : (
          <>
            <p className="decision-pick">{leaders.join(" or ")}</p>
            <ul className="decision-why">
              {leaders.flatMap((p) =>
                reasons[p].map((r) => (
                  <li key={p + r.why} className={r.positive ? "is-for" : "is-against"}>
                    <span className="sr-only">{r.positive ? "For: " : "Against: "}</span>
                    {r.why}
                  </li>
                ))
              )}
            </ul>
          </>
        )}
        <dl className="decision-scores" aria-label="Scores">
          {PLATFORMS.map((p) => (
            <div key={p}>
              <dt>{p}</dt>
              <dd className="num">{score[p] > 0 ? `+${score[p]}` : score[p]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
