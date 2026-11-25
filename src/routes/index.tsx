import { createFileRoute } from "@tanstack/react-router";
import { BackgroundGrid, Cursor, Loader, ScrollProgress } from "@/components/portfolio/Chrome";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";

const title = "Ritesh Ranka — Software Engineer | Backend, Distributed Systems & AI";
const description =
  "Portfolio of Ritesh Ranka, Software Engineer at JLL Technologies building scalable backend systems, distributed architecture and AI-powered applications.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

const marquee = [
  "Distributed Systems",
  "Spring Boot Microservices",
  "Event-Driven Architecture",
  "Retrieval-Augmented Generation",
  "Kafka Pipelines",
  "System Design",
  "Cloud & DevOps",
  "Performance Engineering",
];

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-border py-6">
      <div className="flex w-max animate-marquee gap-12">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-medium tracking-tight text-foreground/30 md:text-3xl">
            {m}
            <span className="h-1.5 w-1.5 rounded-full bg-electric-gradient" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Cursor />
      <BackgroundGrid />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
