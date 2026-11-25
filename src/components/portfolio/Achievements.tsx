import { motion } from "framer-motion";
import { achievements, type Achievement } from "@/lib/portfolio-data";
import { RevealLine, SectionMarker, ease } from "./Section";
import { cn } from "@/lib/utils";

const tierStyle: Record<Achievement["tier"], { text: string; ring: string; glow: string }> = {
  gold: { text: "text-gold", ring: "border-gold/40", glow: "bg-gold/20" },
  silver: { text: "text-silver", ring: "border-silver/40", glow: "bg-silver/15" },
  electric: { text: "text-electric", ring: "border-electric/40", glow: "bg-electric/20" },
  violet: { text: "text-violet", ring: "border-violet/40", glow: "bg-violet/20" },
};

const spans = ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-8"];

function Medal({ tier }: { tier: Achievement["tier"] }) {
  const t = tierStyle[tier];
  return (
    <div className={cn("relative flex h-14 w-14 items-center justify-center rounded-full border", t.ring)}>
      <div className={cn("absolute inset-0 rounded-full blur-xl", t.glow)} />
      <svg viewBox="0 0 40 40" className={cn("relative h-8 w-8 animate-spin-slow", t.text)} aria-hidden>
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1="20" y1="2" x2="20" y2={i % 6 === 0 ? 8 : 5} stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 15} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <SectionMarker index="05" label="Achievements" className="justify-center" />
          <h2 className="mx-auto mt-10 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            <RevealLine>Proof in</RevealLine>
            <RevealLine delay={0.1}>
              <span className="font-serif font-normal italic text-gradient">the numbers.</span>
            </RevealLine>
          </h2>
        </div>

        <ul className="mt-20 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-8">
          {achievements.map((a, i) => {
            const t = tierStyle[a.tier];
            const hero = i === 0;
            const wide = i === achievements.length - 1;
            return (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease, delay: (i % 3) * 0.08 }}
                className={cn("group", spans[i])}
              >
                <div className="surface-card relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-7 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-foreground/15">
                  <div className={cn("pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl opacity-40 transition-opacity duration-700 group-hover:opacity-80", t.glow)} />
                  {hero && <div className="pointer-events-none absolute inset-0 tech-grid-fine opacity-50 mask-fade-b" />}
                  <div className="relative flex items-start justify-between">
                    <Medal tier={a.tier} />
                    <span className="font-mono text-[11px] text-muted-foreground">#{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={cn("relative mt-10", wide && "md:mt-6 md:flex md:items-end md:gap-10")}>
                    <p
                      className={cn(
                        "font-display font-semibold leading-none tracking-[-0.05em]",
                        hero ? "text-[clamp(5rem,12vw,10rem)] text-electric-gradient" : cn(wide ? "text-6xl md:text-8xl" : "text-5xl md:text-6xl", t.text),
                      )}
                    >
                      {a.value}
                    </p>
                    <div className={cn(wide && "md:pb-1")}>
                      <p className={cn("mt-4 font-medium", hero ? "text-2xl" : "text-lg")}>{a.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
