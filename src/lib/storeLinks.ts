/**
 * Links to the native apps, tagged so installs can be attributed to the part
 * of the page that produced them.
 *
 * The web CTAs already carry UTMs to app.gosafespend.com (see appLink.ts).
 * A store visit is a hop across a boundary we do not control, so what survives
 * it is limited:
 *  - Google Play forwards the `referrer` parameter to the installed app via the
 *    Install Referrer API, and shows it in Play Console acquisition reports.
 *  - The App Store ignores arbitrary query parameters. `ct` (campaign token)
 *    reports in App Store Connect > Analytics > Campaigns only when paired
 *    with the account's provider token (`pt`); Apple shows a campaign once at
 *    least 5 distinct Apple Accounts have installed through it.
 */

import { ANDROID_STORE_URL, IOS_PROVIDER_TOKEN, IOS_STORE_URL } from "./constants";

export type Store = "ios" | "android";
export type MobileOS = Store | "other";

/** Every place a store link can appear. Closed so each is reported by name. */
export type StoreLocation =
  | "hero"
  | "nav"
  | "nav_mobile"
  | "safe_to_spend"
  | "features"
  | "pricing"
  | "final_cta"
  | "footer"
  | "sticky_bar"
  | "download_page"
  | "qr";

/**
 * iPadOS 13+ identifies as a Mac. A Mac with a touchscreen is an iPad, so the
 * touch-point check is what separates them.
 */
export function detectOS(
  userAgent: string,
  maxTouchPoints = 0,
): MobileOS {
  if (/android/i.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "ios";
  if (/macintosh/i.test(userAgent) && maxTouchPoints > 1) return "ios";
  return "other";
}

export function currentOS(): MobileOS {
  if (typeof navigator === "undefined") return "other";
  return detectOS(navigator.userAgent, navigator.maxTouchPoints);
}

export function storeUrl(store: Store, location: StoreLocation): string {
  if (store === "android") {
    const referrer = new URLSearchParams({
      utm_source: "landing",
      utm_medium: "store_badge",
      utm_content: location,
    }).toString();
    return `${ANDROID_STORE_URL}&referrer=${encodeURIComponent(referrer)}`;
  }

  const url = new URL(IOS_STORE_URL);
  url.searchParams.set("pt", IOS_PROVIDER_TOKEN);
  url.searchParams.set("ct", `landing_${location}`);
  url.searchParams.set("mt", "8");
  return url.toString();
}

/** The store that matches the device, or null on desktop / unknown. */
export function storeForOS(os: MobileOS): Store | null {
  return os === "other" ? null : os;
}
