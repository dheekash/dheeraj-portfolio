"use client";

import { motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { useState } from "react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* Countries where Dheeraj has delivered work */
const ACTIVE_MARKETS = [
  { name: "United Kingdom", coords: [-1.5, 52.5] as [number,number], key: "UK"  },
  { name: "Germany",        coords: [10.4, 51.2] as [number,number], key: "DE"  },
  { name: "France",         coords: [2.2,  46.2] as [number,number], key: "FR"  },
  { name: "Italy",          coords: [12.6, 42.8] as [number,number], key: "IT"  },
  { name: "Spain",          coords: [-3.7, 40.4] as [number,number], key: "ES"  },
  { name: "Netherlands",    coords: [5.3,  52.3] as [number,number], key: "NL"  },
  { name: "Sweden",         coords: [15.0, 62.0] as [number,number], key: "SE"  },
  { name: "Poland",         coords: [19.1, 52.1] as [number,number], key: "PL"  },
];

/* ISO numeric IDs of the active countries for fill */
const ACTIVE_ISO: Record<string, boolean> = {
  "826": true, // UK
  "276": true, // Germany
  "250": true, // France
  "380": true, // Italy
  "724": true, // Spain
  "528": true, // Netherlands
  "752": true, // Sweden
  "616": true, // Poland
};

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function GlobalFootprintSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative section-padding overflow-hidden">
      {/* dark wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/[0.06] to-transparent pointer-events-none" />
      {/* glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.6), transparent 70%)" }} />

      <div className="container-max">
        {/* Header */}
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 font-mono">Global Analytics Footprint</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Analytics Delivered Across <span className="gradient-text">8 Markets</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Enterprise reporting and BI solutions deployed across Europe — supporting teams in the UK, Germany, France, Italy, Spain, the Netherlands, Sweden, and Poland.
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" as const }}
            className="glass-card glass-highlight rounded-2xl border border-blue-500/15 overflow-hidden relative"
            style={{ minHeight: 360 }}
          >
            {/* scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
              }} />

            <ComposableMap
              projection="geoAzimuthalEqualArea"
              projectionConfig={{ rotate: [-15, -52, 0], scale: 820 }}
              style={{ width: "100%", height: "100%", minHeight: 360 }}
            >
              <ZoomableGroup zoom={1} center={[0, 0]} disablePanning>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isActive = ACTIVE_ISO[geo.id as string];
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isActive ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.04)"}
                          stroke={isActive ? "rgba(96,165,250,0.6)" : "rgba(255,255,255,0.06)"}
                          strokeWidth={isActive ? 1.2 : 0.5}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              fill: isActive ? "rgba(59,130,246,0.55)" : "rgba(255,255,255,0.06)",
                              outline: "none",
                            },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Country markers */}
                {ACTIVE_MARKETS.map((m, i) => (
                  <Marker key={m.key} coordinates={m.coords}>
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
                      onMouseEnter={() => setHovered(m.name)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* pulse ring */}
                      <motion.circle
                        r={12} fill="rgba(59,130,246,0.15)" stroke="rgba(96,165,250,0.4)" strokeWidth={1}
                        animate={{ r: [8, 14, 8], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                      {/* center dot */}
                      <circle r={4} fill="#3B82F6" stroke="rgba(255,255,255,0.8)" strokeWidth={1.5}
                        style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.8))" }} />
                      {/* label */}
                      {hovered === m.name && (
                        <g transform="translate(6, -14)">
                          <rect x={-2} y={-12} width={m.name.length * 5.5 + 8} height={16} rx={4}
                            fill="rgba(10,14,30,0.92)" stroke="rgba(59,130,246,0.4)" strokeWidth={0.8} />
                          <text x={m.name.length * 2.75 + 2} textAnchor="middle" y={-2}
                            fill="white" fontSize={9} fontFamily="monospace" fontWeight="600">
                            {m.name}
                          </text>
                        </g>
                      )}
                    </motion.g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </motion.div>

          {/* Market list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
            className="flex flex-col gap-3 lg:min-w-[220px]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground/60 mb-1">Active Markets</p>
            {ACTIVE_MARKETS.map((m, i) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.4, ease: "easeOut" as const }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-blue-500/15 glass-card group cursor-default transition-all hover:-translate-x-1"
                onMouseEnter={() => setHovered(m.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ borderColor: hovered === m.name ? "rgba(59,130,246,0.4)" : undefined }}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"
                  style={{ boxShadow: "0 0 6px rgba(59,130,246,0.7)" }} />
                <span className="text-sm font-semibold text-foreground">{m.name}</span>
                <span className="ml-auto text-xs font-mono text-muted-foreground/50">{m.key}</span>
              </motion.div>
            ))}

            {/* Summary stat */}
            <div className="mt-2 px-4 py-3 rounded-xl border border-blue-500/20 glass-card text-center">
              <div className="text-2xl font-extrabold gradient-text">8+</div>
              <div className="text-xs text-muted-foreground mt-0.5">Countries</div>
            </div>
          </motion.div>
        </div>

        {/* Context note */}
        <motion.p
          {...fadeUp(0.5)}
          className="mt-8 text-sm text-muted-foreground/60 text-center font-mono"
        >
          Multi-market reporting delivered at Amazon EU · Real-time analytics across 8 regional operations
        </motion.p>
      </div>
    </section>
  );
}
