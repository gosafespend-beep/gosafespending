import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://gosafespend.com";

const breadcrumbNames: Record<string, string> = {
  "/": "Home",
  "/contact": "Contact",
  "/about": "About",
  "/blog": "Blog",
  "/tools/budget-calculator": "Budget Calculator",
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

    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
    ];

    // Handle nested paths like /tools/budget-calculator
    if (segments.length > 1) {
      segments.forEach((_, index) => {
        const partialPath = "/" + segments.slice(0, index + 1).join("/");
        breadcrumbItems.push({
          "@type": "ListItem",
          position: index + 2,
          name: breadcrumbNames[partialPath] || segments[index].replace(/-/g, " "),
          item: `${BASE_URL}${partialPath}`,
        });
      });
    } else {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: breadcrumbNames[pathname] || "Page",
        item: `${BASE_URL}${pathname}`,
      });
    }

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
