import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

const BASE_URL = "https://gosafespending.lovable.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = "Safe Spend";

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Safe Spend - Take Control of Your Money",
    description: "Track expenses, build budgets, crush debt, and grow your savings — all in one beautiful dashboard.",
  },
  "/contact": {
    title: "Contact Us - Safe Spend",
    description: "Get in touch with the Safe Spend team. We'd love to hear from you about questions, feedback, or partnership opportunities.",
  },
  "/privacy-policy": {
    title: "Privacy Policy - Safe Spend",
    description: "Learn how Safe Spend protects your personal and financial data with industry-leading security practices.",
  },
  "/terms-of-service": {
    title: "Terms of Service - Safe Spend",
    description: "Read the terms and conditions for using Safe Spend's personal finance tracking platform.",
  },
  "/cookies-policy": {
    title: "Cookies Policy - Safe Spend",
    description: "Understand how Safe Spend uses cookies and similar technologies to improve your experience.",
  },
};

export const SEOHead = ({ 
  title, 
  description, 
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false 
}: SEOHeadProps) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  const pageData = pageMetadata[pathname] || pageMetadata["/"];
  const finalTitle = title || pageData.title;
  const finalDescription = description || pageData.description;
  const canonicalUrl = `${BASE_URL}${pathname === "/" ? "" : pathname}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, content: string, attribute = "content") => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        const [attr, value] = selector.replace(/[\[\]"']/g, "").split("=");
        if (attr === "name" || attr === "property") {
          element.setAttribute(attr, value);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Update meta description
    updateMetaTag('meta[name="description"]', finalDescription);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', finalTitle);
    updateMetaTag('meta[property="og:description"]', finalDescription);
    updateMetaTag('meta[property="og:url"]', canonicalUrl);
    updateMetaTag('meta[property="og:image"]', image);
    updateMetaTag('meta[property="og:type"]', type);

    // Update Twitter tags
    updateMetaTag('meta[name="twitter:title"]', finalTitle);
    updateMetaTag('meta[name="twitter:description"]', finalDescription);
    updateMetaTag('meta[name="twitter:image"]', image);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Handle noindex
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (noIndex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.content = "noindex, nofollow";
    } else if (robots) {
      robots.remove();
    }
  }, [finalTitle, finalDescription, canonicalUrl, image, type, noIndex]);

  return null;
};
