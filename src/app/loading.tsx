/**
 * Route-level skeleton, shown while the page streams in. Mirrors the real
 * layout — status badge, headline, rotator line, CTAs, stat row, then a
 * 3-card project band — as flat pulsing hairline blocks (blueprint system).
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading page">
      {/* Hero skeleton */}
      <div className="container-page py-[clamp(3rem,1.5rem+4vw,5.5rem)]">
        <div className="max-w-[64rem]">
          {/* Status badge */}
          <div className="skeleton skeleton--bar h-6 w-72 mb-8" />

          {/* Headline — two structural lines */}
          <div className="skeleton skeleton--bar h-[clamp(2.5rem,1rem+4.4vw,4.8rem)] w-full max-w-[56rem] mb-3" />
          <div className="skeleton skeleton--bar h-[clamp(2.5rem,1rem+4.4vw,4.8rem)] w-3/4 max-w-[42rem] mb-8" />

          {/* Rotator line */}
          <div className="skeleton skeleton--bar h-5 w-64 mb-8" />

          {/* CTA pair */}
          <div className="flex items-center gap-4 mb-12">
            <div className="skeleton h-[57px] w-[172px]" />
            <div className="skeleton skeleton--bar h-4 w-28" />
          </div>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[62rem]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      </div>

      {/* Projects band skeleton */}
      <div className="section-alt">
        <div className="container-page section-pad">
          <div className="skeleton skeleton--bar h-4 w-32 mb-4" />
          <div className="skeleton skeleton--bar h-12 w-80 mb-10" />
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton h-96" style={{ animationDelay: `${i * 0.12}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
