import jllLogo from "@/assets/logos/jll.svg.asset.json";
import bluecoinLogo from "@/assets/logos/bluecoin.svg.asset.json";
import mercorLogo from "@/assets/logos/mercor.svg.asset.json";
import hclLogo from "@/assets/logos/hcltech.svg.asset.json";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import portraitAsset from "@/assets/ritesh-portrait.webp.asset.json";

export const profile = {
  name: "Ritesh Ranka",
  role: "Software Engineer",
  email: "riteshranka2003@gmail.com",
  resumeUrl: resumeAsset.url,
  resumeFileName: "Ritesh_Ranka_Software_Engineer.pdf",
  portraitUrl: portraitAsset.url,
  links: {
    github: "https://github.com/rn1737",
    linkedin: "https://www.linkedin.com/in/ritesh-ranka-19836b236",
    leetcode: "https://leetcode.com/u/rn3144",
  },
  education: {
    school: "SRM Institute of Science and Technology, Chennai",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Sep 2021 – Jun 2025",
    cgpa: "8.5/10",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Distributed Systems",
      "Cloud Computing",
      "DBMS",
      "OOP",
    ],
  },
} as const;

export type BrandTone = "jll" | "bluecoin" | "mercor" | "hcl";

export interface Experience {
  id: string;
  company: string;
  shortName: string;
  logoUrl: string;
  logoAlt: string;
  /** "wordmark" logos are wide; "mark" logos are a symbol shown next to the company name. */
  logoKind: "wordmark" | "mark";
  role: string;
  period: string;
  current?: boolean;
  tone: BrandTone;
  summary: string;
  metrics: { value: string; label: string }[];
  highlights: string[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    id: "jll",
    company: "JLL Technologies",
    shortName: "JLL",
    logoUrl: jllLogo.url,
    logoAlt: "JLL logo",
    logoKind: "wordmark",
    role: "Software Engineer",
    period: "Nov 2026 – Present",
    current: true,
    tone: "jll",
    summary:
      "Building AI-powered property intelligence and the secure backend services behind lease, tenant and building data.",
    metrics: [
      { value: "5K+", label: "leases queryable in plain English" },
      { value: "−50%", label: "manual document review time" },
      { value: "−30%", label: "p95 API latency" },
      { value: "150+", label: "facility & asset managers served" },
    ],
    highlights: [
      "Shipped an AI assistant for lease and property documents (RAG, OpenAI API, embeddings, vector DB), letting property managers query 5K+ leases and contracts in plain English.",
      "Led backend development of Spring Boot microservices (Java 17, PostgreSQL, Redis) for property and tenant data with JWT/OAuth2-secured APIs; lowered p95 latency by 30% with Redis caching and query tuning.",
      "Created React.js dashboards for building performance, occupancy and energy usage from IoT sensor data, speeding up reporting turnaround by 35%.",
      "Set up Docker-based CI/CD on AWS with monitoring and alerts — release time down 40%, production incidents down 25%.",
    ],
    stack: ["Java 17", "Spring Boot", "PostgreSQL", "Redis", "RAG", "OpenAI API", "Vector DB", "React.js", "Docker", "AWS", "OAuth2"],
  },
  {
    id: "bluecoin",
    company: "Bluecoin IoT Solutions",
    shortName: "Bluecoin",
    logoUrl: bluecoinLogo.url,
    logoAlt: "Bluecoin IoT Solutions logo",
    logoKind: "wordmark",
    role: "Software Engineer",
    period: "Jun 2026 – Oct 2026",
    tone: "bluecoin",
    summary:
      "Engineered real-time IoT telemetry infrastructure — event-driven pipelines, secure APIs and database performance.",
    metrics: [
      { value: "10K+", label: "device events per day" },
      { value: "<100ms", label: "ingestion latency" },
      { value: "99.9%", label: "message delivery reliability" },
      { value: "−40%", label: "query latency" },
    ],
    highlights: [
      "Implemented production-grade Spring Boot microservices for real-time telemetry ingestion using Java 17, async non-blocking I/O and reactive patterns, with health checks and automated failover.",
      "Designed a Kafka event-driven pipeline with consumer groups and dead-letter queues, sustaining 99.9% delivery under burst traffic via partition-level parallelism across 6 brokers.",
      "Developed versioned REST APIs with JWT, OAuth2 and RBAC; tuned PostgreSQL with composite indexing and HikariCP pooling; integrated CloudWatch for observability.",
    ],
    stack: ["Java 17", "Spring Boot", "Kafka", "PostgreSQL", "HikariCP", "JWT", "OAuth2", "RBAC", "CloudWatch"],
  },
  {
    id: "mercor",
    company: "Mercor",
    shortName: "Mercor",
    logoUrl: mercorLogo.url,
    logoAlt: "Mercor logo mark",
    logoKind: "mark",
    role: "Software Engineer (Contract)",
    period: "Feb 2026 – May 2026",
    tone: "mercor",
    summary:
      "Designed agentic workflows and evaluation pipelines that simulate real-world software engineering tasks.",
    metrics: [
      { value: "50+", label: "agentic workflows engineered" },
      { value: "200+", label: "complex UI interactions evaluated" },
      { value: "95%+", label: "data consistency" },
      { value: "+20%", label: "pipeline throughput" },
    ],
    highlights: [
      "Engineered 50+ agentic workflows simulating real-world software tasks across 10+ tools, spanning React UI and backend APIs (REST, CLI); improved workflow coverage by 30%.",
      "Established evaluation pipelines for 200+ complex UI interactions and enforced QA standards across 50+ datasets.",
      "Automated backend scripts to remove redundant steps, boosting throughput and reducing manual intervention.",
    ],
    stack: ["Agentic Workflows", "React", "REST APIs", "CLI", "Evaluation Pipelines", "QA Automation"],
  },
  {
    id: "hcl",
    company: "HCL Technologies",
    shortName: "HCLTech",
    logoUrl: hclLogo.url,
    logoAlt: "HCLTech logo",
    logoKind: "wordmark",
    role: "Software Engineering Intern",
    period: "Jul 2025 – Dec 2025",
    tone: "hcl",
    summary:
      "Delivered Java microservices for a distributed enterprise system serving thousands of daily users.",
    metrics: [
      { value: "5+", label: "microservices delivered" },
      { value: "10K+", label: "API requests per day" },
      { value: "−25%", label: "API response time" },
      { value: "−30%", label: "deployment failures" },
    ],
    highlights: [
      "Delivered 5+ microservices in Java and Spring Boot for a distributed enterprise system.",
      "Optimized REST APIs handling 10K+ requests/day (25% faster); refined SQL queries and indexing, cutting endpoint latency by 15%.",
      "Diagnosed 15+ production issues via log analysis and monitoring; streamlined CI/CD with Jenkins and GitHub Actions.",
    ],
    stack: ["Java", "Spring Boot", "REST APIs", "SQL", "Jenkins", "GitHub Actions", "Monitoring"],
  },
];

