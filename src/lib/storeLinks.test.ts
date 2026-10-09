import { describe, expect, it } from "vitest";
import { detectOS, storeForOS, storeUrl } from "./storeLinks";

const IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148";
const ANDROID =
  "Mozilla/5.0 (Linux; Android 14; SM-A047F) AppleWebKit/537.36 Chrome/126 Mobile Safari/537.36";
const MAC = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15";
const WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126";

describe("detectOS", () => {
  it("recognises iPhone and Android", () => {
    expect(detectOS(IPHONE)).toBe("ios");
    expect(detectOS(ANDROID)).toBe("android");
  });

  it("treats a touch-capable Macintosh UA as an iPad", () => {
    expect(detectOS(MAC, 5)).toBe("ios");
  });

  it("does not mistake a desktop Mac or Windows for a phone", () => {
    expect(detectOS(MAC, 0)).toBe("other");
    expect(detectOS(WINDOWS)).toBe("other");
  });
});

describe("storeUrl", () => {
  it("passes the page location to Google Play as an encoded referrer", () => {
    const url = new URL(storeUrl("android", "hero"));
    expect(url.hostname).toBe("play.google.com");
    expect(url.searchParams.get("id")).toBe("com.safespend.app");
    const referrer = new URLSearchParams(url.searchParams.get("referrer") ?? "");
    expect(referrer.get("utm_source")).toBe("landing");
    expect(referrer.get("utm_content")).toBe("hero");
  });

  it("points iOS at the app's App Store page with a campaign token", () => {
    const url = new URL(storeUrl("ios", "pricing"));
    expect(url.hostname).toBe("apps.apple.com");
    expect(url.pathname).toBe("/app/id6796527654");
    expect(url.searchParams.get("ct")).toBe("landing_pricing");
  });
});

describe("storeForOS", () => {
  it("returns null when there is no matching store", () => {
    expect(storeForOS("other")).toBeNull();
    expect(storeForOS("ios")).toBe("ios");
  });
});
