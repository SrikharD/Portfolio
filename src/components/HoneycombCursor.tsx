"use client";
import { useEffect, useRef } from "react";

export default function HoneycombCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursor = useRef({ x: -999, y: -999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const HEX_SIZE = 28;
    const HEX_W = Math.sqrt(3) * HEX_SIZE;
    const HEX_H = 2 * HEX_SIZE;
    const COL_W = HEX_W;
    const ROW_H = HEX_H * 0.75;
    const SPOTLIGHT = 200;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function hexPath(cx: number, cy: number) {
      ctx!.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30);
        const x = cx + HEX_SIZE * Math.cos(angle);
        const y = cy + HEX_SIZE * Math.sin(angle);
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.closePath();
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const cols = Math.ceil(canvas!.width / COL_W) + 2;
      const rows = Math.ceil(canvas!.height / ROW_H) + 2;

      // Use raw clientX/clientY — canvas is fixed so no scrollY needed
      const cx = cursor.current.x;
      const cy = cursor.current.y;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const offset = col % 2 === 0 ? 0 : ROW_H * 0.5;
          const hx = col * COL_W * 0.866 + HEX_W / 2;
          const hy = row * ROW_H + offset + HEX_H / 2;

          const dist = Math.sqrt((hx - cx) ** 2 + (hy - cy) ** 2);
          if (dist > SPOTLIGHT) continue;

          const alpha = (1 - dist / SPOTLIGHT) * 0.39;

          hexPath(hx, hy);
          ctx!.strokeStyle = `rgba(232, 255, 71, ${alpha})`;
          ctx!.lineWidth = 1.2;
          ctx!.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}