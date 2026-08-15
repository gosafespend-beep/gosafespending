/**
 * Analytics.
 *
 * Before this existed the site had no conversion measurement at all: not a
 * single CTA click, signup or subscription event. "Where did this customer
 * come from?" was unanswerable, which made every optimisation unfalsifiable.
 *
 * Two things matter more than the tool choice:
 *
 *  1. `cross_subdomain_cookie` — conversion happens on app.gosafespend.com,
 *     a different host. Without a cookie scoped to .gosafespend.com every
 *     conversion arrives as a fresh anonymous session and attribution is lost
 *     at exactly the moment it matters. The app must init with the same
 *     project and the same setting.
 *
 *  2. Capturing is opted out by default and only enabled once consent is
 *     granted (see ConsentBanner). The site claims GDPR compliance, so
 *     analytics must not run before the visitor agrees.
 */

import posthog from "posthog-js";

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://eu.i.posthog.com";

let started = false;

export const analyticsConfigured = () => Boolean(KEY);

/** Initialises the SDK in an opted-out state. Safe to call more than once. */
export function initAnalytics() {
  if (started || !KEY) return;
  started = true;

  posthog.init(KEY, {
    api_host: HOST,
    cross_subdomain_cookie: true,
    persistence: "localStorage+cookie",
    autocapture: false,
    capture_pageview: false, // routed manually, see usePageviews
    capture_pageleave: true,
    opt_out_capturing_by_default: true,
    disable_session_recording: true,
  });
}

export function enableAnalytics() {
  if (!KEY) return;
  initAnalytics();
  posthog.opt_in_capturing();
}

export function disableAnalytics() {
  if (!KEY || !started) return;
  posthog.opt_out_capturing();
}

/** Records an event. No-ops when analytics is unconfigured or opted out. */
export function track(event: string, properties?: Record<string, unknown>) {
  if (!KEY || !started || posthog.has_opted_out_capturing()) return;
  posthog.capture(event, properties);
}

export function trackPageview(path: string) {
  track("$pageview", { $current_url: window.location.origin + path });
}
