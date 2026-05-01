"use client";
import { useState } from "react";
import { useClimbReveal } from "@/hooks/useClimbReveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useClimbReveal({ staggerMs: 150 });

  const copyEmail = () => {
    navigator.clipboard.writeText("dogiparthysrikhar@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto select-none" ref={ref}>
      <p className="climb font-mono text-accent text-xs tracking-widest mb-4">05 / contact</p>

      <div className="climb border border-border p-12 md:p-16 relative overflow-hidden
        bg-bg/60 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#e8ff47 1px, transparent 1px), linear-gradient(90deg, #e8ff47 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-xl">
          <h2 className="font-sans text-4xl md:text-5xl font-semibold text-text mb-4">
            Let&apos;s talk.
          </h2>
          <p className="font-sans text-text/50 text-base leading-relaxed mb-10">
            Open to internships, collaborations, or just a good conversation
            about .NET architecture or AI systems. Drop me a line.
          </p>

          <button
            onClick={copyEmail}
            className="font-mono text-sm border border-accent text-accent px-6 py-3
              hover:bg-accent hover:text-bg transition-all duration-200 cursor-pointer"
          >
            {copied ? "copied ✓" : "dogiparthysrikhar@gmail.com ↗"}
          </button>

          <div className="flex gap-6 mt-10">
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/srikhar-dogiparthy-84026b225" },
              { label: "GitHub", href: "https://github.com/SrikharD" },
              { label: "Instagram", href: "https://instagram.com/dvns_s" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-accent transition-colors tracking-widest cursor-pointer">
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
