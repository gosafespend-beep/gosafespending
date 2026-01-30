import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const pathLabels: Record<string, string> = {
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "cookies-policy": "Cookies Policy",
  "contact": "Contact",
};

export const VisualBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // Don't render on homepage
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {pathnames.map((segment, index) => {
          const isLast = index === pathnames.length - 1;
          const label = pathLabels[segment] || segment.replace(/-/g, " ");

          return (
            <li key={segment} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              {isLast ? (
                <span
                  className="text-foreground font-medium capitalize"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link
                  to={`/${pathnames.slice(0, index + 1).join("/")}`}
                  className="hover:text-foreground transition-colors capitalize"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
