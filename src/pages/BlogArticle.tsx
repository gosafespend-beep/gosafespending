import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { BlogArticleSchema } from "@/components/seo/BlogArticleSchema";
import { SEOHead } from "@/components/seo/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowLeft, ArrowUp, User } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/blog/TableOfContents";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  author_name: string;
  category: string | null;
  published_at: string | null;
  updated_at: string;
  reading_time_minutes: number;
  og_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  cta_headline: string | null;
  cta_description: string | null;
  cta_button_text: string | null;
  cta_url: string | null;
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    setReadProgress(progress * 100);
    setShowBackToTop(scrollTop > window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <LegalLayout title="" lastUpdated="">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </LegalLayout>
    );
  }

  if (notFound || !post) {
    return (
      <LegalLayout title="Article Not Found" lastUpdated="">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-foreground mb-3">Article Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been unpublished.
          </p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </LegalLayout>
    );
  }

  const seoTitle = post.meta_title || `${post.title} - Safe Spend Blog`;
  const seoDescription = post.meta_description || post.excerpt || "";

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={post.og_image || post.featured_image || undefined}
        type="article"
      />
      <BlogArticleSchema
        title={post.title}
        description={seoDescription}
        image={post.og_image || post.featured_image || undefined}
        authorName={post.author_name}
        publishedAt={post.published_at || post.updated_at}
        modifiedAt={post.updated_at}
        slug={post.slug}
      />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-primary z-50 transition-all duration-150"
        style={{ width: `${readProgress}%` }}
      />

      <LegalLayout title="" lastUpdated="">
        <div className="max-w-3xl mx-auto">
          <div>
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 no-underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              {post.category && (
                <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4">
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author_name}
                </span>
                {post.published_at && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(post.published_at), "MMMM d, yyyy")}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.reading_time_minutes} min read
                </span>
              </div>
            </header>

            {/* Featured image */}
            {post.featured_image && (
              <div className="mb-10 rounded-xl overflow-hidden border border-border">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            {post.content && <ArticleContent content={post.content} />}

            {/* CTA Section */}
            {post.cta_headline && (
              <div className="mt-14 pt-10 border-t border-border rounded-lg border-x border-b border-primary/20 bg-primary/5 px-5 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {post.cta_headline}
                  </h3>
                  {post.cta_description && (
                    <p className="text-base text-muted-foreground mt-1.5 line-clamp-2">
                      {post.cta_description}
                    </p>
                  )}
                </div>
                {post.cta_url && (
                  <Button asChild size="sm" className="shrink-0">
                    <a href={post.cta_url} target="_blank" rel="noopener noreferrer">
                      {post.cta_button_text || "Get Started"}
                    </a>
                  </Button>
                )}
              </div>
            )}

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Related */}
            <RelatedPosts currentSlug={post.slug} category={post.category} />
          </div>
        </div>
      </LegalLayout>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default BlogArticle;
