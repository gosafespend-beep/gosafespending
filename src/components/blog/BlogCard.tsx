import { Link } from "react-router-dom";
import { Calendar, Clock, Tag } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: string | null;
  publishedAt: string | null;
  readingTime: number;
  authorName: string;
}

export const BlogCard = ({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  publishedAt,
  readingTime,
  authorName,
}: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${slug}`}
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 no-underline [&_*]:no-underline"
    >
      {featuredImage && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5 space-y-3">
        {category && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            <Tag className="h-3 w-3" />
            {category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
          {publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {format(new Date(publishedAt), "MMM d, yyyy")}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime} min read
          </span>
        </div>
        <p className="text-xs text-muted-foreground">By {authorName}</p>
      </div>
    </Link>
  );
};
