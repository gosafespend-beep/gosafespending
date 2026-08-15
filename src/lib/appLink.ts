/**
 * Outbound links to the app, with attribution attached.
 *
 * Every CTA on the site is a plain anchor to a different subdomain. Without
 * this, the visitor leaves the measured domain carrying nothing, so which CTA
 * works, which section precedes conversion and which channel produces paying
 * users are all unanswerable.
 *
 * The app must read these params at signup and persist them onto the user
 * record, or the chain still breaks at the boundary.
 */

import { APP_URL } from "./constants";

const FIRST_TOUCH_KEY = "ss_first_touch";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "ref",
  "gclid",
  "fbclid",
] as const;

type FirstTouch = Record<string, string>;

/**
 * Records how this visitor first arrived. First touch wins: a visitor who
 * finds you through search and returns later via a campaign link is still
 * attributed to search, which is what you want for channel accounting.
 */
export function captureFirstTouch() {
  try {
    if (localStorage.getItem(FIRST_TOUCH_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const touch: FirstTouch = {
      landing_path: window.location.pathname,
      landed_at: new Date().toISOString(),
    };

    for (const key of TRACKED_PARAMS) {
      const value = params.get(key);
      if (value) touch[key] = value.slice(0, 120);
    }
    if (document.referrer && !document.referrer.includes("gosafespend.com")) {
      touch.referrer = document.referrer.slice(0, 200);
    }

    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
  } catch {
    // Private browsing / storage disabled. Attribution is best-effort.
  }
}

function readFirstTouch(): FirstTouch {
  try {
    return JSON.parse(localStorage.getItem(FIRST_TOUCH_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export type CtaLocation =
  | "hero"
  | "nav"
  | "nav_mobile"
  | "nav_login"
  | "pricing"
  | "sticky_bar"
  | "final_cta"
  | "how_it_works";

/**
 * Builds the app URL for a CTA, tagged with its position and (for pricing)
 * the plan the visitor chose, plus the original acquisition context.
 */
export function appUrl(
  location: CtaLocation,
  options: { plan?: "monthly" | "annual"; path?: string } = {},
): string {
  const url = new URL(options.path ?? "", APP_URL);

  url.searchParams.set("utm_source", "landing");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_content", location);
  if (options.plan) url.searchParams.set("plan", options.plan);

  for (const [key, value] of Object.entries(readFirstTouch())) {
    url.searchParams.set(`ft_${key}`, String(value));
  }

  return url.toString();
}
