import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CookiesPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import BudgetCalculator from "./pages/BudgetCalculator";
import CompoundInterestCalculator from "./pages/CompoundInterestCalculator";
import DebtPayoffCalculator from "./pages/DebtPayoffCalculator";
import EmergencyFundCalculator from "./pages/EmergencyFundCalculator";
import { SEOHead } from "./components/seo/SEOHead";
import { BreadcrumbSchema } from "./components/seo/BreadcrumbSchema";
import { FAQSchema } from "./components/seo/FAQSchema";
import { OrganizationSchema } from "./components/seo/OrganizationSchema";
import { PerformanceOptimizations } from "./components/seo/PerformanceOptimizations";
import { WebSiteSchema } from "./components/seo/WebSiteSchema";
import { HowToSchema } from "./components/seo/HowToSchema";
import { SoftwareAppSchema } from "./components/seo/SoftwareAppSchema";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* SEO & Performance Components */}
        <SEOHead />
        <BreadcrumbSchema />
        <FAQSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <HowToSchema />
        <SoftwareAppSchema />
        <PerformanceOptimizations />
        
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
          <Route path="/tools/compound-interest-calculator" element={<CompoundInterestCalculator />} />
          <Route path="/tools/debt-payoff-calculator" element={<DebtPayoffCalculator />} />
          <Route path="/tools/emergency-fund-calculator" element={<EmergencyFundCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
