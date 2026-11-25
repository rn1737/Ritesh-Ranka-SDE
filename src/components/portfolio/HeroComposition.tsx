import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

const nodes = [
  { x: 60, y: 70, r: 5 },
  { x: 190, y: 40, r: 7 },
  { x: 320, y: 95, r: 5 },
  { x: 120, y: 190, r: 9 },
  { x: 260, y: 210, r: 6 },
  { x: 370, y: 250, r: 5 },
  { x: 70, y: 320, r: 6 },
  { x: 200, y: 330, r: 7 },
  { x: 330, y: 360, r: 5 },
];
const edges: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5], [3, 6], [3, 7], [4, 7], [5, 8], [7, 8], [6, 7],
];

function Layer({
  depth,
  mx,
  my,
  className,
  children,
}: {
  depth: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth * 28);
  const y = useTransform(my, (v) => v * depth * 28);
  return (
    <motion.div style={{ x, y, translateZ: depth * 60 }} className={className}>
      {children}
    </motion.div>
  );
}

function CodeCard({ title, lines, className }: { title: string; lines: React.ReactNode[]; className?: string }) {
  return (
    <div className={`glass rounded-xl p-3.5 font-mono text-[10.5px] leading-relaxed shadow-glow ${className ?? ""}`}>
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
        <span className="ml-2 text-[9.5px] text-muted-foreground">{title}</span>
      </div>
      {lines.map((l, i) => (
        <div key={i} className="whitespace-nowrap text-foreground/85">
          {l}
        </div>
      ))}
    </div>
  );
}

/** Interactive engineering composition: tilted architecture grid, live node graph, floating code. */
export function HeroComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [-1, 1], [-14, 14]);
  const rotateX = useTransform(sy, [-1, 1], [12, -12]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const k = "text-violet";
  const s = "text-cyan";
  const c = "text-muted-foreground";

  return (
    <div ref={ref} className="relative h-full w-full [perspective:1400px]" aria-hidden>
      <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
        {/* Architectural floor grid */}
        <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(62deg)_translateZ(-140px)]">
          <div className="h-full w-full tech-grid mask-radial opacity-90" />
        </div>

        {/* Glow core */}
        <Layer depth={-0.4} mx={sx} my={sy} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-72 w-72 rounded-full bg-electric-gradient opacity-30 blur-[80px]" />
        </Layer>

        {/* Orbit rings */}
        <Layer depth={0.1} mx={sx} my={sy} className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[78%] w-[78%] animate-spin-slow rounded-full border border-dashed border-electric/20">
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-electric shadow-glow" />
          </div>
          <div className="absolute h-[54%] w-[54%] rounded-full border border-violet/20 [animation-direction:reverse] animate-spin-slow">
            <span className="absolute bottom-0 left-[15%] h-1.5 w-1.5 rounded-full bg-violet" />
          </div>
        </Layer>

        {/* Node graph */}
        <Layer depth={0.35} mx={sx} my={sy} className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 430 400" className="h-[82%] w-[82%] overflow-visible">
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--electric)" stopOpacity="0.7" />
                <stop offset="1" stopColor="var(--violet)" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="node">
                <stop offset="0" stopColor="var(--foreground)" />
                <stop offset="1" stopColor="var(--electric)" />
              </radialGradient>
            </defs>
            {edges.map(([a, b], i) => {
              const A = nodes[a]!;
              const B = nodes[b]!;
              return (
                <g key={i}>
                  <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="url(#edge)" strokeWidth="0.8" strokeOpacity="0.45" />
                  <line
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke="var(--cyan)"
                    strokeWidth="1.4"
                    strokeDasharray="6 194"
                    className="animate-dash"
                    style={{ animationDelay: `${i * -0.45}s`, animationDuration: `${4 + (i % 4)}s` }}
                  />
                </g>
              );
            })}
            {nodes.map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r={n.r * 2.4} fill="var(--electric)" opacity="0.08" />
                <circle cx={n.x} cy={n.y} r={n.r} fill="url(#node)" />
              </g>
            ))}
          </svg>
        </Layer>

        {/* Wireframe cube */}
        <Layer depth={0.8} mx={sx} my={sy} className="absolute right-[8%] top-[10%]">
          <div className="relative h-16 w-16 animate-cube [transform-style:preserve-3d]">
            {[
              "rotateY(0deg) translateZ(32px)",
              "rotateY(90deg) translateZ(32px)",
              "rotateY(180deg) translateZ(32px)",
              "rotateY(-90deg) translateZ(32px)",
              "rotateX(90deg) translateZ(32px)",
              "rotateX(-90deg) translateZ(32px)",
            ].map((t) => (
              <div key={t} className="absolute inset-0 border border-electric/60 bg-electric/5" style={{ transform: t }} />
            ))}
          </div>
        </Layer>

        {/* Floating code fragments */}
        <Layer depth={1} mx={sx} my={sy} className="absolute left-[2%] top-[14%]">
          <div className="animate-float" style={{ animationDelay: "-1s" }}>
            <CodeCard
              title="PaymentConsumer.java"
              lines={[
                <><span className={k}>@KafkaListener</span>(topics = <span className={s}>"payments"</span>)</>,
                <><span className={k}>public void</span> process(Txn txn) {"{"}</>,
                <>&nbsp;&nbsp;ledger.commit(txn);</>,
                <>{"}"}</>,
              ]}
            />
          </div>
        </Layer>

        <Layer depth={1.3} mx={sx} my={sy} className="absolute bottom-[12%] right-[0%]">
          <div className="animate-float" style={{ animationDelay: "-3.5s" }}>
            <CodeCard
              title="assistant.query()"
              lines={[
                <><span className={c}>// retrieve → augment → generate</span></>,
                <><span className={k}>const</span> ctx = <span className={k}>await</span> vectors.search(q);</>,
                <><span className={k}>return</span> llm.answer(q, ctx);</>,
              ]}
            />
          </div>
        </Layer>

        <Layer depth={1.6} mx={sx} my={sy} className="absolute bottom-[30%] left-[6%]">
          <div className="animate-float glass rounded-lg px-3 py-2 font-mono text-[10.5px]" style={{ animationDelay: "-2s" }}>
            <span className="text-success">●</span> p95 latency <span className="text-foreground">↓ 30%</span>
          </div>
        </Layer>

        <Layer depth={1.2} mx={sx} my={sy} className="absolute right-[18%] top-[42%]">
          <div className="animate-float glass rounded-lg px-3 py-2 font-mono text-[10.5px]" style={{ animationDelay: "-5s" }}>
            delivery <span className="text-electric-gradient">99.9%</span>
          </div>
        </Layer>
      </motion.div>
    </div>
  );
}
