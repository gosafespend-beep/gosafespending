import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, DollarSign, Star, Globe } from "lucide-react";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const Counter = ({ target, suffix = "", prefix = "", duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, target, {
            duration,
            onUpdate: (v) => setCount(Math.floor(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Active Users",
    description: "Managing their finances",
  },
  {
    icon: DollarSign,
    prefix: "$",
    value: 5000000,
    suffix: "+",
    label: "Money Tracked",
    description: "Across all accounts",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    label: "Star Rating",
    description: "From our users",
    isDecimal: true,
  },
  {
    icon: Globe,
    value: 50,
    suffix: "+",
    label: "Countries",
    description: "Users worldwide",
  },
];

export const StatsCounter = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 truncate">
                {stat.isDecimal ? (
                  <span>{stat.value}</span>
                ) : (
                  <Counter
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                )}
              </div>
              <div className="text-sm font-semibold text-foreground mb-0.5">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
