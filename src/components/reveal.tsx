"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children in sequence instead of the wrapper. */
  stagger?: number;
  delay?: number;
  y?: number;
}

/**
 * The initial hidden state is applied by GSAP in a layout effect, never in CSS,
 * so the content is fully visible if JS fails or motion is reduced.
 */
export function Reveal({
  children,
  className,
  stagger = 0,
  delay = 0,
  y = 26,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const targets =
        stagger > 0 ? Array.from(element.children) : (element as HTMLElement);

      gsap.fromTo(
        targets,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          delay,
          ease: "power3.out",
          stagger: stagger > 0 ? 0.08 : 0,
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [delay, stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
