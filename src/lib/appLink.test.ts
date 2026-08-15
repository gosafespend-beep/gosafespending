import { describe, it, expect, beforeEach } from "vitest";
import { appUrl, captureFirstTouch } from "./appLink";

/*
 * Attribution regression tests.
 *
 * Every CTA leaves the measured domain for app.gosafespend.com. If these
 * params stop being attached, conversions silently become unattributable --
 * which is exactly the state the site was in before, and it is invisible
 * until you go looking for the data months later.
 */

const setSearch = (search: string) => {
  window.history.replaceState({}, "", `/${search}`);
};

describe("appUrl", () => {
  beforeEach(() => {
    localStorage.clear();
    setSearch("");
  });

  it("tags the CTA position so each button is distinguishable", () => {
    const url = new URL(appUrl("hero"));
    expect(url.searchParams.get("utm_source")).toBe("landing");
    expect(url.searchParams.get("utm_medium")).toBe("cta");
    expect(url.searchParams.get("utm_content")).toBe("hero");
  });

  it("carries the chosen plan so the app can preselect it", () => {
    const url = new URL(appUrl("pricing", { plan: "annual" }));
    expect(url.searchParams.get("plan")).toBe("annual");
  });

  it("omits plan when none was chosen", () => {
    expect(new URL(appUrl("nav")).searchParams.has("plan")).toBe(false);
  });

  it("points at the app, not the marketing site", () => {
    expect(new URL(appUrl("hero")).origin).toBe("https://app.gosafespend.com");
  });

  it("supports a path for the login entry point", () => {
    expect(new URL(appUrl("nav_login", { path: "/login" })).pathname).toBe("/login");
  });
});

describe("captureFirstTouch", () => {
  beforeEach(() => {
    localStorage.clear();
    setSearch("");
  });

  it("forwards the original campaign onto the app link", () => {
    setSearch("?utm_source=newsletter&utm_campaign=march");
    captureFirstTouch();

    const url = new URL(appUrl("hero"));
    expect(url.searchParams.get("ft_utm_source")).toBe("newsletter");
    expect(url.searchParams.get("ft_utm_campaign")).toBe("march");
    // The CTA's own tagging is separate from where the visitor came from.
    expect(url.searchParams.get("utm_source")).toBe("landing");
  });

  it("keeps the first touch when a later visit carries a different campaign", () => {
    setSearch("?utm_source=google");
    captureFirstTouch();

    setSearch("?utm_source=facebook");
    captureFirstTouch();

    expect(new URL(appUrl("hero")).searchParams.get("ft_utm_source")).toBe("google");
  });

  it("records the landing path", () => {
    captureFirstTouch();
    expect(new URL(appUrl("hero")).searchParams.get("ft_landing_path")).toBe("/");
  });

  it("does not throw when storage is unavailable", () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error("QuotaExceededError");
    };
    expect(() => captureFirstTouch()).not.toThrow();
    expect(() => appUrl("hero")).not.toThrow();
    Storage.prototype.setItem = original;
  });
});
