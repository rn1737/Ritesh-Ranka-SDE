import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Binary,
  Boxes,
  Brain,
  Database,
  GitBranch,
  Layers,
  MessageSquareCode,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
  Workflow,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { skillGroups, type Tech } from "@/lib/portfolio-data";
import { RevealLine, SectionMarker, ease } from "./Section";
import { cn } from "@/lib/utils";

const glyphs: Record<NonNullable<Tech["glyph"]>, LucideIcon> = {
  sql: Database,
  rest: Network,
  ai: Sparkles,
  vector: Layers,
  embed: Binary,
  prompt: MessageSquareCode,
  micro: Boxes,
  event: Radio,
  design: Workflow,
  concurrency: Cpu,
  monitor: Activity,
  cicd: GitBranch,
  shield: ShieldCheck,
  dsa: Brain,
};

function TechTile({ tech, i }: { tech: Tech; i: number }) {
  const Glyph = tech.glyph ? glyphs[tech.glyph] : null;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease, delay: i * 0.04 }}
      className="group relative"
    >
      <div className="surface-card relative flex h-full flex-col items-start gap-6 overflow-hidden rounded-2xl p-5 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-electric/35">
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-electric/0 blur-2xl transition-colors duration-500 group-hover:bg-electric/25" />
        {tech.logo ? (
          <div className="plate flex h-14 w-14 items-center justify-center rounded-xl p-2.5 transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-105">
            <img src={tech.logo} alt={`${tech.name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" />
          </div>
        ) : (
          Glyph && (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface-raised text-electric transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-105">
              <Glyph className="h-6 w-6" strokeWidth={1.5} />
            </div>
          )
        )}
        <p className="text-sm font-medium leading-tight">{tech.name}</p>
      </div>
    </motion.li>
  );
}

export function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0]!.id);
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0]!;
  const activeIndex = skillGroups.indexOf(active);

  return (
    <section id="skills" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-40 mask-radial" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionMarker index="04" label="Engineering Toolkit" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
              <RevealLine>An ecosystem,</RevealLine>
              <RevealLine delay={0.1}>
                <span className="font-serif font-normal italic text-electric-gradient">not a checklist.</span>
              </RevealLine>
            </h2>

            <div role="tablist" aria-label="Skill categories" className="mt-12 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible">
              {skillGroups.map((g, i) => {
                const isActive = g.id === activeId;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls="skills-panel"
                    onClick={() => setActiveId(g.id)}
                    onMouseEnter={() => setActiveId(g.id)}
                    className={cn(
                      "group relative flex shrink-0 items-center gap-4 rounded-full border px-4 py-2 text-left transition-colors duration-300 lg:rounded-none lg:border-0 lg:border-b lg:px-0 lg:py-4",
                      isActive ? "border-electric/40 text-foreground" : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="hidden font-mono text-[11px] lg:inline">0{i + 1}</span>
                    <span className="whitespace-nowrap text-sm lg:font-display lg:text-xl lg:font-medium lg:tracking-tight">{g.title}</span>
                    <span className="ml-auto hidden font-mono text-[11px] lg:inline">{g.items.length}</span>
                    {isActive && (
                      <motion.span
                        layoutId="skill-indicator"
                        className="absolute bottom-[-1px] left-0 hidden h-px w-full bg-electric-gradient lg:block"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="skills-panel" role="tabpanel" className="min-w-0 lg:col-span-7">
            <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-border pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <p className="font-display text-2xl font-medium tracking-tight">{active.title}</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">{active.blurb}</p>
                </motion.div>
              </AnimatePresence>
              <span className="font-display text-6xl font-semibold tracking-tighter text-foreground/10">0{activeIndex + 1}</span>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {active.items.map((t, i) => (
                  <TechTile key={`${active.id}-${t.name}`} tech={t} i={i} />
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
