import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { pageview, track } from "@/lib/analytics";

/** Fires page_view on every route change and scroll_depth milestones per page. */
export const useRouteAnalytics = () => {
  const location = useLocation();
  const seenDepthsRef = useRef<Set<number>>(new Set());
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Reset per-page state
    seenDepthsRef.current = new Set();
    startTimeRef.current = Date.now();
    // Defer so <title> updates from Helmet land first
    const t = window.setTimeout(() => pageview(location.pathname + location.search), 50);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      const pct = Math.round((scrollTop / docH) * 100);
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m && !seenDepthsRef.current.has(m)) {
          seenDepthsRef.current.add(m);
          track("scroll_depth", { percent: m, page_path: location.pathname });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const beforeUnload = () => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      track("time_on_page", { seconds, page_path: location.pathname });
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [location.pathname]);
};
