import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { BlogArticleSchema } from "@/components/seo/BlogArticleSchema";
import { SEOHead } from "@/components/seo/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
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
  meta_title: string | null;
  meta_description: string | null;
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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
        image={post.featured_image || undefined}
        type="article"
      />
      <BlogArticleSchema
        title={post.title}
        description={seoDescription}
        image={post.featured_image || undefined}
        authorName={post.author_name}
        publishedAt={post.published_at || post.updated_at}
        modifiedAt={post.updated_at}
        slug={post.slug}
      />

      <LegalLayout title="" lastUpdated="">
        <div className="max-w-3xl mx-auto">
          <div>
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
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

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Related */}
            <RelatedPosts currentSlug={post.slug} category={post.category} />
          </div>
        </div>
      </LegalLayout>
    </>
  );
};

export default BlogArticle;
