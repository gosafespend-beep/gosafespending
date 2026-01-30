import { useEffect } from "react";

/**
 * Performance optimizations for Core Web Vitals
 * - Preconnects to external origins
 * - Sets up resource hints
 * - Optimizes font loading
 */
export const PerformanceOptimizations = () => {
  useEffect(() => {
    // Preconnect to Supabase for faster API calls
    const preconnectOrigins = [
      "https://qeogqvjqvafbzufanwki.supabase.co",
    ];

    preconnectOrigins.forEach((origin) => {
      // Check if preconnect already exists
      const existing = document.querySelector(`link[rel="preconnect"][href="${origin}"]`);
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = origin;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);

        // Also add dns-prefetch as fallback
        const dnsPrefetch = document.createElement("link");
        dnsPrefetch.rel = "dns-prefetch";
        dnsPrefetch.href = origin;
        document.head.appendChild(dnsPrefetch);
      }
    });

    // Preload critical font if using web fonts
    // Note: Add font preloading here if custom fonts are added
  }, []);

  return null;
};

/**
 * Intersection Observer-based lazy loading wrapper
 */
export const useLazyLoad = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Load 200px before entering viewport
        threshold: 0,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback]);
};
