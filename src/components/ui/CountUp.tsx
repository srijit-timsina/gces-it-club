"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ value, suffix = "", duration = 1300 }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setHasStarted(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateValue);
      }
    };

    frameRef.current = requestAnimationFrame((timestamp) => {
      if (prefersReducedMotion) {
        setDisplayValue(value);
        return;
      }

      updateValue(timestamp);
    });

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [duration, hasStarted, value]);

  return (
    <span ref={elementRef}>
      {displayValue}
      {suffix}
    </span>
  );
}
