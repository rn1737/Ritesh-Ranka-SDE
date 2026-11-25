import { describe, expect, it } from "vitest";
import { experiences, projects, profile } from "@/lib/portfolio-data";

describe("portfolio content matches the resume", () => {
  it("lists experience newest first: JLL, Bluecoin, Mercor, HCL", () => {
    expect(experiences.map((e) => e.id)).toEqual(["jll", "bluecoin", "mercor", "hcl"]);
  });

  it("uses the resume employment dates and titles", () => {
    const byId = Object.fromEntries(experiences.map((e) => [e.id, `${e.role} | ${e.period}`]));
    expect(byId["jll"]).toBe("Software Engineer | Nov 2026 – Present");
    expect(byId["bluecoin"]).toBe("Software Engineer | Jun 2026 – Oct 2026");
    expect(byId["mercor"]).toBe("Software Engineer (Contract) | Feb 2026 – May 2026");
    expect(byId["hcl"]).toBe("Software Engineering Intern | Jul 2025 – Dec 2025");
  });

  it("links projects to their verified GitHub repositories", () => {
    expect(projects.map((p) => p.github)).toEqual([
      "https://github.com/rn1737/Payment-Processing-System",
      "https://github.com/rn1737/Job-Seeker-Platform",
    ]);
  });

  it("uses the contact email from the resume", () => {
    expect(profile.email).toBe("riteshranka2003@gmail.com");
  });
  it("links to the exact LinkedIn profile", () => {
    expect(profile.links.linkedin).toBe("https://www.linkedin.com/in/ritesh-ranka-19836b236");
  });

  it("offers the resume PDF for download", () => {
    expect(profile.resumeUrl).toMatch(/\.pdf$/);
    expect(profile.resumeFileName).toBe("Ritesh_Ranka_Software_Engineer.pdf");
  });
});
