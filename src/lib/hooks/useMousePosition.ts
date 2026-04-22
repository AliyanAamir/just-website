"use client";

import { useEffect, useRef } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(
  onMove: (pos: MousePosition) => void,
  element?: HTMLElement | null
) {
  const handler = useRef(onMove);
  handler.current = onMove;

  useEffect(() => {
    const target = element ?? window;
    const listener = (e: Event) => {
      const evt = e as MouseEvent;
      handler.current({ x: evt.clientX, y: evt.clientY });
    };
    target.addEventListener("mousemove", listener);
    return () => target.removeEventListener("mousemove", listener);
  }, [element]);
}
