import { useEffect } from "react";

interface BlogArticleSchemaProps {
  title: string;
  description: string;
  image?: string;
  authorName: string;
  publishedAt: string;
  modifiedAt?: string;
  slug: string;
}

const BASE_URL = "https://gosafespend.com";

export const BlogArticleSchema = ({
  title,
  description,
  image,
  authorName,
  publishedAt,
  modifiedAt,
  slug,
}: BlogArticleSchemaProps) => {
  useEffect(() => {
    const existing = document.querySelector('script[data-schema="blog-article"]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      image: image || `${BASE_URL}/og-image.png`,
      author: {
        "@type": "Person",
        name: authorName,
      },
      publisher: {
        "@type": "Organization",
        name: "Safe Spend",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/favicon.png`,
        },
      },
      datePublished: publishedAt,
      dateModified: modifiedAt || publishedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${BASE_URL}/blog/${slug}`,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "blog-article");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [title, description, image, authorName, publishedAt, modifiedAt, slug]);

  return null;
};
