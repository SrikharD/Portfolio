"use client";
import { useClimbReveal } from "@/hooks/useClimbReveal";

const skillGroups = [
  { category: "Primary Stack", skills: ["ASP.NET Core 9", "C#", "Entity Framework Core", "ASP.NET Core Identity", "Razor Views", "MVC Pattern", "SQL Server"] },
  { category: "AI / Data", skills: ["Python", "LangChain", "ChromaDB", "LLaMA", "RAG Pipelines", "pandas", "Data Cleaning", "Scikit-learn"] },
  { category: "Frontend", skills: ["React.js", "TypeScript", "Bootstrap 5", "JavaScript", "HTML5 / CSS3"] },
  { category: "Infra & Tools", skills: ["AWS", "Azure", "Firebase", "IIS Web Server", "Vercel", "Git", "Linux", "Visual Studio"] },
  { category: "Currently Learning", skills: ["Salesforce", "Next.js", "Tailwind CSS"] },
];

export default function Skills() {
  const ref = useClimbReveal({ staggerMs: 110 });

  return (
    <section id="skills" className="py-32 px-6 max-w-6xl mx-auto select-none" ref={ref}>
      <p className="climb font-mono text-accent text-xs tracking-widest mb-4">04 / skills</p>
      <h2 className="climb font-sans text-4xl font-semibold text-text mb-16">What I work with.</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((g) => (
          <div
            key={g.category}
            className="climb border border-border p-8 bg-bg/60 backdrop-blur-sm
              hover:border-accent/30 hover:bg-surface/80 transition-all duration-500 group"
          >
            <p className="font-mono text-xs text-accent tracking-widest mb-4 uppercase">{g.category}</p>
            <div className="flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs text-text/60 border border-border px-3 py-1
                    hover:border-accent/30 hover:text-text transition-all duration-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
