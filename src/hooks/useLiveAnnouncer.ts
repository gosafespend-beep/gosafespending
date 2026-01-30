import { useEffect, useCallback, useRef } from "react";

interface LiveAnnouncerOptions {
  politeness?: "polite" | "assertive";
  timeout?: number;
}

/**
 * Hook for announcing dynamic content changes to screen readers
 * Uses an ARIA live region for accessibility
 */
export const useLiveAnnouncer = () => {
  const regionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live region if it doesn't exist
    let region = document.getElementById("live-announcer") as HTMLDivElement;
    
    if (!region) {
      region = document.createElement("div");
      region.id = "live-announcer";
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "true");
      region.className = "sr-only";
      document.body.appendChild(region);
    }
    
    regionRef.current = region;

    return () => {
      // Don't remove on cleanup as other components might use it
    };
  }, []);

  const announce = useCallback((
    message: string,
    options: LiveAnnouncerOptions = {}
  ) => {
    const { politeness = "polite", timeout = 150 } = options;
    
    if (!regionRef.current) return;

    regionRef.current.setAttribute("aria-live", politeness);
    
    // Clear and set message with a small delay for screen reader detection
    regionRef.current.textContent = "";
    setTimeout(() => {
      if (regionRef.current) {
        regionRef.current.textContent = message;
      }
    }, timeout);
  }, []);

  return { announce };
};
