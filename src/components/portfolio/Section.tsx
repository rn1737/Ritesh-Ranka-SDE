import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Masked line reveal used for editorial headlines. */
export function RevealLine({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.span
      className={cn("block overflow-hidden pb-[0.08em]", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section index marker: "02 — Experience" with a drawn hairline. */
export function SectionMarker({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-xs text-electric">{index}</span>
      <motion.span
        className="h-px w-16 origin-left bg-electric-gradient"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
