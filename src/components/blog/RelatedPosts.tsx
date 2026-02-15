import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentSlug: string;
  category: string | null;
}

interface Post {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  published_at: string | null;
  reading_time_minutes: number;
  author_name: string;
}

export const RelatedPosts = ({ currentSlug, category }: RelatedPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      let query = supabase
        .from("blog_posts")
        .select("title, slug, excerpt, featured_image, category, published_at, reading_time_minutes, author_name")
        .eq("is_published", true)
        .neq("slug", currentSlug)
        .order("published_at", { ascending: false })
        .limit(3);

      if (category) {
        query = query.eq("category", category);
      }

      const { data } = await query;

      // If no posts match the category, fall back to latest posts
      if (!data || data.length === 0) {
        const { data: fallback } = await supabase
          .from("blog_posts")
          .select("title, slug, excerpt, featured_image, category, published_at, reading_time_minutes, author_name")
          .eq("is_published", true)
          .neq("slug", currentSlug)
          .order("published_at", { ascending: false })
          .limit(3);
        setPosts(fallback || []);
      } else {
        setPosts(data);
      }
    };

    fetchRelated();
  }, [currentSlug, category]);

  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            featuredImage={post.featured_image}
            category={post.category}
            publishedAt={post.published_at}
            readingTime={post.reading_time_minutes}
            authorName={post.author_name}
          />
        ))}
      </div>
    </section>
  );
};
