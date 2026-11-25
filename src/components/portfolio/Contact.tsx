import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { ResumeLink } from "./ResumeLink";
import { profile } from "@/lib/portfolio-data";
import { Monogram, socialLinks } from "./BrandIcons";
import { RevealLine, SectionMarker, ease } from "./Section";

function IndiaClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span>{time ?? "--:--"} IST</span>;
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden pt-28 md:pt-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-electric/10 via-violet/5 to-transparent" />
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-60 mask-fade-b" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionMarker index="06" label="Contact" />

        <h2 className="mt-12 font-display text-[clamp(2.8rem,8.5vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
          <RevealLine>Have a challenging idea?</RevealLine>
          <RevealLine delay={0.12}>
            <span className="font-serif font-normal italic text-electric-gradient">Let's engineer it.</span>
          </RevealLine>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="mt-16 grid gap-4 lg:grid-cols-12"
        >
          {/* Email block */}
          <div className="surface-card group relative overflow-hidden rounded-[28px] p-7 md:p-10 lg:col-span-7">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-electric/20 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-50" />
            <p className="eyebrow relative">Write to me</p>
            <a
              href={`mailto:${profile.email}`}
              className="relative mt-6 block break-all font-display text-[clamp(1.4rem,3.4vw,2.6rem)] font-medium tracking-tight"
            >
              <span className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {profile.email}
              </span>
            </a>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-shadow hover:shadow-glow"
              >
                <Mail className="h-4 w-4" /> Send an email
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-electric/50"
                aria-live="polite"
              >
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied to clipboard" : "Copy address"}
              </button>
              <ResumeLink
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-electric/50"
              >
                <Download className="h-4 w-4" /> Resume
              </ResumeLink>
            </div>
          </div>

          {/* Social rows */}
          <ul className="surface-card flex flex-col rounded-[28px] p-3 lg:col-span-5">
            {socialLinks.map(({ key, label, Icon }) => (
              <li key={key} className="flex-1">
                <a
                  href={profile.links[key]}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full items-center gap-5 rounded-2xl px-5 py-5 transition-colors duration-300 hover:bg-surface-raised"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background/60 transition-colors group-hover:border-electric/40">
                    <Icon size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-medium tracking-tight">{label}</span>
                    <span className="block font-mono text-[11px] text-muted-foreground">
                      {profile.links[key].replace(/^https?:\/\/(www\.)?/, "")}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative mt-28 border-t border-border">
        <div aria-hidden className="pointer-events-none overflow-hidden">
          <p className="select-none whitespace-nowrap text-center font-display text-[12.5vw] font-bold leading-[0.85] tracking-[-0.07em] text-foreground/[0.04]">
            RITESH RANKA
          </p>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-8 md:flex-row md:items-center lg:px-10">
          <div className="flex items-center gap-3">
            <Monogram size={30} className="text-foreground" />
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ritesh Ranka. Designed & engineered with care.</p>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" /> India · <IndiaClock />
            </span>
            <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
