"use client";
import { useClimbReveal } from "@/hooks/useClimbReveal";

const experiences = [
  {
    role: "AI Engineer Intern",
    company: "Astute Solutions",
    period: "Aug 2025 – Dec 2025",
    location: "Mobile, AL",
    points: [
      "Built an end-to-end offline RAG chatbot using LLaMA, Python Streamlit, and Ollama with multi-turn conversational memory.",
      "Cleaned and preprocessed internal documents, integrated into ChromaDB for vector storage and semantic search.",
      "Designed a local-first, no-API architecture for data privacy using LangChain for prompt orchestration.",
      "Deployed independently on both Windows OS and AWS Cloud environments.",
    ],
    tags: ["LLaMA", "LangChain", "ChromaDB", "Streamlit", "RAG", "AWS"],
  },
  {
    role: "Software Developer Intern",
    company: "DigiFrills IT Solutions",
    period: "Nov 2023 – Mar 2024",
    location: "India",
    points: [
      "Built and deployed a feature-rich CRM application with React as part of a four-person dev team.",
      "Developed dynamic forms for key CRM functions with backend API integration.",
      "Led QA testing — manual and automated — ensuring quality and security standards.",
    ],
    tags: ["React", "CRM", "REST APIs", "QA Testing"],
  },
  {
    role: "Web Developer Intern",
    company: "Oasis Infobyte",
    period: "Mar 2023 – Apr 2023",
    location: "India",
    points: [
      "Built interactive web pages including a calculator, reminder app, and tribute page.",
      "Focused on frontend UI design, layout structure, and usability improvements.",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

export default function Experience() {
  const ref = useClimbReveal({ staggerMs: 160 });

  return (
    <section id="experience" className="py-32 px-6 max-w-6xl mx-auto select-none" ref={ref}>
      <p className="climb font-mono text-accent text-xs tracking-widest mb-4">02 / experience</p>
      <h2 className="climb font-sans text-4xl font-semibold text-text mb-16">Where I&apos;ve worked.</h2>

      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="climb group grid md:grid-cols-[200px_1fr] gap-6 border-t border-border py-10
              hover:border-accent/20 transition-colors duration-300 bg-bg/40 backdrop-blur-sm px-2"
          >
            <div>
              <p className="font-mono text-xs text-muted tracking-wider">{exp.period}</p>
              <p className="font-mono text-xs text-muted mt-1">{exp.location}</p>
            </div>
            <div>
              <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                <h3 className="font-sans text-xl font-semibold text-text">{exp.role}</h3>
                <span className="font-mono text-xs text-accent">@ {exp.company}</span>
              </div>
              <ul className="space-y-2 mb-5">
                {exp.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-text/60 text-sm leading-relaxed">
                    <span className="text-accent mt-1 shrink-0">▸</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-muted border border-border px-3 py-1
                    group-hover:border-accent/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
