import { useState, useEffect, useCallback } from "react";

interface UseStickyBarResult {
  showBar: boolean;
  dismissBar: () => void;
}

export const useStickyBar = (heroId: string = "waitlist"): UseStickyBarResult => {
  const [showBar, setShowBar] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem("stickyBarDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const heroElement = document.getElementById(heroId);
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when hero section is not visible (scrolled past it)
        setShowBar(!entry.isIntersecting && !isDismissed);
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    observer.observe(heroElement);

    return () => observer.disconnect();
  }, [heroId, isDismissed]);

  const dismissBar = useCallback(() => {
    setShowBar(false);
    setIsDismissed(true);
    sessionStorage.setItem("stickyBarDismissed", "true");
  }, []);

  return { showBar, dismissBar };
};
