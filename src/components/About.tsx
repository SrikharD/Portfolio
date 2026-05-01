"use client";
import { useClimbReveal } from "@/hooks/useClimbReveal";

const cards = [
  { label: "Currently", value: "MS Information Systems", sub: "University of South Alabama — in progress" },
  { label: "Background", value: "B.Tech Computer Science", sub: "Parul University, India — graduated 2024" },
  { label: "Certified in", value: "Azure · AWS · Power Platform", sub: "AZ-900 · PL-900 · Intel FICE Software" },
  { label: "Right now", value: "Open to opportunities", sub: "Internships, research roles, and interesting problems" },
];

export default function About() {
  const leftRef = useClimbReveal({ baseDelay: 0, staggerMs: 100 });
  const rightRef = useClimbReveal({ baseDelay: 150, staggerMs: 130 });

  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto select-none">
      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <div ref={leftRef}>
          <p className="climb font-mono text-accent text-xs tracking-widest mb-4">
            01 / about
          </p>
          <h2 className="climb font-sans text-4xl font-semibold text-text mb-6">
            Who I am.
          </h2>
          {[
            <>I&apos;m a developer currently doing my Master&apos;s in Information Systems. I gravitate toward problems that need structure — systems where the data model matters, where the wrong auth decision bites you three months later.</>,
            <>Most of my work lives in the <span className="text-text">Microsoft .NET ecosystem</span>. ASP.NET Core Identity, EF Core, SQL Server — I like the reliability of that stack. Clean migrations, role-based access, and things that actually behave when deployed on IIS.</>,
            <>In 2025 I interned as an <span className="text-text">AI Engineer at Astute Solutions</span>, which pulled me into a different world — LLMs, vector databases, retrieval-augmented generation. Built a fully offline chatbot using LLaMA and LangChain. No cloud, no API keys.</>,
            <>I pick up new things quickly. Right now that&apos;s Salesforce. Before that it was AI pipelines. The stack keeps changing — the curiosity doesn&apos;t.</>,
          ].map((text, i) => (
            <p key={i} className="climb text-text/60 font-sans text-base leading-relaxed mb-4">
              {text}
            </p>
          ))}
        </div>

        {/* Right — cards */}
        <div ref={rightRef} className="space-y-4">
          {cards.map((s) => (
            <div
              key={s.label}
              className="climb border border-border p-6 bg-bg/60 backdrop-blur-sm hover:border-accent/40 hover:bg-surface transition-all duration-500 group"
            >
              <p className="font-mono text-xs text-muted tracking-widest mb-1 uppercase">{s.label}</p>
              <p className="font-mono text-base text-accent font-semibold group-hover:text-text transition-colors duration-300">{s.value}</p>
              <p className="font-sans text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
