import { motion } from "framer-motion";
import { experiences, profile } from "@/lib/portfolio-data";
import { FadeUp, RevealLine, SectionMarker, ease } from "./Section";

const terminalLines = [
  { prompt: "$", text: "whoami", tone: "text-foreground" },
  { prompt: "→", text: "ritesh_ranka · software engineer", tone: "text-muted-foreground" },
  { prompt: "$", text: "cat mindset.txt", tone: "text-foreground" },
  { prompt: "›", text: "Building scalable systems.", tone: "text-cyan" },
  { prompt: "›", text: "Solving complex problems.", tone: "text-electric" },
  { prompt: "›", text: "Exploring intelligent technology.", tone: "text-violet" },
];

const journey = [...experiences].reverse();

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionMarker index="01" label="About" />

        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.4rem,5.6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
              <RevealLine>Not Just Writing Code.</RevealLine>
              <RevealLine delay={0.1} className="font-serif font-normal italic tracking-[-0.01em] text-gradient">
                Engineering Impact.
              </RevealLine>
            </h2>

            <FadeUp delay={0.2} className="mt-10 grid gap-6 text-muted-foreground sm:grid-cols-2">
              <p className="leading-relaxed">
                I build the infrastructure people don't see but always feel — services that stay fast under load,
                pipelines that don't drop messages, and AI that turns thousands of documents into answers.
              </p>
              <p className="leading-relaxed">
                A Computer Science graduate from SRM IST ({profile.education.cgpa} CGPA), I care about clean architecture,
                measurable performance and shipping systems that hold up in production.
              </p>
            </FadeUp>

            {/* Journey strip */}
            <FadeUp delay={0.3} className="mt-14">
              <p className="eyebrow mb-5">The journey so far</p>
              <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
                {journey.map((exp, i) => (
                  <li key={exp.id} className="group relative">
                    <div className="surface-card flex h-full flex-col gap-4 rounded-2xl p-4 transition-colors duration-300 group-hover:border-electric/40">
                      <div className="plate flex h-12 items-center justify-center rounded-xl px-3">
                        <img src={exp.logoUrl} alt={exp.logoAlt} className="max-h-6 max-w-full object-contain" loading="lazy" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-muted-foreground">0{i + 1} · {exp.period.split(" – ")[0]}</p>
                        <p className="mt-1 text-sm font-medium leading-tight">{exp.company}</p>
                      </div>
                    </div>
                    {i < journey.length - 1 && (
                      <span className="absolute -right-2.5 top-1/2 z-10 hidden h-px w-2 bg-electric/60 sm:block" />
                    )}
                  </li>
                ))}
              </ol>
            </FadeUp>
          </div>

          <div className="relative lg:col-span-5">
            {/* Portrait with technical annotations */}
            <motion.figure
              initial={{ opacity: 0, clipPath: "inset(12% 12% 12% 12% round 28px)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.2, ease }}
              className="relative mx-auto max-w-sm overflow-hidden rounded-[28px] border border-border lg:ml-auto"
            >
              <img
                src={profile.portraitUrl}
                alt="Portrait of Ritesh Ranka"
                className="aspect-[4/5] w-full object-cover object-top saturate-[0.85]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 tech-grid-fine opacity-40 mix-blend-overlay" />
              {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((c) => (
                <span key={c} className={`absolute h-5 w-5 border-electric/70 ${c}`} />
              ))}
              <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <p className="font-display text-xl font-semibold">Ritesh Ranka</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Software Engineer</p>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">IN · 2026</span>
              </figcaption>
            </motion.figure>

            {/* Terminal */}
            <FadeUp delay={0.25} className="relative z-10 -mt-16 mr-auto w-[92%] max-w-sm lg:-ml-16">
              <div className="glass overflow-hidden rounded-2xl shadow-glow">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  <span className="ml-3 font-mono text-[10px] text-muted-foreground">~/ritesh — zsh</span>
                </div>
                <div className="space-y-1.5 p-4 font-mono text-[12.5px]">
                  {terminalLines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.28, duration: 0.4 }}
                      className={line.tone}
                    >
                      <span className="mr-2 text-muted-foreground">{line.prompt}</span>
                      {line.text}
                    </motion.p>
                  ))}
                  <p className="text-foreground">
                    <span className="mr-2 text-muted-foreground">$</span>
                    <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-electric" />
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
