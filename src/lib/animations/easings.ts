export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;
export const EASE_SPRING = { type: "spring", stiffness: 100, damping: 20 } as const;

export const GSAP_EASE_EXPO = "expo.out";
export const GSAP_EASE_POWER3 = "power3.out";
