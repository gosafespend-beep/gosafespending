import { track } from "@/lib/analytics";
import {
  currentOS,
  storeUrl,
  type Store,
  type StoreLocation,
} from "@/lib/storeLinks";
import { cn } from "@/lib/utils";

/*
 * Official "Download on the App Store" and "Get it on Google Play" badges.
 * Both stores require their own artwork, unmodified and with clear space
 * around it, so these are images rather than styled buttons. The Google PNG
 * carries its own padding, which is why it is rendered larger than Apple's
 * for the two to look the same size.
 */

const BADGE = {
  ios: {
    src: "/badges/app-store.svg",
    alt: "Download Safe Spend on the App Store",
    width: 120,
    height: 40,
    sizes: { md: "h-11", lg: "h-[52px]" },
  },
  android: {
    src: "/badges/google-play.png",
    alt: "Get Safe Spend on Google Play",
    width: 646,
    height: 250,
    sizes: { md: "h-[66px]", lg: "h-[78px]" },
  },
} as const;

interface StoreBadgeProps {
  store: Store;
  location: StoreLocation;
  size?: "md" | "lg";
  className?: string;
}

export const StoreBadge = ({
  store,
  location,
  size = "md",
  className,
}: StoreBadgeProps) => {
  const badge = BADGE[store];
  return (
    <a
      href={storeUrl(store, location)}
      target="_blank"
      rel="noopener"
      onClick={() => track("store_click", { store, location, os: currentOS() })}
      className={cn("inline-flex items-center rounded-lg", className)}
    >
      <img
        src={badge.src}
        alt={badge.alt}
        width={badge.width}
        height={badge.height}
        className={cn("w-auto", badge.sizes[size])}
        loading="lazy"
        decoding="async"
      />
    </a>
  );
};

interface StoreBadgesProps {
  location: StoreLocation;
  size?: "md" | "lg";
  className?: string;
  align?: "start" | "center";
}

export const StoreBadges = ({
  location,
  size = "md",
  className,
  align = "start",
}: StoreBadgesProps) => (
  <div
    className={cn(
      "flex flex-wrap items-center gap-x-3 gap-y-1",
      align === "center" && "justify-center",
      className,
    )}
  >
    <StoreBadge store="ios" location={location} size={size} />
    <StoreBadge store="android" location={location} size={size} />
  </div>
);
