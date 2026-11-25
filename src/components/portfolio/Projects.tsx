import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { GithubIcon } from "./BrandIcons";
import { PayflowVisual, SmartJobVisual } from "./ProjectVisuals";
import { RevealLine, SectionMarker, ease } from "./Section";
import { cn } from "@/lib/utils";

function Showcase({ project, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [explore, setExplore] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const numY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const isPay = project.id === "payflow";

  return (
    <div ref={ref} className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <motion.span
        style={{ y: numY }}
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-16 select-none font-display text-[16rem] font-bold leading-none tracking-[-0.06em] text-foreground/[0.03] lg:text-[22rem]",
          flip ? "left-0" : "right-0",
        )}
      >
        {project.index}
      </motion.span>

      {/* Visual */}
      <motion.div
        style={{ y }}
        className={cn("relative lg:col-span-7", flip && "lg:order-2")}
      >
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10% round 32px)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease }}
          whileHover={{ scale: 1.01 }}
          data-cursor="hover"
          className="group relative aspect-[16/11] overflow-hidden rounded-[32px] border border-border bg-surface"
        >
          <div className="absolute inset-0 tech-grid-fine opacity-60" />
          <div
            className={cn(
              "absolute -inset-20 opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40",
              isPay ? "bg-[radial-gradient(circle_at_30%_40%,var(--electric),transparent_55%)]" : "bg-[radial-gradient(circle_at_70%_40%,var(--violet),transparent_55%)]",
            )}
          />
          <div className="absolute inset-0 p-6 md:p-10">{isPay ? <PayflowVisual /> : <SmartJobVisual />}</div>
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> {isPay ? "transaction flow" : "recommendation flow"}
          </div>
        </motion.div>
      </motion.div>

      {/* Copy */}
      <div className={cn("relative lg:col-span-5", flip && "lg:order-1")}>
        <p className="font-mono text-xs text-electric">Project {project.index}</p>
        <h3 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
          <RevealLine>{project.name}</RevealLine>
        </h3>
        <p className="mt-2 font-serif text-2xl italic text-muted-foreground">{project.tagline}</p>
        <p className="mt-6 leading-relaxed text-muted-foreground">{project.description}</p>

        <dl className="mt-8 grid grid-cols-3 divide-x divide-border border-y border-border">
          {project.highlights.map((h) => (
            <div key={h.label} className="px-4 py-4 first:pl-0">
              <dd className="font-display text-2xl font-semibold tracking-tight">{h.value}</dd>
              <dt className="mt-1 text-[11px] leading-snug text-muted-foreground">{h.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-foreground/75">
              {s}
            </span>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {explore && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden"
            >
              <li className="pt-6 eyebrow">Engineering highlights</li>
              {project.details.map((d, i) => (
                <li key={d} className="flex gap-3 border-b border-border py-3 text-sm text-foreground/85">
                  <span className="font-mono text-[11px] text-electric">0{i + 1}</span>
                  {d}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setExplore((e) => !e)}
            aria-expanded={explore}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-shadow hover:shadow-glow"
          >
            {explore ? "Close details" : "Explore Project"}
            <Plus className={cn("h-4 w-4 transition-transform duration-300", explore && "rotate-45")} />
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-electric/50"
          >
            <GithubIcon size={15} /> View on GitHub
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionMarker index="03" label="Selected Projects" />
            <h2 className="mt-10 font-display text-[clamp(2.6rem,6.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              <RevealLine>Engineered,</RevealLine>
              <RevealLine delay={0.1}>
                <span className="font-serif font-normal italic text-gradient">end to end.</span>
              </RevealLine>
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground">
            Two systems designed from the ground up — one moves money, the other matches people with opportunity.
          </p>
        </div>

        <div className="mt-24 space-y-32 md:space-y-48">
          {projects.map((p, i) => (
            <Showcase key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
