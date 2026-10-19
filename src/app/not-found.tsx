import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "@/data/work";
import { TriangleField } from "@/components/common/TriangleField";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="nf-title">
      {/* Void only: a drifting constellation in the empty half of the page */}
      <TriangleField seed={404} count={150} width={640} height={560} className="nf-tf" />
      <div className="container nf-inner">
        <p className="sx-eyebrow">Error 404</p>
        <h1 id="nf-title" className="sx-title nf-title">
          This page doesn&rsquo;t exist<span className="sx-dot">.</span>
        </h1>
        <p className="sx-intro">
          The link may be old or mistyped. Head back to the home page, or open one of the case
          studies below.
        </p>
        <p className="nf-actions">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={16} aria-hidden /> Back to home
          </Link>
          <Link href="/#contact" className="btn btn-secondary">Contact me</Link>
        </p>
        <ul className="nf-links">
          {caseStudies.map((s) => (
            <li key={s.slug}>
              <Link href={`/work/${s.slug}`} className="inline-link">{s.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
