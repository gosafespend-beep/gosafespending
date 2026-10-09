import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DownloadQr } from "@/components/landing/DownloadQr";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/CtaLink";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { DOWNLOAD_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { currentOS, storeForOS, storeUrl } from "@/lib/storeLinks";
import hero from "@/assets/store/screen-01.webp";

/*
 * The one page every "get the app" link can point at.
 *
 * - From a phone it offers the matching store first.
 * - A QR scan arrives with ?go=1 and is sent straight to the store, because
 *   someone who just scanned a code wants the app, not another page.
 * - On a desktop it shows the QR code, both stores and the web app.
 *
 * Redirecting only on ?go=1 keeps the page itself indexable and avoids
 * bouncing a visitor who followed an ordinary link.
 */
const Download = () => {
  const [params] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const os = typeof window === "undefined" ? "other" : currentOS();
  const store = storeForOS(os);

  useEffect(() => {
    if (params.get("go") !== "1" || !store) return;
    track("store_click", { store, location: "qr", os });
    window.location.replace(storeUrl(store, "qr"));
  }, [params, store, os]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(DOWNLOAD_URL);
      setCopied(true);
      track("download_link_copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked: the visible URL is still selectable. */
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Navbar />
      <main id="main" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium text-primary mb-3">Free to download</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5">
              Get Safe Spend on your phone
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              See what's safe to spend today, track expenses in seconds and plan
              ahead — on iPhone, iPad and Android. No bank login, ever.
            </p>

            <StoreBadges location="download_page" size="lg" className="mb-8" />

            <div className="hidden lg:flex items-center gap-6 mb-8">
              <DownloadQr size={132} />
              <p className="text-sm text-muted-foreground max-w-[14rem]">
                On a computer? Scan the code with your phone's camera and we'll
                send you to the right store.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <Button asChild variant="outline">
                <CtaLink location="download_page">
                  Use Safe Spend on the web
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </CtaLink>
              </Button>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copied ? "Link copied" : "Copy link to share"}
              </button>
            </div>
            <noscript>
              <p className="mt-4 text-sm text-muted-foreground">
                iPhone: apps.apple.com/app/id6796527654 · Android: search "Safe
                Spend" on Google Play.
              </p>
            </noscript>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-0 -z-10 bg-primary/10 blur-3xl rounded-full" />
            <img
              src={hero}
              alt="The Safe Spend app showing a Safe to Spend balance, financial health score and recent transactions"
              width={600}
              height={1300}
              className="w-64 sm:w-72 h-auto rounded-3xl shadow-2xl shadow-primary/20"
              fetchPriority="high"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Download;
