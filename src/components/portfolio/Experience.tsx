import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences, type BrandTone, type Experience as Exp } from "@/lib/portfolio-data";
import { RevealLine, SectionMarker, ease } from "./Section";
import { cn } from "@/lib/utils";

const tone: Record<BrandTone, { glow: string; ring: string; text: string; line: string; chip: string }> = {
  jll: {
    glow: "bg-brand-jll/30",
    ring: "border-brand-jll/50",
    text: "text-brand-jll",
    line: "from-brand-jll/70",
    chip: "border-brand-jll/30 bg-brand-jll/10",
  },
  bluecoin: {
    glow: "bg-brand-bluecoin/25",
    ring: "border-brand-bluecoin/45",
    text: "text-brand-bluecoin",
    line: "from-brand-bluecoin/70",
    chip: "border-brand-bluecoin/30 bg-brand-bluecoin/10",
  },
  mercor: {
    glow: "bg-brand-mercor/15",
    ring: "border-brand-mercor/35",
    text: "text-brand-mercor",
    line: "from-brand-mercor/60",
    chip: "border-brand-mercor/25 bg-brand-mercor/5",
  },
  hcl: {
    glow: "bg-brand-hcl/30",
    ring: "border-brand-hcl/50",
    text: "text-brand-hcl",
    line: "from-brand-hcl/70",
    chip: "border-brand-hcl/30 bg-brand-hcl/10",
  },
};

function LogoPlate({ exp, large }: { exp: Exp; large?: boolean }) {
  const t = tone[exp.tone];
  return (
    <div className="relative">
      <div className={cn("absolute -inset-3 rounded-[26px] blur-2xl", t.glow)} />
      <div className={cn("relative rounded-[22px] border p-1.5", t.ring)}>
        <div
          className={cn(
            "plate flex items-center justify-center rounded-[16px]",
            large ? "h-28 w-full px-8 lg:h-32" : "h-20 w-full px-6",
          )}
        >
          {exp.logoKind === "mark" ? (
            <div className="flex items-center gap-3">
              <img src={exp.logoUrl} alt={exp.logoAlt} className={large ? "h-11" : "h-8"} loading="lazy" />
              <span className="font-display text-xl font-semibold tracking-[0.18em] text-plate-foreground">MERCOR</span>
            </div>
          ) : (
            <img
              src={exp.logoUrl}
              alt={exp.logoAlt}
              loading="lazy"
              className={cn("w-auto object-contain", large ? "max-h-14" : "max-h-9", exp.tone === "bluecoin" && "max-h-10")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: Exp; index: number }) {
  const t = tone[exp.tone];
  const flagship = Boolean(exp.current);
  const [first, ...rest] = exp.highlights;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease }}
      className="relative grid gap-6 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-12"
    >
      {/* Timeline node + logo */}
      <div className="relative md:sticky md:top-28 md:self-start">
        <span
          className={cn(
            "absolute -left-[41px] top-9 hidden h-3 w-3 rounded-full border-2 bg-background md:block",
            t.ring,
          )}
        />
        <LogoPlate exp={exp} large={flagship} />
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
        </p>
      </div>

      <div
        tabIndex={flagship ? undefined : 0}
        className={cn(
          "group surface-card relative overflow-hidden rounded-[28px] p-7 transition-all duration-500 md:p-9",
          !flagship && "pb-14 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric/50",
          flagship && "md:p-11",
          "hover:border-foreground/15",
        )}
      >
        <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent", t.line)} />
        <div
          className={cn(
            "pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100",
            t.glow,
            flagship && "opacity-70",
          )}
        />
        {flagship && <div className="pointer-events-none absolute inset-0 tech-grid-fine opacity-40 mask-fade-b" />}

        <div className="relative h-full">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
            {exp.current && (
              <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px]", t.chip, t.text)}>
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" /> Current role
              </span>
            )}
          </div>
          <h3 className={cn("mt-4 font-display font-semibold tracking-[-0.03em]", flagship ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl")}>
            {exp.company}
          </h3>
          <p className={cn("mt-1 text-sm font-medium", t.text)}>{exp.role}</p>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{exp.summary}</p>

          <dl className={cn("mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border", flagship ? "md:grid-cols-4" : "lg:grid-cols-4")}>
            {exp.metrics.map((m) => (
              <div key={m.label} className="bg-card/95 p-4">
                <dt className="sr-only">{m.label}</dt>
                <dd className={cn("font-display font-semibold tracking-tight", flagship ? "text-3xl" : "text-2xl")}>{m.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{m.label}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-foreground/85">
            <li className="flex gap-3">
              <span className={cn("mt-2.5 h-1 w-3 shrink-0 rounded-full bg-current", t.text)} />
              {first}
            </li>
          </ul>

          <div
            className={cn(
              "relative transition-all duration-700 ease-out",
              !flagship &&
                "opacity-30 blur-[3px] group-hover:opacity-100 group-hover:blur-0 group-focus-within:opacity-100 group-focus-within:blur-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:blur-0",
            )}
          >
            <ul className="space-y-3 pt-3 text-[15px] leading-relaxed text-foreground/85">
              {rest.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className={cn("mt-2.5 h-1 w-3 shrink-0 rounded-full bg-current", t.text)} />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">
              {exp.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-surface-raised px-3 py-1 font-mono text-[11px] text-foreground/80 transition-colors duration-300 hover:border-electric/40"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          {!flagship && (
            <p
              aria-hidden
              className="pointer-events-none absolute -bottom-8 left-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-opacity duration-500 group-hover:opacity-0 [@media(hover:none)]:hidden"
            >
              Hover to reveal contributions & stack
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <SectionMarker index="02" label="Experience" />
            <h2 className="mt-10 font-display text-[clamp(2.6rem,6.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              <RevealLine>A career built on</RevealLine>
              <RevealLine delay={0.1}>
                <span className="font-serif font-normal italic text-electric-gradient">systems</span> that scale.
              </RevealLine>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground md:col-span-4 md:justify-self-end">
            Four chapters across enterprise platforms, IoT infrastructure, AI evaluation and property technology.
          </p>
        </div>

        <div ref={ref} className="relative mt-20 md:pl-10">
          <div className="absolute bottom-0 left-[5px] top-0 hidden w-px bg-border md:block" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-[5px] top-0 hidden w-px origin-top bg-gradient-to-b from-electric via-violet to-electric md:block"
          />
          <div className="space-y-20 md:space-y-28">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
