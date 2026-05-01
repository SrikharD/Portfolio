"use client";
import { useEffect, useRef } from "react";

const HEX_SIZE = 30;
const HEX_W = Math.sqrt(3) * HEX_SIZE;
const ROW_H = HEX_SIZE * 1.5;

interface Hex {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotV: number;
  shattered: boolean;
  layer: 0 | 1 | 2;
}

const LAYERS = [
  { alpha: 0.18, shatterRadius: 60, force: 30, spring: 0.04, damp: 0.70, scrollMult: 0.2, breathAmp: 0.12, size: 0.82 },
  { alpha: 0.30, shatterRadius: 100, force: 55, spring: 0.06, damp: 0.73, scrollMult: 0.5, breathAmp: 0.07, size: 0.92 },
  { alpha: 0.42, shatterRadius: 130, force: 90, spring: 0.09, damp: 0.76, scrollMult: 1.0, breathAmp: 0.04, size: 1.00 },
];

export default function HoneycombBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexes = useRef<Hex[]>([]);
  const cursor = useRef({ x: -9999, y: -9999 });
  const scrollY = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function buildGrid() {
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;

      const cols = Math.ceil(canvas.width / HEX_W) + 2;
      const rows = Math.ceil(canvas.height / ROW_H) + 2;
      hexes.current = [];

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const offset = col % 2 === 0 ? 0 : HEX_SIZE * 0.75;
          const hx = col * HEX_W * 0.866 + HEX_W / 2;
          const hy = row * ROW_H * 1.33 + offset + HEX_SIZE;
          const layer = ((row * 7 + col * 13) % 3) as 0 | 1 | 2;

          hexes.current.push({
            ox: hx,
            oy: hy,
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            rot: 0,
            rotV: 0,
            shattered: false,
            layer,
          });
        }
      }
    }

    function drawHex(
      cx: number,
      cy: number,
      rot: number,
      size: number,
      strokeAlpha: number
    ) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(rot);

      ctx!.beginPath();

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30);
        const x = HEX_SIZE * size * Math.cos(angle);
        const y = HEX_SIZE * size * Math.sin(angle);

        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }

      ctx!.closePath();

      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
      ctx!.strokeStyle = `rgba(232, 255, 71, ${strokeAlpha})`;
      ctx!.lineWidth = 0.9;
      ctx!.stroke();

      ctx!.restore();
    }

    function tick() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const cx = cursor.current.x;
      const cy = cursor.current.y + scrollY.current;
      const sv = scrollY.current;
      const cursorActive = cursor.current.x !== -9999;

      for (const layerIdx of [0, 1, 2]) {
        const L = LAYERS[layerIdx];

        for (const h of hexes.current) {
          if (h.layer !== layerIdx) continue;

          const breathX =
            Math.sin(now * 0.0008 + h.oy * 0.018) * L.breathAmp;

          const breathY =
            Math.cos(now * 0.0006 + h.ox * 0.015) * L.breathAmp;

          const scrollOffset =
            Math.sin(sv * 0.002 + h.ox * 0.01) * L.scrollMult;

          const dx = h.ox - cx;
          const dy = h.oy - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (cursorActive && dist < L.shatterRadius) {
            const force = (1 - dist / L.shatterRadius) * L.force;
            const ang = Math.atan2(dy, dx);

            h.vx += Math.cos(ang) * force * 0.14;
            h.vy += Math.sin(ang) * force * 0.14;
            h.rotV += (Math.random() - 0.5) * 0.05;
            h.shattered = true;
          } else if (h.shattered) {
            h.vx = (h.vx + (h.ox - h.x) * L.spring) * L.damp;
            h.vy = (h.vy + (h.oy - h.y) * L.spring) * L.damp;
            h.rotV *= L.damp;

            if (
              Math.abs(h.x - h.ox) < 0.4 &&
              Math.abs(h.y - h.oy) < 0.4 &&
              Math.abs(h.rot) < 0.01
            ) {
              h.x = h.ox;
              h.y = h.oy;
              h.rot = 0;
              h.vx = 0;
              h.vy = 0;
              h.rotV = 0;
              h.shattered = false;
            }
          }

          h.x += h.vx;
          h.y += h.vy;
          h.rot += h.rotV;

          const rx = h.x + breathX;
          const ry = h.y + breathY + scrollOffset;

          const shatterFade = h.shattered
            ? Math.max(0, 1 - (1 - dist / L.shatterRadius) * 0.9)
            : 1;

          const alpha = L.alpha * shatterFade;

          drawHex(rx, ry, h.rot, L.size, alpha);
        }
      }

      animRef.current = requestAnimationFrame(tick);
    }

    const onMouseMove = (e: MouseEvent) => {
      cursor.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const onMouseLeave = () => {
      cursor.current = {
        x: -9999,
        y: -9999,
      };
    };

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    const onResize = () => {
      buildGrid();
    };

    buildGrid();

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