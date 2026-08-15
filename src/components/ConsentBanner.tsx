import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  analyticsConfigured,
  disableAnalytics,
  enableAnalytics,
} from "@/lib/analytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STORAGE_KEY = "ss_analytics_consent";
type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Analytics consent.
 *
 * The site advertises GDPR compliance as a headline trust feature while
 * previously setting an analytics cookie on first load with no way to decline.
 * Self-hosted rather than a third-party CMP, which would mean adding another
 * tracker to a page whose whole proposition is privacy.
 *
 * Declining is a single click and is weighted the same as accepting -- a
 * "reject" buried behind a settings dialog is not a real choice.
 */
export const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!analyticsConfigured()) return;

    // Nothing loads until this resolves to "granted" -- the SDK itself is a
    // dynamic import, so declining downloads no analytics code at all.
    const existing = readConsent();

    if (existing === "granted") enableAnalytics();
    else if (existing === null) setVisible(true);
  }, []);

  const decide = (choice: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage unavailable: honour the choice for this page view only.
    }
    if (choice === "granted") enableAnalytics();
    else disableAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-heading"
      className={`fixed bottom-0 inset-x-0 z-[60] border-t border-border bg-card/98 backdrop-blur-md ${
        prefersReducedMotion ? "" : "animate-in slide-in-from-bottom duration-300"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex-1">
          <h2 id="consent-heading" className="text-sm font-semibold text-foreground">
            Help us understand what's working
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            We'd like to measure which pages people find useful. No advertising
            trackers, no data sold, and the site works exactly the same either
            way.{" "}
            <Link to="/cookies-policy" className="text-primary underline">
              Cookies policy
            </Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            className="h-11 flex-1 sm:flex-none"
            onClick={() => decide("denied")}
          >
            No thanks
          </Button>
          <Button
            className="h-11 flex-1 sm:flex-none"
            onClick={() => decide("granted")}
          >
            Allow
          </Button>
        </div>
      </div>
    </div>
  );
};
