import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import logo from "@/assets/logo.webp";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* noIndex handled by SEOHead rather than a hand-rolled effect. The edge
          also returns a real 404 status now, so this is belt and braces. */}
      <SEOHead
        title="Page not found - Safe Spend"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex
      />
      <div className="text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="Safe Spend logo" className="h-12 w-12" width={48} height={48} />
          <span className="text-2xl font-bold text-foreground">Safe Spend</span>
        </div>
        
        {/* 404 */}
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
        <p className="mb-2 text-2xl font-semibold text-foreground">Page not found</p>
        <p className="mb-8 text-muted-foreground max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* CTA */}
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/" className="inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
