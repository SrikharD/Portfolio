"use client";
import { useEffect, useRef } from "react";

interface UseClimbRevealOptions {
  threshold?: number;
  baseDelay?: number;
  staggerMs?: number;
}

export function useClimbReveal(options: UseClimbRevealOptions = {}) {
  const { threshold = 0.1, baseDelay = 0, staggerMs = 120 } = options;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".climb");
    if (!els) return;

    // Set initial state
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(48px) scale(0.97)";
      el.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)`;
      el.style.transitionDelay = `${baseDelay + i * staggerMs}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, baseDelay, staggerMs]);

  return ref;
}
