import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NotFound = () => {
  // Add noindex meta tag to prevent soft 404s from being indexed
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
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
