// src/components/Fireworks.jsx
import { useEffect, useRef } from "react";
import "./galleries/gallery.css";

export default function Fireworks({ onFinish }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles = [];
    let rafId;
    let running = true;

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function createBurst(x, y, color) {
      const count = 28 + Math.round(rand(-6, 16));
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          vx: Math.cos((i / count) * Math.PI * 2) * rand(2, 8),
          vy: Math.sin((i / count) * Math.PI * 2) * rand(2, 8),
          life: rand(40, 80),
          size: rand(2, 5),
          color,
        });
      }
    }

    // initial bursts
    const colors = ["#ff4d79", "#ffb3e6", "#a24bff", "#ff7a5a", "#ffd86a"];
    for (let i = 0; i < 4; i++) {
      createBurst(rand(w * 0.2, w * 0.8), rand(h * 0.25, h * 0.6), colors[Math.floor(rand(0, colors.length))]);
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.vx *= 0.997;
        p.vy *= 0.997;
        p.life--;
        ctx.globalAlpha = Math.max(0, p.life / 80);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
      }

      // occasionally new bursts while running
      if (running && Math.random() < 0.04) {
        createBurst(rand(w * 0.15, w * 0.85), rand(h * 0.15, h * 0.6), colors[Math.floor(rand(0, colors.length))]);
      }

      rafId = requestAnimationFrame(step);
    }

    step();

    // end after ~4.5s
    const stopTimer = setTimeout(() => {
      running = false;
      // finish after particles cleared
      const finishInterval = setInterval(() => {
        if (particles.length === 0) {
          clearInterval(finishInterval);
          if (onFinish) onFinish();
        }
      }, 200);
    }, 4500);

    // handle resize
    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      clearTimeout(stopTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [onFinish]);

  return (
    <div className="fireworks-overlay">
      <canvas ref={ref} className="fireworks-canvas" />
      <div className="fireworks-message card-glass">
        <h2>💥 She Said Yes! 💥</h2>
        <p className="fireworks-sub">This is the beginning of our forever ✨</p>
      </div>
    </div>
  );
}
