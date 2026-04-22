export const PARTICLE_COUNT = 65;
export const REPULSION_RADIUS = 160;
export const REPULSION_FORCE = 2.8;
export const VELOCITY_DECAY = 0.95;

export const PARTICLE_COLORS = [
  "rgba(124, 110, 255, OPACITY)",  // lavender
  "rgba(20, 184, 166, OPACITY)",   // cyan
  "rgba(249, 115, 115, OPACITY)",  // coral
] as const;

export const ORB_CONFIG = [
  {
    color: "rgba(124, 110, 255, 0.09)",
    size: 600,
    lerpSpeed: 0.06,
    initialX: 0.2,
    initialY: 0.25,
  },
  {
    color: "rgba(20, 184, 166, 0.07)",
    size: 480,
    lerpSpeed: 0.04,
    initialX: 0.75,
    initialY: 0.65,
  },
] as const;
