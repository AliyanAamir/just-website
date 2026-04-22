"use client";

import { useEffect, useRef } from "react";
import {
  PARTICLE_COUNT,
  PARTICLE_COLORS,
  REPULSION_RADIUS,
  REPULSION_FORCE,
  VELOCITY_DECAY,
} from "./constants";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

function createParticle(w: number, h: number): Particle {
  const colorTemplate =
    PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
  const opacity = 0.06 + Math.random() * 0.08;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: 2 + Math.random() * 3.5,
    color: colorTemplate.replace("OPACITY", String(opacity)),
    opacity,
  };
}

export function useParticlePhysics(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    const tick = () => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= VELOCITY_DECAY;
        p.vy *= VELOCITY_DECAY;
        p.x += p.vx;
        p.y += p.vy;

        // Toroidal wrap
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef]);
}
