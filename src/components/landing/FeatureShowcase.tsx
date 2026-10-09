import { Check } from "lucide-react";
import { GetAppButton } from "./GetAppButton";
import health from "@/assets/store/screen-02.webp";
import coach from "@/assets/store/screen-03.webp";
import capture from "@/assets/store/screen-04.webp";
import importing from "@/assets/store/screen-05.webp";
import budgets from "@/assets/store/screen-06.webp";
import insights from "@/assets/store/screen-08.webp";

/*
 * Feature deep-dives, one job each, shown on the phone they run on.
 *
 * These replace the old twelve-card grid whose "stats" (2x faster payoff,
 * 0 missed bills, 360 degree view) were decoration, not measurements. Every
 * claim below describes something the shipped apps do.
 *
 * The images are the published store screenshots. They are marketing
 * renders, so alt text describes what they show rather than claiming to be
 * live screens; swap in fresh device captures when they are available.
 */

interface Feature {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  image: string;
  alt: string;
}

const FEATURES: Feature[] = [
  {
    id: "overview",
    eyebrow: "Know where you stand",
    title: "Your whole financial picture, in one glance",
    body: "Open the app and the first thing you see is what is safe to spend until the month ends, with a health score, cash flow and budget status underneath.",
    points: [
      "Safe to Spend, per day and for the month",
      "A financial health score that explains itself",
      "Cash flow, savings rate and budget status",
    ],
    image: health,
    alt: "Safe Spend overview screen with a Safe to Spend amount, financial health score, cash flow, savings rate and budget status",
  },
  {
    id: "capture",
    eyebrow: "Log it your way",
    title: "Type it, scan it or import it",
    body: "Pick whichever is fastest in the moment. Safe Spend suggests the category, so most entries take two taps.",
    points: [
      "Manual entry with AI category suggestions",
      "Photograph a receipt and review what it read",
      "Recurring bills and income that log themselves",
    ],
    image: capture,
    alt: "Add transaction screen with manual entry, receipt scan and CSV import options",
  },
  {
    id: "import",
    eyebrow: "Without a bank connection",
    title: "Bring your history in from a statement",
    body: "Download a statement from your bank yourself, drop it in, and Safe Spend turns it into categorized transactions. You check the preview before anything is saved, and your bank never hears about it.",
    points: [
      "PDF, CSV and Excel files",
      "Opening and closing balances are skipped, not counted",
      "You review the preview, then import",
    ],
    image: importing,
    alt: "Import statement screen showing a successful import with categorized transactions",
  },
  {
    id: "plan",
    eyebrow: "Stay ahead",
    title: "Budgets, bills and goals that fit together",
    body: "Budgets know about your upcoming bills and goals, so the number you see already has them taken out.",
    points: [
      "Category budgets with rollover",
      "Bill calendar with reminders and one-tap paid",
      "Savings goals and debt payoff (snowball or avalanche)",
    ],
    image: budgets,
    alt: "Budgets screen with monthly budget progress, category budgets, upcoming bills and savings goals",
  },
  {
    id: "coach",
    eyebrow: "Ask, don't guess",
    title: "An AI money coach that has read your numbers",
    body: "Ask whether you can afford something and get an answer based on your own income, bills and spending, not generic advice.",
    points: [
      "Answers grounded in your own data",
      "Suggestions you can act on",
      "Included with your subscription",
    ],
    image: coach,
    alt: "AI money coach chat answering whether the user can afford a vacation based on their safe-to-spend amount",
  },
  {
    id: "insights",
    eyebrow: "See the pattern",
    title: "Reports that make the trend obvious",
    body: "Income against expenses, spending by category, net worth over time and a forecast of where the month is heading.",
    points: [
      "Cash flow, categories and net worth",
      "Works across currencies with automatic conversion",
      "Export your data whenever you want",
    ],
    image: insights,
    alt: "Reports screen with income versus expenses, net worth growth, cash flow and spending by category",
  },
];

const ALSO_INCLUDED = [
  "Multi-currency accounts",
  "Transfers between accounts",
  "Net worth tracking",
  "Annual budget view",
  "Subscription detection",
  "Face ID / biometric lock",
  "Home-screen widget (Android)",
  "Dark and light themes",
];

export const FeatureShowcase = () => (
  <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
    <div className="max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
          What's inside
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Everything you need,{" "}
          <span className="gradient-text">nothing you didn't ask for</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          The tools of a full budgeting app, built around one number you can
          trust.
        </p>
      </div>

      <div className="space-y-20 lg:space-y-28">
        {FEATURES.map((f, i) => (
          <article
            key={f.id}
            id={`feature-${f.id}`}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <p className="text-sm font-medium text-primary mb-2">{f.eyebrow}</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {f.title}
              </h3>
              <p className="text-muted-foreground mb-6">{f.body}</p>
              <ul className="space-y-3 mb-8 list-none p-0">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-foreground/90">{p}</span>
                  </li>
                ))}
              </ul>
              <GetAppButton location="features" size="default" />
            </div>

            <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="relative">
                <div className="absolute inset-0 -z-10 bg-primary/10 blur-3xl rounded-full" aria-hidden="true" />
                <img
                  src={f.image}
                  alt={f.alt}
                  width={600}
                  height={1300}
                  loading="lazy"
                  decoding="async"
                  className="w-64 sm:w-72 h-auto rounded-[1.75rem] shadow-xl shadow-primary/15 ring-1 ring-white/10"
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-5">Also included</h3>
        <ul className="flex flex-wrap justify-center gap-2 list-none p-0">
          {ALSO_INCLUDED.map((item) => (
            <li
              key={item}
              className="text-sm text-muted-foreground border border-border/60 rounded-full px-4 py-1.5"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
