import { useEffect } from "react";

/**
 * Book structured data for /ebook.
 *
 * Mounted only by the ebook page, for the same reason SEOHead is not global:
 * a schema block that describes a book has no business on the homepage.
 */
export const BookSchema = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Book",
      name: "Thirty Seconds a Day: A Practical Guide to Financial Clarity",
      author: { "@type": "Organization", name: "Safe Spend" },
      publisher: { "@type": "Organization", name: "Safe Spend" },
      bookFormat: "https://schema.org/EBook",
      inLanguage: "en",
      numberOfPages: 53,
      datePublished: "2026-01-01",
      url: "https://gosafespend.com/ebook",
      image: "https://gosafespend.com/og-image.png",
      description:
        "A free 53-page guide to seeing where your money actually goes: 12 chapters, 6 worksheets, a glossary and a 30-day money clarity plan. No bank login required.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://gosafespend.com/ebook",
      },
    };

    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.text = JSON.stringify(schema);
    tag.dataset.schema = "book";
    document.head.appendChild(tag);

    return () => {
      tag.remove();
    };
  }, []);

  return null;
};
