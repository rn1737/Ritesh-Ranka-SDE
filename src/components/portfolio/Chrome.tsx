import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";

/** Branded intro. Pure CSS animation so it always clears, even without JS. */
export function Loader() {
  return (
    <div
      aria-hidden
      className="loader-screen fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
    >
      <svg width="96" height="96" viewBox="0 0 40 40" fill="none" className="text-foreground">
        <defs>
          <linearGradient id="rr-load" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--electric)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="11" stroke="url(#rr-load)" strokeWidth="1" className="loader-stroke" />
        <path
          d="M10 29V11h6.2a4.4 4.4 0 0 1 0 8.8H10m6.2 0L21 29M20 29V11h6.2a4.4 4.4 0 0 1 0 8.8H20m6.2 0L31 29"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="loader-stroke"
        />
      </svg>
      <div className="h-px w-40 overflow-hidden bg-border">
        <div className="loader-bar h-full w-full bg-electric-gradient" />
      </div>
      <p className="eyebrow">Initializing systems</p>
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-electric-gradient"
    />
  );
}

/** Ambient engineering grid + light fields behind the whole page. */
export function BackgroundGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 tech-grid animate-grid-drift mask-radial opacity-70" />
      <div className="absolute -left-[20%] -top-[30%] h-[70vh] w-[70vw] rounded-full bg-electric/10 blur-[140px]" />
      <div className="absolute -right-[15%] top-[30%] h-[60vh] w-[50vw] rounded-full bg-violet/10 blur-[140px]" />
      <div className="absolute bottom-[-30%] left-[20%] h-[50vh] w-[60vw] rounded-full bg-electric/5 blur-[160px]" />
    </div>
  );
}

/** Desktop-only precision cursor: a dot plus a lagging ring that grows over interactive elements. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [role='button'], [data-cursor='hover']")));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-foreground"
      />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 1 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-[89] -ml-4 -mt-4 h-8 w-8 rounded-full border border-electric/70 bg-electric/5 backdrop-blur-[1px]"
      />
    </>
  );
}
