import { forwardRef } from "react";
import { appUrl, type CtaLocation } from "@/lib/appLink";
import { track } from "@/lib/analytics";

interface CtaLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Where on the page this CTA sits. Becomes utm_content and event property. */
  location: CtaLocation;
  plan?: "monthly" | "annual";
  path?: string;
}

/**
 * The only way to link to the app.
 *
 * Routing every CTA through one component means new CTAs are tracked by
 * construction rather than by remembering to add a handler -- the six existing
 * call sites had all drifted into untracked plain anchors.
 */
export const CtaLink = forwardRef<HTMLAnchorElement, CtaLinkProps>(
  ({ location, plan, path, onClick, children, ...rest }, ref) => (
    <a
      ref={ref}
      href={appUrl(location, { plan, path })}
      onClick={(event) => {
        track("cta_click", { location, plan: plan ?? null });
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  ),
);

CtaLink.displayName = "CtaLink";
