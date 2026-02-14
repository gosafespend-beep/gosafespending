import { Twitter, Link as LinkIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

const BASE_URL = "https://gosafespend.com";

export const ShareButtons = ({ title, slug }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const url = `${BASE_URL}/blog/${slug}`;

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <span className="text-sm text-muted-foreground">Share:</span>
      <Button variant="outline" onClick={shareOnTwitter} className="gap-2 w-full sm:w-auto">
        <Twitter className="h-4 w-4" />
        Twitter
      </Button>
      <Button variant="outline" onClick={copyLink} className="gap-2 w-full sm:w-auto">
        {copied ? <Check className="h-4 w-4 text-primary" /> : <LinkIcon className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
};
