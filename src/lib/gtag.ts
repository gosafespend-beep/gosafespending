/**
 * Google Analytics 4.
 *
 * Deliberately not the copy-paste snippet in index.html, for three reasons:
 *
 *  1. That snippet fires on page load, before the visitor has agreed to
 *     anything. This site advertises GDPR compliance as a headline trust
 *     feature, so analytics must not run until consent is granted.
 *  2. The site's CSP sets `script-src 'self'`, which would block an inline
 *     bootstrap and the googletagmanager.com host outright.
 *  3. Conversion happens on app.gosafespend.com, a different domain. Without
 *     cross-domain measurement, every conversion arrives as a brand-new
 *     session from a self-referral and attribution is lost at exactly the
 *     moment it matters — which is the whole reason we added analytics.
 *
 * Consent Mode v2 is used rather than simply withholding the script: GA can
 * then model conversions from users who decline, instead of losing them
 * entirely, and the consent signal is recorded properly.
 */

/*
 * The GA4 measurement ID is PUBLIC -- it ships in the JS bundle either way, and
 * Google's own install snippet puts it directly in your HTML. So it lives here
 * as the default rather than in an env var: Lovable has no build-time
 * environment-variable UI, and requiring one would mean analytics silently
 * never ran.
 *
 * The env var still overrides it, so a staging deploy can point at a separate
 * property without touching code.
 *
 * Anything that would be damaging to publish must NOT live here, and must not
 * carry a VITE_ prefix -- those are compiled into the bundle by design. Real
 * secrets (service role, Paystack, Resend, cron) belong in Supabase edge
 * function secrets.
 */
const GA_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ||
  "G-LGGKR2FEEW";

/** Both hosts must be listed so the linker decorates outbound app links. */
const LINKED_DOMAINS = ["gosafespend.com", "app.gosafespend.com"];

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let scriptLoaded = false;
let bootstrapped = false;

export const gaConfigured = () => Boolean(GA_ID);

/** The measurement ID actually in effect. Useful when debugging which
 *  property a deploy is reporting to. */
export const gaMeasurementId = () => GA_ID;

function ensureGtagStub() {
  if (bootstrapped) return;
  bootstrapped = true;

  window.dataLayer = window.dataLayer || [];
  // Must be a function declaration using `arguments`, not a rest-arg arrow:
  // gtag relies on the raw `arguments` object being pushed.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());

  // Deny everything until the visitor says otherwise. Setting the default
  // BEFORE the library loads is what makes Consent Mode work.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

function loadScript(): Promise<void> {
  if (scriptLoaded || !GA_ID) return Promise.resolve();
  scriptLoaded = true;

  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.onload = () => resolve();
    s.onerror = () => {
      // An ad blocker is a normal outcome, not an error worth surfacing.
      scriptLoaded = false;
      resolve();
    };
    document.head.appendChild(s);
  });
}

/** Called once consent is granted. Loads GA and turns storage on. */
export async function enableGa() {
  if (!GA_ID) return;

  ensureGtagStub();
  await loadScript();

  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });

  window.gtag("config", GA_ID, {
    // Pageviews are sent manually — this is a SPA, so the automatic one
    // would fire once and miss every client-side route change.
    send_page_view: false,
    // Cross-domain measurement. Also set the same list under
    // Admin -> Data Streams -> Configure tag settings -> Configure your
    // domains, or the linker will not decorate links in every case.
    linker: { domains: LINKED_DOMAINS, decorate_forms: true },
    anonymize_ip: true,
  });

  /*
   * Send the landing pageview now.
   *
   * The route effect that normally reports pageviews runs on mount, which is
   * before the visitor has answered the consent banner — so without this, the
   * entry page of every consenting session was silently dropped, and every
   * session appeared to begin on whatever page they navigated to second.
   * That would have quietly corrupted landing-page and referrer reporting.
   */
  gaPageview(window.location.pathname);
}

/** Called when consent is declined or withdrawn. */
export function disableGa() {
  if (!GA_ID || !bootstrapped) return;
  window.gtag("consent", "update", { analytics_storage: "denied" });
}

/** Records an event. No-ops until GA is configured and consented. */
export function gaEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID || !scriptLoaded) return;
  window.gtag("event", name, params);
}

let lastPath: string | null = null;

/**
 * Reports a pageview, ignoring a repeat of the path just reported.
 *
 * Two callers race on the entry page: enableGa() sends the landing pageview
 * (because the router effect ran before consent), and the router effect sends
 * it again on mount when consent was already stored. Without this guard every
 * session double-counted its first page.
 */
export function gaPageview(path: string) {
  if (!GA_ID || !scriptLoaded) return;
  if (path === lastPath) return;
  lastPath = path;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}
