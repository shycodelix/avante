"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getLenis, setLenis } from "@/lib/lenis-store";

const HEADER_OFFSET = -88;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Inertial scrolling for the whole app.
 *
 * One rAF loop only: GSAP's ticker advances Lenis, Lenis tells ScrollTrigger
 * where the page is. Lenis is created once in the root layout, so client-side
 * navigations never flash or re-initialise the scroll position.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
      autoRaf: false,
      anchors: false,
    });

    setLenis(lenis);

    const syncTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", syncTrigger);

    const tick = (time: number) => {
      // GSAP's ticker reports seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchors, including links to /#section from other routes.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const element = document.querySelector<HTMLElement>(hash);
      if (!element) return;
      event.preventDefault();
      lenis.scrollTo(element, { offset: HEADER_OFFSET, duration: 1.4 });
      window.history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onClick);
      lenis.off("scroll", syncTrigger);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();

    // New document: start at the top, or at the requested section.
    const timer = window.setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector<HTMLElement>(hash);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { immediate: true, offset: HEADER_OFFSET });
          } else {
            element.scrollIntoView();
          }
        }
      } else {
        lenis?.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
