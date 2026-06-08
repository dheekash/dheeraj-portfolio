"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Node definitions ── */
interface Node {
  id: string; label: string; color: string; size: number;
  x: number; y: number; category: string;
}

interface Edge { from: string; to: string }

const NODES: Node[] = [
  // Core — center
  { id: "powerbi",  label: "Power BI",    color: "#F2C811", size: 52, x: 50,  y: 50, category: "BI" },
  // Data engineering ring
  { id: "sql",      label: "SQL",         color: "#29B5E8", size: 42, x: 22,  y: 28, category: "Lang" },
  { id: "python",   label: "Python",      color: "#4B8BBE", size: 40, x: 78,  y: 28, category: "Lang" },
  { id: "pyspark",  label: "PySpark",     color: "#E25A1C", size: 34, x: 88,  y: 50, category: "Eng" },
  { id: "dbt",      label: "dbt",         color: "#FF694B", size: 34, x: 75,  y: 73, category: "Eng" },
  { id: "adf",      label: "ADF",         color: "#0067C0", size: 34, x: 26,  y: 73, category: "Eng" },
  { id: "kql",      label: "KQL",         color: "#8B5CF6", size: 30, x: 12,  y: 50, category: "Lang" },
  // Cloud/platform outer ring
  { id: "fabric",   label: "Fabric",      color: "#0067C0", size: 44, x: 50,  y: 12, category: "Cloud" },
  { id: "snowflake",label: "Snowflake",   color: "#29B5E8", size: 40, x: 90,  y: 18, category: "Cloud" },
  { id: "databricks",label: "Databricks", color: "#FF3621", size: 38, x: 90,  y: 82, category: "Cloud" },
  { id: "azure",    label: "Azure",       color: "#0067C0", size: 36, x: 50,  y: 88, category: "Cloud" },
  { id: "deltalake",label: "Delta Lake",  color: "#00ADD8", size: 30, x: 10,  y: 82, category: "Cloud" },
  { id: "onelake",  label: "OneLake",     color: "#0067C0", size: 28, x: 10,  y: 18, category: "Cloud" },
  // BI tools
  { id: "dax",      label: "DAX",         color: "#F2C811", size: 32, x: 64,  y: 50, category: "BI" },
  { id: "zebrabi",  label: "Zebra BI",    color: "#FF7043", size: 28, x: 36,  y: 50, category: "BI" },
  { id: "grafana",  label: "Grafana",     color: "#F46800", size: 28, x: 50,  y: 68, category: "BI" },
];

const EDGES: Edge[] = [
  // Power BI centre connections
  { from: "powerbi",   to: "dax"        },
  { from: "powerbi",   to: "sql"        },
  { from: "powerbi",   to: "fabric"     },
  { from: "powerbi",   to: "snowflake"  },
  { from: "powerbi",   to: "zebrabi"    },
  { from: "powerbi",   to: "grafana"    },
  // Engineering pipeline
  { from: "sql",       to: "adf"        },
  { from: "python",    to: "pyspark"    },
  { from: "pyspark",   to: "databricks" },
  { from: "adf",       to: "fabric"     },
  { from: "adf",       to: "azure"      },
  { from: "dbt",       to: "snowflake"  },
  { from: "dbt",       to: "databricks" },
  { from: "kql",       to: "azure"      },
  // Cloud connections
  { from: "fabric",    to: "onelake"    },
  { from: "fabric",    to: "deltalake"  },
  { from: "databricks",to: "deltalake"  },
  { from: "snowflake", to: "python"     },
  { from: "azure",     to: "adf"        },
];

function getNode(id: string) { return NODES.find(n => n.id === id)!; }

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function SkillNetworkSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isActive = (nodeId: string) => {
    if (!hovered) return true;
    if (hovered === nodeId) return true;
    return EDGES.some(e => (e.from === hovered && e.to === nodeId) || (e.to === hovered && e.from === nodeId));
  };

  const isEdgeActive = (edge: Edge) => {
    if (!hovered) return true;
    return edge.from === hovered || edge.to === hovered;
  };

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500 font-mono">Technical Stack</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Connected <span className="gradient-text">Skill Network</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Every tool connected to deliver the full pipeline — from raw data to executive insight. Hover a node to explore.
        </motion.p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="glass-card glass-highlight rounded-2xl border border-white/[0.08] overflow-hidden relative"
          style={{ paddingBottom: "clamp(340px, 56%, 580px)" }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
            style={{ overflow: "visible" }}
          >
            {/* Edges */}
            {EDGES.map((edge, i) => {
              const a = getNode(edge.from);
              const b = getNode(edge.to);
              if (!a || !b) return null;
              const active = isEdgeActive(edge);
              return (
                <motion.line
                  key={`${edge.from}-${edge.to}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={active ? (hovered ? a.color : "rgba(99,102,241,0.35)") : "rgba(255,255,255,0.04)"}
                  strokeWidth={active ? (hovered ? 0.45 : 0.3) : 0.2}
                  strokeDasharray="0.8 0.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={visible ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.4, delay: 0.3 + i * 0.04, ease: "easeOut" as const }}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const active = isActive(node.id);
              const isCenter = node.id === "powerbi";
              return (
                <motion.g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={visible ? { opacity: active ? 1 : 0.2, scale: 1 } : {}}
                  transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.5, delay: 0.5 + i * 0.06, type: "spring", stiffness: 200 }
                  }}
                >
                  {/* Pulse ring for center node */}
                  {isCenter && (
                    <motion.circle
                      r={node.size / 10 + 2}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="0.3"
                      opacity={0.4}
                      animate={{ r: [node.size / 10 + 2, node.size / 10 + 5, node.size / 10 + 2], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  )}
                  {/* Glow bg */}
                  <circle
                    r={node.size / 10 + 0.5}
                    fill={node.color}
                    opacity={0.12}
                  />
                  {/* Main circle */}
                  <circle
                    r={node.size / 10}
                    fill={`${node.color}22`}
                    stroke={node.color}
                    strokeWidth={hovered === node.id ? 0.6 : 0.35}
                    style={{ filter: hovered === node.id ? `drop-shadow(0 0 3px ${node.color})` : undefined }}
                  />
                  {/* Label */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={node.color}
                    fontSize={node.size > 40 ? "2.2" : node.size > 34 ? "1.9" : "1.7"}
                    fontFamily="system-ui, sans-serif"
                    fontWeight="700"
                  >
                    {node.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* Legend */}
        <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mt-6 justify-center">
          {[
            { label: "BI & Visualisation",  color: "#F2C811" },
            { label: "Languages",           color: "#29B5E8" },
            { label: "Data Engineering",    color: "#FF694B" },
            { label: "Cloud & Platforms",   color: "#0067C0" },
          ].map(c => (
            <div key={c.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              <span className="text-xs text-muted-foreground font-medium">{c.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
