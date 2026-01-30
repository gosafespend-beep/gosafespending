import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  LayoutDashboard, 
  CreditCard, 
  Target, 
  TrendingUp, 
  Receipt,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export const AppPreview = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Gradient border container */}
          <div className="gradient-border p-[2px] rounded-2xl">
            <div className="bg-card rounded-2xl overflow-hidden shadow-2xl">
              {/* App mockup */}
              <div className="flex min-h-[400px] sm:min-h-[500px]">
                {/* Sidebar */}
                <div className="hidden sm:flex w-16 bg-sidebar-background flex-col items-center py-4 gap-4 border-r border-border/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-10 h-10 rounded-xl hover:bg-muted/50 flex items-center justify-center text-muted-foreground">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-xl hover:bg-muted/50 flex items-center justify-center text-muted-foreground">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-xl hover:bg-muted/50 flex items-center justify-center text-muted-foreground">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-xl hover:bg-muted/50 flex items-center justify-center text-muted-foreground">
                    <PiggyBank className="w-5 h-5" />
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Good morning,</p>
                      <h3 className="text-lg font-semibold text-foreground">Welcome back!</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">January 2026</p>
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    <div className="bg-background/50 rounded-xl p-3 sm:p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Total Balance</span>
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-foreground">$12,847</p>
                      <p className="text-xs text-green-500">+8.2% this month</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-3 sm:p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Monthly Spending</span>
                        <ArrowDownRight className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-foreground">$2,340</p>
                      <p className="text-xs text-primary">-12% vs last month</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-3 sm:p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Savings Goal</span>
                        <Target className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-foreground">67%</p>
                      <p className="text-xs text-muted-foreground">$6,700 of $10,000</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-3 sm:p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Debt Payoff</span>
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-foreground">$1,200</p>
                      <p className="text-xs text-muted-foreground">paid this month</p>
                    </div>
                  </div>

                  {/* Chart mockup */}
                  <div className="bg-background/50 rounded-xl p-4 sm:p-6 border border-border/30">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-foreground">Spending Overview</h4>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">This Month</span>
                      </div>
                    </div>
                    {/* Simple bar chart representation */}
                    <div className="flex items-end gap-2 h-32 sm:h-40">
                      {[65, 45, 80, 55, 70, 40, 85, 60, 75, 50, 90, 45].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full bg-gradient-to-t from-primary to-accent rounded-t-sm transition-all duration-500"
                            style={{ 
                              height: `${height}%`,
                              opacity: isVisible ? 1 : 0,
                              transitionDelay: `${i * 50}ms`
                            }}
                          />
                          <span className="text-[8px] sm:text-[10px] text-muted-foreground hidden sm:block">
                            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-primary via-accent to-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};
