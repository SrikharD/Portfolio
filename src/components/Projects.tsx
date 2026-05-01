"use client";
import { useClimbReveal } from "@/hooks/useClimbReveal";

const projects = [
  {
    num: "01",
    title: "Construction Management System",
    description: "Full-stack MVC app for managing construction sites, workers, and work orders. Role-based access via ASP.NET Core Identity — different dashboards per role, progress bars, full audit trail, and personalized views for Site Managers, Property Owners, and Workers.",
    tags: ["ASP.NET Core 9", "C#", "EF Core", "ASP.NET Identity", "SQL Server", "Razor Views"],
    github: "https://github.com/SrikharD/Construction-Management-System",
  },
  {
    num: "02",
    title: "Senior Capstone Management System",
    description: "Web app for professors to manage student capstone projects with role-based UI. Automated survey link distribution via a Node.js script — cut manual outreach by 90%. Python + pandas pipeline handles CSV imports and data cleaning. Deployed on university IIS server.",
    tags: ["ASP.NET Core", "C#", "EF Core", "ASP.NET Identity", "Node.js", "Python", "pandas", "IIS"],
    github: "https://github.com/SrikharD/SeniorCapstoneManagementSystem",
  },
  {
    num: "03",
    title: "Club Management Web App",
    description: "CRUD web app for managing clubs and members. Responsive Bootstrap UI with light/dark mode, search, sorting, and a leaderboard. Structured data model for clean discoverability.",
    tags: ["ASP.NET Core", "C#", "Bootstrap", "SQL Server", "EF Core"],
    github: "https://github.com/SrikharD",
  },
  {
    num: "04",
    title: "Offline RAG Chatbot",
    description: "Built during internship at Astute Solutions. End-to-end local AI chatbot — LLaMA for inference, ChromaDB for vector storage and semantic search, LangChain for prompt orchestration. Fully offline, no external APIs, deployed on both Windows and AWS.",
    tags: ["Python", "LLaMA", "LangChain", "ChromaDB", "Streamlit", "Ollama", "RAG"],
    github: null,
    note: "Internal — code private",
  },
  {
    num: "05",
    title: "Product Shelf-Life Reminder",
    description: "Mobile app for tracking product expiry dates. Firebase auth and cloud storage, custom categories, filters, and Google Search API integration for product lookup.",
    tags: ["Firebase", "Mobile", "Google Search API"],
    github: "https://github.com/SrikharD",
  },
  {
    num: "06",
    title: "Lawn Mowers Database System",
    description: "Backend database system for a lawn mower business. Many-to-many relationships, optimized query handling, and clean frontend integration. Consistent performance under complex query loads.",
    tags: ["SQL Server", "Database Design", "ERD"],
    github: "https://github.com/SrikharD",
  },
];

export default function Projects() {
  const ref = useClimbReveal({ baseDelay: 0, staggerMs: 100 });

  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto select-none" ref={ref}>
      <p className="climb font-mono text-accent text-xs tracking-widest mb-4">03 / projects</p>
      <h2 className="climb font-sans text-4xl font-semibold text-text mb-16">Things I&apos;ve built.</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div
            key={p.num}
            className="climb group relative border border-border p-8 flex flex-col overflow-hidden
              bg-bg/60 backdrop-blur-sm
              transition-all duration-300
              hover:border-accent hover:bg-surface/80
              hover:shadow-[0_0_32px_0_rgba(232,255,71,0.06)]"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="font-mono text-xs text-muted">{p.num}</span>
              <div className="flex gap-2">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted border border-border px-3 py-1
                      hover:text-accent hover:border-accent transition-all duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    github ↗
                  </a>
                )}
                {p.note && (
                  <span className="font-mono text-xs text-muted border border-border px-3 py-1">private</span>
                )}
              </div>
            </div>

            <h3 className="font-sans text-lg font-semibold text-text mb-3 group-hover:text-accent transition-colors duration-300">
              {p.title}
            </h3>

            <p className="font-sans text-sm text-text/50 leading-relaxed mb-6 flex-1">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-muted/60 bg-bg/80 border border-border px-2 py-0.5
                    group-hover:border-accent/20 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
