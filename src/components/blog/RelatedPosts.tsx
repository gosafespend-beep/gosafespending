import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

interface RelatedPostsProps {
  currentSlug: string;
  category: string | null;
}

interface Post {
  title: string;
  slug: string;
  excerpt: string | null;
}

export const RelatedPosts = ({ currentSlug, category }: RelatedPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      let query = supabase
        .from("blog_posts")
        .select("title, slug, excerpt")
        .eq("is_published", true)
        .neq("slug", currentSlug)
        .order("published_at", { ascending: false })
        .limit(4);

      if (category) {
        query = query.eq("category", category);
      }

      const { data } = await query;

      if (!data || data.length === 0) {
        const { data: fallback } = await supabase
          .from("blog_posts")
          .select("title, slug, excerpt")
          .eq("is_published", true)
          .neq("slug", currentSlug)
          .order("published_at", { ascending: false })
          .limit(4);
        setPosts(fallback || []);
      } else {
        setPosts(data);
      }
    };

    fetchRelated();
  }, [currentSlug, category]);

  if (posts.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-border">
      <h2 className="text-lg font-semibold text-foreground mb-5">Continue Reading</h2>
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex items-start justify-between gap-4 rounded-lg border border-border bg-card/50 px-4 py-3 hover:border-primary/40 transition-colors"
          >
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {post.excerpt}
                </p>
              )}
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
};
