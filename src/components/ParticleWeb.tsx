"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const PARTICLE_COUNT = 90;
const CONNECTION_DIST = 140;
const CURSOR_REPEL_DIST = 120;
const CURSOR_FORCE = 1.8;
const MAX_SPEED = 0.7;
const BASE_LINE_ALPHA = 0.80;
const BASE_NODE_ALPHA = 0.99;

export default function ParticleWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const cursor = useRef({ x: -9999, y: -9999 });
  const scrollY = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function build() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;

      particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
        radius: Math.random() * 1.5 + 1,
      }));
    }

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = cursor.current.x;
      const cy = cursor.current.y + scrollY.current;
      const cursorActive = cx >= 0;

      for (const p of particles.current) {
        // Cursor repulsion
        if (cursorActive) {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_REPEL_DIST && dist > 0) {
            const force = (1 - dist / CURSOR_REPEL_DIST) * CURSOR_FORCE;
            p.vx += (dx / dist) * force * 0.04;
            p.vy += (dy / dist) * force * 0.04;
          }
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) {
          p.vx = (p.vx / spd) * MAX_SPEED;
          p.vy = (p.vy / spd) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      // Draw connections
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            let alpha = (1 - dist / CONNECTION_DIST) * BASE_LINE_ALPHA;
            if (cursorActive) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              const cdist = Math.sqrt((midX - cx) ** 2 + (midY - cy) ** 2);
              if (cdist < CURSOR_REPEL_DIST * 1.5) {
                alpha += (1 - cdist / (CURSOR_REPEL_DIST * 1.5)) * 0.4;
              }
            }

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(232, 255, 71, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of particles.current) {
        let nodeAlpha = BASE_NODE_ALPHA;
        if (cursorActive) {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_REPEL_DIST) {
            nodeAlpha = Math.min(1, BASE_NODE_ALPHA + (1 - dist / CURSOR_REPEL_DIST) * 0.15);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 255, 71, ${nodeAlpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(tick);
    }

    const onMouseMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      cursor.current = { x: -1, y: -1 };
    };
    const onScroll = () => { scrollY.current = window.scrollY; };
    const onResize = () => build();

    build();
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}