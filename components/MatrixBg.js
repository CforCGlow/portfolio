"use client";
import { useEffect, useRef } from "react";

// Subtle CSE-themed binary rain backdrop. Fixed, click-through, theme-aware.
export default function MatrixBg() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, cols = 0, drops = [], raf = 0;
    const chars = "01<>{}[]/;=+*#$";

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.max(1, Math.floor(w / 20));
      drops = Array.from({ length: cols }, () => Math.random() * (h / 16));
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const dark = document.documentElement.dataset.theme === "dark";
      ctx.fillStyle = dark ? "rgba(7,13,26,0.14)" : "rgba(246,248,252,0.14)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "14px monospace";
      ctx.fillStyle = dark ? "rgba(96,165,250,0.55)" : "rgba(37,99,235,0.30)";
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 20, drops[i] * 16);
        if (drops[i] * 16 > h && Math.random() > 0.976) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="matrix-bg" aria-hidden="true" />;
}
