import { Link2Off, ShieldOff, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
 * The page previously went straight from claim to feature list with no problem
 * statement, so nothing earned the visitor's attention before the ask.
 *
 * This names the objection the product actually resolves. It is also the one
 * argument no aggregator-based competitor can answer, because bank
 * aggregation is their architecture, not a setting.
 */
const objections = [
  {
    icon: Link2Off,
    title: "They want your bank login first",
    body: "Most budgeting apps can't show you anything until you hand over the credentials to your actual bank account, usually through a third-party data aggregator you've never heard of.",
  },
  {
    icon: EyeOff,
    title: "Your transaction history becomes their asset",
    body: "Once connected, every purchase you make flows through someone else's servers. What happens to it after that is a paragraph in a policy document you didn't read.",
  },
  {
    icon: ShieldOff,
    title: "You can't undo a connection you've already made",
    body: "Revoking access stops new data. It doesn't retrieve what has already been collected, shared with partners, or retained under a policy that changed after you signed up.",
  },
];

export const ProblemSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30"
    >
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`scroll-anim text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            The problem
          </span>
          <h2
            id="problem-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Every other budgeting app starts by asking for{" "}
            <span className="gradient-text">your bank login</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            If that has ever stopped you from trying one, you're not being
            paranoid. You're being reasonable — and you've been out of options.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {objections.map((item, index) => (
            <motion.div
              key={item.title}
              className="p-6 rounded-xl bg-card border border-border/50"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="inline-flex p-3 rounded-xl bg-destructive/10 mb-4">
                <item.icon className="h-5 w-5 text-destructive" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-lg text-foreground font-medium mt-12 max-w-2xl mx-auto">
          Safe Spend never asks. You log what you spend, and your bank stays
          between you and your bank.
        </p>
      </div>
    </section>
  );
};
