"use client";

import { useRef, useState, useEffect } from "react";
import { useParticlePhysics } from "./useParticlePhysics";
import { ORB_CONFIG } from "./constants";

interface OrbState {
  x: number;
  y: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticlePhysics(canvasRef);

  const [orbs, setOrbs] = useState<OrbState[]>(
    ORB_CONFIG.map((o) => ({
      x: typeof window !== "undefined" ? o.initialX * window.innerWidth : 0,
      y: typeof window !== "undefined" ? o.initialY * window.innerHeight : 0,
    }))
  );

  const orbTargets = useRef(
    ORB_CONFIG.map((o) => ({
      x: o.initialX * (typeof window !== "undefined" ? window.innerWidth : 1200),
      y: o.initialY * (typeof window !== "undefined" ? window.innerHeight : 800),
    }))
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      orbTargets.current = ORB_CONFIG.map((o, i) => ({
        x: orbTargets.current[i].x + (e.clientX - orbTargets.current[i].x) * o.lerpSpeed,
        y: orbTargets.current[i].y + (e.clientY - orbTargets.current[i].y) * o.lerpSpeed,
      }));
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf: number;
    const animate = () => {
      setOrbs((prev) =>
        prev.map((orb, i) => ({
          x: orb.x + (orbTargets.current[i].x - orb.x) * ORB_CONFIG[i].lerpSpeed,
          y: orb.y + (orbTargets.current[i].y - orb.y) * ORB_CONFIG[i].lerpSpeed,
        }))
      );
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient orbs */}
      {ORB_CONFIG.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(80px)",
            transform: `translate(${orbs[i]?.x - orb.size / 2}px, ${orbs[i]?.y - orb.size / 2}px)`,
            willChange: "transform",
          }}
        />
      ))}
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
