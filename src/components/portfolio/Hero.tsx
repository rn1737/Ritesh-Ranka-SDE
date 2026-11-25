import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import { ResumeLink } from "./ResumeLink";
import { profile } from "@/lib/portfolio-data";
import { socialLinks } from "./BrandIcons";
import { HeroComposition } from "./HeroComposition";
import { ease } from "./Section";

const words = ["Building", "the", "Systems", "Behind", "Tomorrow."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 lg:pt-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:px-10">
        <motion.div style={{ y, opacity }} className="relative z-10 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease }}
            className="mb-8 flex flex-wrap items-center gap-4"
          >
            <span className="eyebrow text-foreground/80">Software Engineer / India</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs text-success">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
              Available for opportunities
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.9rem,6.9vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
            {words.map((w, i) => (
              <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span
                  className={
                    w === "Tomorrow."
                      ? "inline-block font-serif font-normal italic tracking-[-0.02em] text-electric-gradient pr-[0.05em]"
                      : "inline-block"
                  }
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease, delay: 1.3 + i * 0.08 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.75, ease }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I'm <span className="text-foreground">Ritesh Ranka</span> — a Software Engineer focused on scalable backend
            systems, distributed architecture and intelligent AI-powered applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.9, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#experience"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:gap-3 hover:shadow-glow"
            >
              Explore My Work
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
            </a>
            <ResumeLink
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors duration-300 hover:border-electric/50"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </ResumeLink>
            <div className="ml-1 flex items-center gap-1">
              {socialLinks.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={profile.links[key]}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-raised hover:text-foreground"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: visualY, scale: visualScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.6 }}
          className="relative h-[380px] sm:h-[460px] lg:col-span-5 lg:h-[600px]"
        >
          <HeroComposition />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 right-10 hidden flex-col items-center gap-2 md:flex">
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-border">
          <motion.span
            className="block h-1/2 w-full bg-electric-gradient"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
