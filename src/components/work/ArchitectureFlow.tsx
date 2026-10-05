import Image from "next/image";
import type { CaseStudy } from "@/data/work";

/**
 * The project's data path, source to decision, as an ordered list. Each
 * stage is taken from the build description, so the diagram is a faithful
 * summary of the architecture rather than an illustration of one.
 *
 * When an anonymised screenshot exists for the project it is shown instead
 * on the card (the flow still appears on the case-study page).
 */
export function ArchitectureFlow({
  study,
  large = false,
  id,
}: {
  study: CaseStudy;
  large?: boolean;
  id?: string;
}) {
  return (
    <figure className="m-0" aria-labelledby={id}>
      <ol className={`flow${large ? " is-large" : ""}`}>
        {study.flow.map((step) => (
          <li key={step.stage} className={`flow-step${step.output ? " is-output" : ""}`}>
            <span className="flow-stage">{step.stage}</span>
            <span className="flow-detail">{step.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption id={id} className="flow-caption small">
        Architecture, from source to decision
      </figcaption>
    </figure>
  );
}

export function WorkVisual({ study }: { study: CaseStudy }) {
  if (study.image) {
    return (
      <figure className="m-0">
        <Image
          src={study.image.src}
          alt={study.image.alt}
          width={study.image.width}
          height={study.image.height}
          sizes="(min-width: 960px) 460px, 100vw"
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="flow-caption small">Anonymised view</figcaption>
      </figure>
    );
  }
  return <ArchitectureFlow study={study} id={`flow-${study.slug}`} />;
}
