import { Globe2, Lock, Smartphone, Fingerprint } from "lucide-react";

/*
 * What stands in for the old statistics row.
 *
 * These are facts about the product that a visitor can check, not figures
 * about its audience. When real, verifiable numbers exist (store ratings,
 * review counts, users), add them here from the source -- do not round them up.
 */
const items = [
  {
    icon: Smartphone,
    title: "iPhone, iPad, Android & web",
    detail: "One account, the same data everywhere",
  },
  {
    icon: Lock,
    title: "No bank login, ever",
    detail: "You choose what goes in",
  },
  {
    icon: Fingerprint,
    title: "Face ID & biometric lock",
    detail: "On the iPhone and Android apps",
  },
  {
    icon: Globe2,
    title: "Built for any currency",
    detail: "USD, EUR, GBP, KES, NGN, ZAR and more",
  },
];

export const ProofStrip = () => (
  <section
    aria-label="Why people trust Safe Spend"
    className="py-10 px-4 sm:px-6 lg:px-8 border-y border-border/40 bg-card/30"
  >
    <ul className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 list-none p-0">
      {items.map(({ icon: Icon, title, detail }) => (
        <li key={title} className="flex items-start gap-3">
          <span className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary shrink-0">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">{title}</span>
            <span className="block text-sm text-muted-foreground">{detail}</span>
          </span>
        </li>
      ))}
    </ul>
  </section>
);
