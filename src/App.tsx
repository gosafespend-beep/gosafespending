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
import Contact from "./pages/Contact";
import { SEOHead } from "./components/seo/SEOHead";
import { BreadcrumbSchema } from "./components/seo/BreadcrumbSchema";
import { FAQSchema } from "./components/seo/FAQSchema";
import { OrganizationSchema } from "./components/seo/OrganizationSchema";
import { PerformanceOptimizations } from "./components/seo/PerformanceOptimizations";
import { WebSiteSchema } from "./components/seo/WebSiteSchema";
import { HowToSchema } from "./components/seo/HowToSchema";

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
        <PerformanceOptimizations />
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
