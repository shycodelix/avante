"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/cn";

interface ParallaxMediaProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** Total travel in percent of image height across the scroll range. */
  amount?: number;
  priority?: boolean;
  sizes?: string;
}

export function ParallaxMedia({
  src,
  alt,
  className,
  imageClassName,
  amount = 12,
  priority = false,
  sizes = "100vw",
}: ParallaxMediaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const image = imageRef.current;
    if (!wrap || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, wrap);

    return () => context.revert();
  }, [amount]);

  return (
    <div ref={wrapRef} className={cn("overflow-hidden", className ?? "relative")}>
      <div ref={imageRef} className="absolute inset-[-8%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
