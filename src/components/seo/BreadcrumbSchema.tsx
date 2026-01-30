import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://gosafespend.com";

const breadcrumbNames: Record<string, string> = {
  "/": "Home",
  "/contact": "Contact",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-service": "Terms of Service",
  "/cookies-policy": "Cookies Policy",
};

/**
 * Generates BreadcrumbList JSON-LD schema for better search appearance
 */
export const BreadcrumbSchema = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Remove existing breadcrumb schema
    const existing = document.querySelector('script[data-schema="breadcrumb"]');
    if (existing) existing.remove();

    // Don't add breadcrumb for home page
    if (pathname === "/") return;

    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbNames[pathname] || "Page",
        item: `${BASE_URL}${pathname}`,
      },
    ];

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "breadcrumb");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [pathname]);

  return null;
};
