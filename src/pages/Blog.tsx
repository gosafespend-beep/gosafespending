import { LegalLayout } from "@/components/legal/LegalLayout";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <LegalLayout title="Blog" lastUpdated="February 2026">
      <div className="text-center py-16">
        <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
          <Newspaper className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Coming Soon</h2>
        <p className="text-muted-foreground text-base max-w-md mx-auto mb-8 leading-relaxed">
          We're working on helpful articles about budgeting, saving, and building better money habits. Check back soon!
        </p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </LegalLayout>
  );
};

export default Blog;