export interface Project {
  id: "payflow" | "smartjobai";
  index: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: { value: string; label: string }[];
  details: string[];
  github: string;
}

export const projects: Project[] = [
  {
    id: "payflow",
    index: "01",
    name: "PayFlow",
    tagline: "Distributed Payment System",
    description:
      "A microservices-based payment platform using Kafka for asynchronous, fault-tolerant transaction processing — secured, cached and containerized for zero-downtime releases.",
    stack: ["Java 17", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "Docker"],
    highlights: [
      { value: "−35%", label: "transaction latency" },
      { value: "Async", label: "fault-tolerant processing" },
      { value: "Zero", label: "downtime releases" },
    ],
    details: [
      "Kafka-driven asynchronous transaction processing across independent services.",
      "REST APIs secured with JWT authentication.",
      "Redis caching and PostgreSQL indexing reduced transaction latency by 35%.",
      "Dockerized services with automated CI/CD for zero-downtime releases.",
    ],
    github: "https://github.com/rn1737/Payment-Processing-System",
  },
  {
    id: "smartjobai",
    index: "02",
    name: "SmartJobAI",
    tagline: "AI-Powered Job Platform",
    description:
      "An AI-powered job platform on Node.js and Express that uses the OpenAI API and prompt engineering to deliver personalised recommendations in under two seconds.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Redis", "OpenAI API", "Socket.io"],
    highlights: [
      { value: "<2s", label: "AI recommendations" },
      { value: "+35%", label: "API performance" },
      { value: "100+", label: "users" },
    ],
    details: [
      "OpenAI API integration with prompt engineering for job recommendations.",
      "Redis caching accelerated API performance by 35%.",
      "Real-time communication with Socket.io and JWT authentication.",
      "Scalable MongoDB schemas designed for growth.",
    ],
    github: "https://github.com/rn1737/Job-Seeker-Platform",
  },
];

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${path}.svg`;

export interface Tech {
  name: string;
  /** Official logo URL; when absent a neutral glyph is shown instead of a fake logo. */
  logo?: string;
  glyph?: "sql" | "rest" | "ai" | "vector" | "embed" | "prompt" | "micro" | "event" | "design" | "concurrency" | "monitor" | "cicd" | "shield" | "dsa";
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  items: Tech[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Programming Languages",
    blurb: "The languages I reach for — from JVM services to scripting and systems work.",
    items: [
      { name: "Java", logo: devicon("java/java-original") },
      { name: "Python", logo: devicon("python/python-original") },
      { name: "C++", logo: devicon("cplusplus/cplusplus-original") },
      { name: "Go", logo: devicon("go/go-original") },
      { name: "JavaScript", logo: devicon("javascript/javascript-original") },
      { name: "SQL", glyph: "sql" },
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    blurb: "Secure, versioned APIs and services built to stay fast under load.",
    items: [
      { name: "Spring Boot", logo: devicon("spring/spring-original") },
      { name: "Node.js", logo: devicon("nodejs/nodejs-original") },
      { name: "Express.js", logo: devicon("express/express-original") },
      { name: "REST APIs", glyph: "rest" },
      { name: "JWT", logo: "https://cdn.simpleicons.org/jsonwebtokens" },
      { name: "OAuth2", glyph: "shield" },
    ],
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    blurb: "Event-driven architecture, concurrency and the patterns that keep systems reliable.",
    items: [
      { name: "Apache Kafka", logo: devicon("apachekafka/apachekafka-original") },
      { name: "Microservices", glyph: "micro" },
      { name: "Event-Driven Architecture", glyph: "event" },
      { name: "System Design", glyph: "design" },
      { name: "Concurrency", glyph: "concurrency" },
      { name: "Monitoring", glyph: "monitor" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    blurb: "Relational, document and in-memory stores — tuned with indexing and pooling.",
    items: [
      { name: "PostgreSQL", logo: devicon("postgresql/postgresql-original") },
      { name: "MySQL", logo: devicon("mysql/mysql-original") },
      { name: "MongoDB", logo: devicon("mongodb/mongodb-original") },
      { name: "Redis", logo: devicon("redis/redis-original") },
    ],
  },
  {
    id: "ai",
    title: "AI & LLM",
    blurb: "Retrieval-augmented systems that make large document sets conversational.",
    items: [
      { name: "OpenAI API", glyph: "ai" },
      { name: "RAG", glyph: "vector" },
      { name: "Vector Databases", glyph: "vector" },
      { name: "Embeddings", glyph: "embed" },
      { name: "Prompt Engineering", glyph: "prompt" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    blurb: "Containerized delivery pipelines with observability built in.",
    items: [
      { name: "AWS (EC2, CloudWatch)", logo: devicon("amazonwebservices/amazonwebservices-original-wordmark") },
      { name: "Docker", logo: devicon("docker/docker-original") },
      { name: "Kubernetes", logo: devicon("kubernetes/kubernetes-original") },
      { name: "Jenkins", logo: devicon("jenkins/jenkins-original") },
      { name: "GitHub Actions", logo: devicon("githubactions/githubactions-original") },
      { name: "CI/CD", glyph: "cicd" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Data-rich dashboards and interfaces that make complex systems legible.",
    items: [
      { name: "React.js", logo: devicon("react/react-original") },
      { name: "JavaScript", logo: devicon("javascript/javascript-original") },
      { name: "HTML", logo: devicon("html5/html5-original") },
      { name: "CSS", logo: devicon("css3/css3-original") },
    ],
  },
];

export interface Achievement {
  id: string;
  value: string;
  title: string;
  detail: string;
  tier: "gold" | "silver" | "electric" | "violet";
}

export const achievements: Achievement[] = [
  { id: "dsa", value: "700+", title: "DSA Problems Solved", detail: "Across LeetCode & HackerRank", tier: "electric" },
  { id: "rush", value: "Top 2%", title: "Newton School Code Rush", detail: "Ranked 850 of 50,000+ globally · Oct 2023", tier: "violet" },
  { id: "java", value: "Gold", title: "Java Badge", detail: "One of 4 coding badges earned", tier: "gold" },
  { id: "cpp", value: "Silver", title: "C++ Badge", detail: "One of 4 coding badges earned", tier: "silver" },
  { id: "odyssey", value: "2nd", title: "Code Odyssey 2.0", detail: "Hackathon among multi-college teams", tier: "electric" },
  { id: "cgpa", value: "8.5", title: "CGPA out of 10", detail: "B.Tech CSE · SRM IST, Chennai", tier: "violet" },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;
