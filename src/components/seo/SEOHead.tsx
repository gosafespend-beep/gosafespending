import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

const BASE_URL = "https://gosafespend.com";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png?v=2`;
const SITE_NAME = "Safe Spend";

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Safe Spend - Personal Finance Tracker",
    description: "Track your spending, budgets, and savings goals with Safe Spend. Privacy-first, AI-powered personal finance tracker. Start your free trial today.",
  },
  "/contact": {
    title: "Contact Us - Safe Spend",
    description: "Get in touch with the Safe Spend team. We'd love to hear from you about questions, feedback, or partnership opportunities.",
  },
  "/about": {
    title: "About Us - Safe Spend",
    description: "Learn about Safe Spend's mission to make personal finance simple, private, and accessible for everyone.",
  },
  "/blog": {
    title: "Blog - Safe Spend",
    description: "Tips, guides, and insights on budgeting, saving, and managing your money. Learn smart personal finance strategies.",
  },
  "/tools/budget-calculator": {
    title: "Free 50/30/20 Budget Calculator - Safe Spend",
    description: "Calculate your ideal budget breakdown with our free 50/30/20 rule calculator. Split your income into needs, wants, and savings instantly.",
  },
  "/tools/compound-interest-calculator": {
    title: "Free Compound Interest Calculator - Safe Spend",
    description: "See how your savings grow over time with our free compound interest calculator. Enter your investment, contributions, and rate to project future value.",
  },
  "/tools/debt-payoff-calculator": {
    title: "Free Debt Payoff Calculator - Snowball vs Avalanche - Safe Spend",
    description: "Compare snowball and avalanche debt payoff strategies. Find the fastest, cheapest way to become debt-free with our free calculator.",
  },
  "/tools/emergency-fund-calculator": {
    title: "Free Emergency Fund Calculator - Safe Spend",
    description: "Calculate how much you need in your emergency fund. See 3, 6, and 9 month targets with progress tracking and timeline estimates.",
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
  "/refund-policy": {
    title: "Refund Policy - Safe Spend",
    description: "Understand Safe Spend's refund policy, including free trial terms, cancellation, and billing dispute procedures.",
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
  
  const pageData = pageMetadata[pathname];

  /*
   * Pages not in the map (blog articles) supply their own metadata via props.
   * Falling back to pageMetadata["/"] here meant a generic instance -- the one
   * LegalLayout renders for every page built on it -- would overwrite an
   * article's real title and og:type with the homepage's. Bail instead, so
   * only the instance that actually knows the metadata writes it.
   */
  const shouldRender = Boolean(title || pageData);

  const finalTitle = title || pageData?.title || "";
  const finalDescription = description || pageData?.description || "";
  const canonicalUrl = `${BASE_URL}${pathname === "/" ? "" : pathname}`;

  useEffect(() => {
    if (!shouldRender) return;

    document.title = finalTitle;

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

    updateMetaTag('meta[name="description"]', finalDescription);
    updateMetaTag('meta[property="og:title"]', finalTitle);
    updateMetaTag('meta[property="og:description"]', finalDescription);
    updateMetaTag('meta[property="og:url"]', canonicalUrl);
    updateMetaTag('meta[property="og:image"]', image);
    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[name="twitter:title"]', finalTitle);
    updateMetaTag('meta[name="twitter:description"]', finalDescription);
    updateMetaTag('meta[name="twitter:image"]', image);
    updateMetaTag('meta[property="og:image:width"]', "1200");
    updateMetaTag('meta[property="og:image:height"]', "630");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

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
  }, [shouldRender, finalTitle, finalDescription, canonicalUrl, image, type, noIndex]);

  return null;
};
