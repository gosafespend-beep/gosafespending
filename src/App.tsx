import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import { ConsentBanner } from "./components/ConsentBanner";
import { trackPageview } from "./lib/analytics";
import { BreadcrumbSchema } from "./components/seo/BreadcrumbSchema";
import { FAQSchema } from "./components/seo/FAQSchema";
import { OrganizationSchema } from "./components/seo/OrganizationSchema";
import { PerformanceOptimizations } from "./components/seo/PerformanceOptimizations";
import { WebSiteSchema } from "./components/seo/WebSiteSchema";
import { HowToSchema } from "./components/seo/HowToSchema";
import { SoftwareAppSchema } from "./components/seo/SoftwareAppSchema";

/*
 * Every route used to be imported eagerly, so a homepage visitor downloaded and
 * parsed four calculators, the blog renderer, react-markdown, remark-gfm,
 * recharts and four legal pages before the hero was interactive -- 1.08 MB in
 * one chunk. Index stays eager because it is the landing route.
 */
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const BudgetCalculator = lazy(() => import("./pages/BudgetCalculator"));
const CompoundInterestCalculator = lazy(
  () => import("./pages/CompoundInterestCalculator"),
);
const DebtPayoffCalculator = lazy(() => import("./pages/DebtPayoffCalculator"));
const EmergencyFundCalculator = lazy(
  () => import("./pages/EmergencyFundCalculator"),
);

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background" aria-busy="true" />
);

/** Records a pageview on every route change. No-op until consent is granted. */
const PageviewTracker = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/*
         * SEOHead is deliberately NOT rendered here. It used to be mounted
         * globally *and* per-page, and blog routes have no entry in its
         * metadata map -- so the global instance raced the article's own
         * instance, falling back to the homepage title and description. Each
         * page now owns its metadata.
         */}
        <PageviewTracker />
        <BreadcrumbSchema />
        <FAQSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <HowToSchema />
        <SoftwareAppSchema />
        <PerformanceOptimizations />

        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/tools/budget-calculator" element={<BudgetCalculator />} />
            <Route
              path="/tools/compound-interest-calculator"
              element={<CompoundInterestCalculator />}
            />
            <Route
              path="/tools/debt-payoff-calculator"
              element={<DebtPayoffCalculator />}
            />
            <Route
              path="/tools/emergency-fund-calculator"
              element={<EmergencyFundCalculator />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <ConsentBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
