/**
 * Analytics consent, shared across gosafespend.com and app.gosafespend.com.
 *
 * Stored as a cookie on `.gosafespend.com` rather than in localStorage, which
 * is origin-scoped. A visitor who answers the banner on the marketing site
 * would otherwise be asked again the moment they signed in — the same question
 * twice, which reads as either broken or manipulative.
 *
 * It also keeps the two surfaces honest with each other: someone who declines
 * on the landing page is not silently tracked once they reach the app.
 */

export type Consent = "granted" | "denied";

const COOKIE = "ss_analytics_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Cookie domain. On localhost the domain attribute must be omitted entirely —
 * browsers reject `domain=localhost`, which would silently drop the cookie.
 */
function cookieDomain(): string {
  const { hostname } = window.location;
  return hostname.endsWith("gosafespend.com") ? "; domain=.gosafespend.com" : "";
}

export function readConsent(): Consent | null {
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${COOKIE}=(granted|denied)`),
    );
    if (match) return match[1] as Consent;

    // Migrate anyone who answered before this moved out of localStorage.
    const legacy = localStorage.getItem(COOKIE);
    if (legacy === "granted" || legacy === "denied") {
      writeConsent(legacy);
      localStorage.removeItem(COOKIE);
      return legacy;
    }
  } catch {
    // Storage blocked. Treat as undecided rather than assuming consent.
  }
  return null;
}

export function writeConsent(value: Consent) {
  try {
    document.cookie =
      `${COOKIE}=${value}; path=/; max-age=${ONE_YEAR}` +
      `${cookieDomain()}; SameSite=Lax` +
      `${window.location.protocol === "https:" ? "; Secure" : ""}`;
  } catch {
    // Nothing to fall back to; the caller still honours the choice in-session.
  }
}
