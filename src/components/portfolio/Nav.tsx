import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems, profile } from "@/lib/portfolio-data";
import { Monogram, socialLinks } from "./BrandIcons";
import { cn } from "@/lib/utils";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);
  return active;
}

const ids = navItems.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className={cn(
            "glass flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-3 pr-2 transition-all duration-500",
            scrolled ? "shadow-glow" : "border-transparent bg-transparent backdrop-blur-none",
          )}
        >
          <a href="#top" className="flex items-center gap-3 rounded-full pr-2" aria-label="Ritesh Ranka — back to top">
            <Monogram size={34} className="text-foreground" />
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">Ritesh Ranka</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-border bg-surface-raised"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Let's talk <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-raised lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-background/95 px-6 pb-10 pt-6 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="absolute inset-0 -z-10 tech-grid opacity-50" />
            <div className="flex items-center justify-between">
              <Monogram size={36} className="text-foreground" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-raised"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="mt-14 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      window.setTimeout(() => {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        history.replaceState(null, "", `#${item.id}`);
                      }, 60);
                    }}
                    className="flex items-baseline gap-4 border-b border-border py-4 font-display text-4xl font-medium tracking-tight"
                  >
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <span className={active === item.id ? "text-electric-gradient" : ""}>{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex items-center gap-3">
              {socialLinks.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={profile.links[key]}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-raised"
                >
                  <Icon size={18} />
                </a>
              ))}
              <a href={`mailto:${profile.email}`} className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
