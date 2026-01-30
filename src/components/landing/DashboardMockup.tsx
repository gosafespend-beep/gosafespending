import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  CreditCard,
  PiggyBank,
  Lightbulb,
  FileText,
  TrendingUp,
  Tags,
  Settings,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, inView: boolean) => {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView, prefersReducedMotion]);

  return count;
};

// Format number with commas
const formatNumber = (num: number) => {
  return num.toLocaleString("en-US");
};

// Sidebar navigation data
const navItems = {
  main: [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: ArrowLeftRight, label: "Transactions", active: false },
  ],
  tracking: [
    { icon: Wallet, label: "Accounts", active: false },
    { icon: CreditCard, label: "Debt Tracker", active: false },
    { icon: PiggyBank, label: "Savings Goals", active: false },
    { icon: Lightbulb, label: "Insights", active: false },
  ],
  analysis: [
    { icon: FileText, label: "Reports", active: false },
    { icon: TrendingUp, label: "Net Worth", active: false },
  ],
  settings: [
    { icon: Tags, label: "Categories", active: false },
    { icon: Settings, label: "Settings", active: false },
  ],
};

// Stats data
const statsData = [
  { label: "Balance", value: 18715, color: "text-primary", prefix: "$" },
  { label: "Income", value: 187215, color: "text-emerald-400", prefix: "$" },
  { label: "Expenses", value: 168500, color: "text-red-400", prefix: "$" },
  { label: "Net", value: 18715, color: "text-primary", prefix: "$" },
];

// Alert cards data
const alertsData = [
  { title: "Low Savings", subtitle: "Emergency Fund", percent: 100 },
  { title: "Rent expense", subtitle: "Near Limit", percent: 100 },
  { title: "Fixed Account", subtitle: "Near Limit", percent: 100 },
  { title: "Groceries", subtitle: "Near Limit", percent: 100 },
];

export const DashboardMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="w-full aspect-[16/9] bg-[hsl(200,25%,8%)] rounded-lg overflow-hidden flex text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-xs"
    >
      {/* Sidebar */}
      <aside className="w-[20%] min-w-[70px] bg-[hsl(200,25%,10%)] border-r border-[hsl(200,25%,18%)] flex flex-col p-1.5 sm:p-2">
        {/* Logo */}
        <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-[0.4rem] sm:text-[0.5rem] font-bold text-primary-foreground">S</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:inline text-[0.6rem]">Safe Spend</span>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 space-y-2 sm:space-y-2.5">
          {/* Main */}
          <div>
            <p className="text-[0.35rem] sm:text-[0.4rem] text-muted-foreground font-medium mb-0.5 uppercase tracking-wider">Main</p>
            <ul className="space-y-0">
              {navItems.main.map((item) => (
                <li key={item.label}>
                  <div
                    className={`flex items-center gap-1 px-1 py-0.5 rounded-md transition-colors ${
                      item.active
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline truncate text-[0.5rem]">{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tracking */}
          <div>
            <p className="text-[0.35rem] sm:text-[0.4rem] text-muted-foreground font-medium mb-0.5 uppercase tracking-wider">Tracking</p>
            <ul className="space-y-0">
              {navItems.tracking.map((item) => (
                <li key={item.label}>
                  <div className="flex items-center gap-1 px-1 py-0.5 rounded-md text-muted-foreground">
                    <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline truncate text-[0.5rem]">{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Analysis */}
          <div>
            <p className="text-[0.35rem] sm:text-[0.4rem] text-muted-foreground font-medium mb-0.5 uppercase tracking-wider">Analysis</p>
            <ul className="space-y-0">
              {navItems.analysis.map((item) => (
                <li key={item.label}>
                  <div className="flex items-center gap-1 px-1 py-0.5 rounded-md text-muted-foreground">
                    <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline truncate text-[0.5rem]">{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Settings */}
          <div>
            <p className="text-[0.35rem] sm:text-[0.4rem] text-muted-foreground font-medium mb-0.5 uppercase tracking-wider">Settings</p>
            <ul className="space-y-0">
              {navItems.settings.map((item) => (
                <li key={item.label}>
                  <div className="flex items-center gap-1 px-1 py-0.5 rounded-md text-muted-foreground">
                    <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline truncate text-[0.5rem]">{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 border-b border-[hsl(200,25%,18%)]">
          <h1 className="font-semibold text-foreground text-[0.55rem] sm:text-[0.7rem]">Finance Tracker</h1>
          <button className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground text-[0.4rem] sm:text-[0.5rem]">
            January 2026
            <ChevronDown className="w-2 h-2" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-2 sm:p-3 overflow-auto space-y-2 sm:space-y-2.5">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {statsData.map((stat, index) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                prefix={stat.prefix}
                isInView={isInView}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Alerts Grid */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {alertsData.map((alert, index) => (
              <AlertCard
                key={alert.title}
                title={alert.title}
                subtitle={alert.subtitle}
                percent={alert.percent}
                delay={index * 50}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  label: string;
  value: number;
  color: string;
  prefix: string;
  isInView: boolean;
  delay: number;
}

const StatCard = ({ label, value, color, prefix, isInView, delay }: StatCardProps) => {
  const count = useCountUp(value, 2000, isInView);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className="bg-card border border-border rounded-lg p-1.5 sm:p-2"
    >
      <p className="text-muted-foreground text-[0.35rem] sm:text-[0.4rem] uppercase tracking-wider mb-0.5">{label}</p>
      <p className={`font-bold text-[0.6rem] sm:text-[0.75rem] md:text-sm ${color}`}>
        {prefix}{formatNumber(count)}
      </p>
      <p className="text-muted-foreground text-[0.3rem] sm:text-[0.35rem]">0% from last month</p>
    </motion.div>
  );
};

// Alert Card Component
interface AlertCardProps {
  title: string;
  subtitle: string;
  percent: number;
  delay: number;
  isInView: boolean;
}

const AlertCard = ({ title, subtitle, percent, delay, isInView }: AlertCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: (400 + delay) / 1000 }}
      className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-1.5 sm:p-2"
    >
      <div className="flex items-start gap-1 mb-1.5">
        <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="font-medium text-amber-500 text-[0.4rem] sm:text-[0.5rem] truncate">{title}</p>
          <p className="text-amber-500/70 text-[0.35rem] sm:text-[0.4rem] truncate">{subtitle}</p>
        </div>
      </div>
      {/* Progress bar */}
      <div className="w-full h-0.5 sm:h-1 bg-amber-500/20 rounded-full overflow-hidden">
        <motion.div
          initial={prefersReducedMotion ? { width: `${percent}%` } : { width: 0 }}
          animate={isInView ? { width: `${percent}%` } : {}}
          transition={{ duration: 0.8, delay: (600 + delay) / 1000 }}
          className="h-full bg-amber-500 rounded-full"
        />
      </div>
      <p className="text-amber-500/70 text-[0.3rem] sm:text-[0.35rem] mt-0.5">{percent}% used</p>
    </motion.div>
  );
};
