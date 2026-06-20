import { useEffect, useRef } from "react";

/**
 * Shared IntersectionObserver — one instance for all Reveal components.
 * Avoids creating dozens of observers on landing pages with many sections.
 */
let sharedObserver: IntersectionObserver | null = null;

const getObserver = () => {
  if (sharedObserver) return sharedObserver;
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sharedObserver!.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );
  return sharedObserver;
};

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    if (!obs) {
      // Fallback: just show
      el.classList.add("is-visible");
      return;
    }
    obs.observe(el);
    return () => {
      obs.unobserve(el);
    };
  }, []);

  return ref;
}
