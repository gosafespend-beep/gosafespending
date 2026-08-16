/**
 * Analytics.
 *
 * Before this existed the site had no conversion measurement at all: not a
 * single CTA click, signup or subscription event. "Where did this customer
 * come from?" was unanswerable, which made every optimisation unfalsifiable.
 *
 * Three things matter more than the tool choice:
 *
 *  1. The SDK is loaded with a dynamic import, only after consent is granted.
 *     Bundling it statically added ~60 KB gzipped to the homepage for code
 *     that must not run until the visitor agrees to it.
 *
 *  2. `cross_subdomain_cookie` -- conversion happens on app.gosafespend.com,
 *     a different host. Without a cookie scoped to .gosafespend.com every
 *     conversion arrives as a fresh anonymous session and attribution is lost
 *     at exactly the moment it matters. The app must init the same project
 *     with the same setting.
 *
 *  3. Events raised before the SDK finishes loading are queued rather than
 *     dropped, so a click on a CTA immediately after consent still counts.
 */

import type { PostHog } from "posthog-js";
import {
  disableGa,
  enableGa,
  gaConfigured,
  gaEvent,
  gaPageview,
} from "./gtag";

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://eu.i.posthog.com";

let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
const queue: Array<[string, Record<string, unknown> | undefined]> = [];

/*
 * Two destinations, one call site. GA4 answers "which channels bring traffic
 * that converts"; PostHog answers "what did this specific person do". They are
 * complementary, and either can be switched off by clearing its env var —
 * nothing else in the codebase changes.
 *
 * The rest of the app calls track()/trackPageview() and never touches either
 * SDK directly.
 */
export const analyticsConfigured = () => Boolean(KEY) || gaConfigured();

async function load(): Promise<PostHog | null> {
  if (client) return client;
  if (!KEY) return null;
  if (loading) return loading;

  loading = import("posthog-js").then(({ default: posthog }) => {
    posthog.init(KEY, {
      api_host: HOST,
      cross_subdomain_cookie: true,
      persistence: "localStorage+cookie",
      autocapture: false,
      capture_pageview: false, // routed manually, see PageviewTracker
      capture_pageleave: true,
      disable_session_recording: true,
    });
    client = posthog;

    for (const [event, properties] of queue.splice(0)) {
      posthog.capture(event, properties);
    }
    return posthog;
  });

  return loading;
}

/** Called once consent is granted. Starts every configured destination. */
export function enableAnalytics() {
  void load();
  void enableGa();
}

/** Called when consent is declined or withdrawn. */
export function disableAnalytics() {
  queue.length = 0;
  client?.opt_out_capturing();
  client = null;
  disableGa();
}

/**
 * Records an event on every configured destination.
 *
 * No-ops when nothing is configured, and queues for PostHog when consent was
 * granted but its SDK is still in flight, so a CTA click immediately after
 * "Allow" still counts.
 */
export function track(event: string, properties?: Record<string, unknown>) {
  if (KEY) {
    if (client) {
      client.capture(event, properties);
    } else if (loading) {
      queue.push([event, properties]);
    }
  }
  // GA4 event names must be snake_case and under 40 chars; ours already are.
  gaEvent(event, properties);
}

export function trackPageview(path: string) {
  if (KEY) {
    track("$pageview", { $current_url: window.location.origin + path });
  }
  gaPageview(path);
}
