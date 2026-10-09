import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import {
  currentOS,
  storeForOS,
  storeUrl,
  type MobileOS,
  type StoreLocation,
} from "@/lib/storeLinks";

interface GetAppButtonProps {
  location: StoreLocation;
  size?: "sm" | "default" | "lg";
  label?: string;
  className?: string;
}

/**
 * One button that does the right thing for the device: straight to the App
 * Store on iPhone, Google Play on Android, and to /download (QR code and both
 * stores) on a desktop. The OS is read after mount, so the prerendered HTML and
 * the first client render agree and link to /download.
 */
export const GetAppButton = ({
  location,
  size = "default",
  label = "Get the app",
  className,
}: GetAppButtonProps) => {
  const [os, setOs] = useState<MobileOS>("other");
  useEffect(() => setOs(currentOS()), []);

  const store = storeForOS(os);
  const href = store ? storeUrl(store, location) : "/download";

  return (
    <Button asChild size={size} className={className}>
      <a
        href={href}
        {...(store ? { target: "_blank", rel: "noopener" } : {})}
        onClick={() => track("store_click", { store: store ?? "download_page", location, os })}
      >
        <Download className="mr-2 h-4 w-4" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
};
