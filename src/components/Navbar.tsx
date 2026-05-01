"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-accent text-sm font-semibold tracking-widest">
          SD<span className="text-muted">.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          target="_blank"
          className="hidden md:block font-mono text-xs border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-all duration-200"
        >
          résumé ↗
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-accent"
          onClick={() => setOpen(!open)}
        >
          <span className="font-mono text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bg border-b border-border px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            className="font-mono text-xs border border-accent text-accent px-4 py-2 text-center hover:bg-accent hover:text-bg transition-all"
          >
            résumé ↗
          </a>
        </div>
      )}
    </nav>
  );
}
