import Image from "next/image";
import type { CaseStudy } from "@/data/work";

/**
 * A project's data path, source to decision, drawn as connected boxes.
 * Every node and caption comes from the build description in
 * src/data/work.ts, so the diagram summarises the real architecture.
 *
 * Lays out horizontally when its container is wide and vertically when it
 * is narrow (container query), so the same markup serves the featured
 * card, the case-study page and phones.
 */
export function ArchitectureDiagram({ study, caption = true }: { study: CaseStudy; caption?: boolean }) {
  return (
    <figure className="arch m-0">
      <ol className="arch-flow" aria-label={`${study.title} architecture, from source to decision`}>
        {study.flow.map((step) => (
          <li key={step.stage} data-stage={step.stage.toLowerCase().replace(/ /g, "-")} className={`arch-node${step.output ? " is-output" : ""}`}>
            {/* Skip the stage label or detail when it would only repeat the node name. */}
            {step.stage.toLowerCase() !== step.node.toLowerCase() && <span className="arch-stage">{step.stage}</span>}
            <span className="arch-name">{step.node}</span>
            {step.detail.toLowerCase() !== step.node.toLowerCase() && <span className="arch-detail">{step.detail}</span>}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="flow-caption small">Architecture, from source to decision</figcaption>}
    </figure>
  );
}

/** Compact one-line version for smaller project cards. */
export function NodeChain({ study }: { study: CaseStudy }) {
  return (
    <ol className="chain" aria-label={`Architecture: ${study.flow.map((f) => f.node).join(", then ")}`}>
      {study.flow.map((step) => (
        <li key={step.stage} className={step.output ? "is-output" : undefined} aria-hidden>
          {step.node}
        </li>
      ))}
    </ol>
  );
}

/** Vertical list version, used on the case-study page beside the prose. */
export function ArchitectureFlow({ study }: { study: CaseStudy }) {
  return (
    <figure className="m-0">
      <ol className="flow is-large">
        {study.flow.map((step) => (
          <li key={step.stage} className={`flow-step${step.output ? " is-output" : ""}`}>
            <span className="flow-stage">{step.stage}</span>
            <span className="flow-detail">{step.detail}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function WorkImage({ study }: { study: CaseStudy }) {
  if (!study.image) return null;
  return (
    <figure className="m-0">
      <Image
        src={study.image.src}
        alt={study.image.alt}
        width={study.image.width}
        height={study.image.height}
        sizes="(min-width: 960px) 640px, 100vw"
        className="w-full h-auto rounded-lg border border-border"
      />
      <figcaption className="flow-caption small">Anonymised view</figcaption>
    </figure>
  );
}
