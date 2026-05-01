"use client";
import { useState, useEffect } from "react";

const roles = [
  "ASP.NET Core Developer",
  "Full-Stack Engineer",
  "AI/ML Enthusiast",
  "MS Information Systems",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-24 pb-24 select-none"
    >
      {/* subtle grid background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#e8ff47 1px, transparent 1px), linear-gradient(90deg, #e8ff47 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10">
        <p
          className="font-mono text-accent text-sm tracking-widest mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          &gt; hello, world —
        </p>

        <h1
          className="font-sans text-5xl md:text-7xl font-semibold text-text leading-tight mb-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Srikhar
          <br />
          <span className="text-accent">Dogiparthy.</span>
        </h1>

        <div
          className="font-mono text-lg md:text-xl text-muted mb-8 h-7 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          {displayed}
          <span className="animate-blink text-accent">_</span>
        </div>

        <p
          className="font-sans text-text/60 max-w-xl text-base leading-relaxed mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
        >
          I build web applications on the Microsoft stack —
          from role-based auth systems to AI data pipelines. Currently studying
          Information Systems and exploring the LLM space.
        </p>

        <div
          className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          <a
            href="#projects"
            className="font-mono text-sm bg-accent text-bg px-6 py-3 hover:bg-accent/80 transition-all duration-200 font-semibold cursor-pointer"
          >
            view projects →
          </a>
          <a
            href="#contact"
            className="font-mono text-sm border border-border text-muted px-6 py-3 hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
          >
            get in touch
          </a>
        </div>

        {/* Scroll indicator — below buttons, no overlap */}
        <div
          className="flex items-center gap-3 mt-16 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
        >
          <div className="w-px h-8 bg-border" />
          <span className="font-mono text-xs text-muted/40 tracking-widest">
            scroll
          </span>
        </div>
      </div>
    </section>
  );
}
