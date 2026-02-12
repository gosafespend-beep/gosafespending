import { useState, useEffect, useCallback, useRef } from "react";

interface UseStickyBarResult {
  showBar: boolean;
  dismissBar: () => void;
}

export const useStickyBar = (heroId: string = "waitlist"): UseStickyBarResult => {
  const [showBar, setShowBar] = useState(false);
  const isDismissedRef = useRef(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("stickyBarDismissed");
    if (dismissed) {
      isDismissedRef.current = true;
      return;
    }

    const heroElement = document.getElementById(heroId);
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBar(!entry.isIntersecting && !isDismissedRef.current);
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    observer.observe(heroElement);

    return () => observer.disconnect();
  }, [heroId]);

  const dismissBar = useCallback(() => {
    setShowBar(false);
    isDismissedRef.current = true;
    sessionStorage.setItem("stickyBarDismissed", "true");
  }, []);

  return { showBar, dismissBar };
};
