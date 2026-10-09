import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ANDROID_STORE_URL,
  IOS_STORE_URL,
  SITE_URL,
} from "@/lib/constants";

/**
 * MobileApplication JSON-LD for the two native apps.
 *
 * Deliberately has no rating or review properties: structured data must
 * describe what a page's visitors can actually verify, and neither store
 * listing has ratings yet. Add `aggregateRating` only when it is copied from a
 * real store listing.
 */
export const MobileAppSchema = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/download") return;

    const existing = document.querySelector('script[data-schema="mobile-apps"]');
    if (existing) existing.remove();

    const common = {
      "@type": "MobileApplication",
      applicationCategory: "FinanceApplication",
      description:
        "Safe Spend shows what's safe to spend today after bills and goals. Track expenses, scan receipts, import statements and plan ahead without sharing your bank login.",
      url: `${SITE_URL}/download`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "Safe Spend", url: SITE_URL },
    };

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          ...common,
          name: "Safe Spend: Budget Tracker",
          operatingSystem: "iOS",
          downloadUrl: IOS_STORE_URL,
        },
        {
          ...common,
          name: "SafeSpend: Budget & Expenses",
          operatingSystem: "Android",
          downloadUrl: ANDROID_STORE_URL,
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "mobile-apps");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, [pathname]);

  return null;
};
