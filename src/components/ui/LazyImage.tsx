import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  aspectRatio?: string;
  priority?: boolean;
}

/**
 * Lazy-loaded image component with:
 * - Native lazy loading (unless priority is set)
 * - Blur-up placeholder effect
 * - Proper aspect ratio to prevent CLS
 * - Priority loading for above-the-fold images
 */
export const LazyImage = ({
  src,
  alt,
  placeholderSrc,
  aspectRatio = "16/9",
  priority = false,
  className,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // If priority, assume in view
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If priority, skip intersection observer
    if (priority) return;
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Increased margin for earlier loading
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      style={{ aspectRatio }}
      role="img"
      aria-label={alt}
    >
      {/* Placeholder/skeleton */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 animate-pulse bg-muted" 
          aria-hidden="true"
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
          <span>Failed to load image</span>
        </div>
      )}
      
      {/* Actual image */}
      {!hasError && (
        <img
          ref={imgRef}
          src={isInView ? src : placeholderSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      )}
    </div>
  );
};
