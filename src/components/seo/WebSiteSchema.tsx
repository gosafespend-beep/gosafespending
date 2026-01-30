import { useEffect } from "react";

const SITE_URL = "https://gosafespend.com";

export const WebSiteSchema = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "website-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Safe Spend",
      "url": SITE_URL,
      "description": "Personal finance companion for tracking expenses, building budgets, and achieving savings goals.",
      "publisher": {
        "@type": "Organization",
        "name": "Safe Spend",
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/favicon.png`
        }
      }
    });

    // Remove existing script if present
    const existing = document.getElementById("website-schema");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("website-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};
