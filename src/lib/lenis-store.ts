import type Lenis from "lenis";

/**
 * A single Lenis instance lives at module scope for the lifetime of the tab.
 * Components that need to pause scrolling (mobile menu, lightbox) call
 * `getLenis()?.stop()` / `.start()` without re-creating the smooth scroll.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null): void {
  instance = next;
}

export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  return instance;
}
