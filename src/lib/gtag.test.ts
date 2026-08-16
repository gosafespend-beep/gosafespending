import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

/*
 * The gtag stub is easy to get subtly wrong in ways that fail silently:
 *
 *  - gtag relies on the raw `arguments` object being pushed onto dataLayer.
 *    A rest-arg arrow function pushes a plain array instead, and the library
 *    quietly ignores every call.
 *  - Consent Mode only works if the default is set BEFORE the script loads.
 *    Get the order wrong and analytics_storage is granted from the start,
 *    which is exactly what the consent banner exists to prevent.
 *
 * Neither failure is visible in the browser, so they need tests.
 */

const asCalls = () =>
  (window.dataLayer ?? []).map((a) => Array.from(a as IArguments));

describe("gtag bootstrap", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-TESTID0000");
    (window as unknown as { dataLayer?: unknown[] }).dataLayer = undefined;
    (window as unknown as { gtag?: unknown }).gtag = undefined;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reports itself configured when a measurement ID is present", async () => {
    const { gaConfigured } = await import("./gtag");
    expect(gaConfigured()).toBe(true);
  });

  it("pushes an arguments object, not an array", async () => {
    const { enableGa } = await import("./gtag");
    void enableGa();

    expect(Array.isArray(window.dataLayer)).toBe(true);
    expect(window.dataLayer.length).toBeGreaterThan(0);
    expect(Object.prototype.toString.call(window.dataLayer[0])).toBe(
      "[object Arguments]",
    );
  });

  it("denies analytics and ad storage by default", async () => {
    const { enableGa } = await import("./gtag");
    void enableGa();

    const consentDefault = asCalls().find(
      (c) => c[0] === "consent" && c[1] === "default",
    );
    expect(consentDefault).toBeDefined();

    const flags = consentDefault![2] as Record<string, string>;
    expect(flags.analytics_storage).toBe("denied");
    expect(flags.ad_storage).toBe("denied");
    expect(flags.ad_personalization).toBe("denied");
  });

  it("sets the consent default before any config call", async () => {
    const { enableGa } = await import("./gtag");
    void enableGa();

    const calls = asCalls();
    const consentIdx = calls.findIndex((c) => c[0] === "consent");
    const configIdx = calls.findIndex((c) => c[0] === "config");
    expect(consentIdx).toBeGreaterThanOrEqual(0);
    // config may not have run yet, since it awaits the script load — but if
    // it has, consent must come first.
    if (configIdx >= 0) expect(consentIdx).toBeLessThan(configIdx);
  });

  it("does nothing at all when no measurement ID is set", async () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
    vi.resetModules();
    const { gaConfigured, enableGa, gaEvent } = await import("./gtag");

    expect(gaConfigured()).toBe(false);
    void enableGa();
    gaEvent("cta_click", { location: "hero" });
    expect(window.dataLayer).toBeUndefined();
  });

  it("drops events before consent is granted", async () => {
    const { gaEvent } = await import("./gtag");
    // No enableGa() means no consent and no script — nothing may be recorded.
    gaEvent("cta_click", { location: "hero" });
    expect(window.dataLayer).toBeUndefined();
  });
});
