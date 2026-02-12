import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  published_at: string | null;
  reading_time_minutes: number;
  author_name: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image, category, published_at, reading_time_minutes, author_name")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.category).filter(Boolean))] as string[],
    [posts]
  );

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <LegalLayout title="Blog" lastUpdated="">
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
            <Newspaper className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">No Articles Yet</h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            We're working on helpful articles about budgeting, saving, and building better money habits. Check back soon!
          </p>
        </div>
      ) : (
        <>
          <BlogFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogCard
                key={post.id}
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
        </>
      )}
    </LegalLayout>
  );
};

export default BlogList;
