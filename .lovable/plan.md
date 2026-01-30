

## Reports Graph Enhancement Plan

### Current State
After reviewing the codebase, I found:

**Categories ARE Dynamic** ✅
- Categories are fetched from Supabase via `useSupabaseFinanceData.ts`
- Auto-category suggestions work for expenses/incomes
- Category filtering works in SpendingTrends and other reports

**Reports WITH Charts Already:**
| Report | Chart Types |
|--------|-------------|
| NeedsVsWants | PieChart + Stacked BarChart |
| IncomeAnalysis | PieChart + LineChart |
| CategoryReport | BarChart per category |
| YearComparison | LineChart + BarChart |
| SpendingTrends | LineChart |
| AnnualDashboard | ComposedChart + AreaChart |
| CashFlowForecast | AreaChart |

### Reports Lacking Charts (Enhancement Opportunities)

#### 1. Financial Health Score Report
**Current:** Only shows a circular SVG score gauge
**Opportunity:** 
- **Radar Chart** - Show all 6 metrics (emergency fund, debt ratio, savings rate, expense stability, income diversity, budget adherence) as a multi-axis visualization
- **Historical Line Chart** - Track how the score changes over months

#### 2. Progress Report
**Current:** Simple progress bars for goals and debts
**Opportunity:**
- **Net Worth Timeline** - Line/Area chart showing net worth snapshots over time
- **Goal Progress Stacked Area** - Show contribution accumulation for each goal over time
- **Debt Payoff Trajectory** - Projected vs actual debt reduction over months

#### 3. Budget Report
**Current:** Category spending bars vs budget limits
**Opportunity:**
- **Budget Utilization Gauge Charts** - Visual gauges per category
- **Historical Budget Adherence** - Line chart showing % of budget used per month over time

### Implementation Details

**Phase 1: Financial Health Score Enhancements**
- Add RadarChart component showing all 6 health metrics
- Add historical score tracking (store monthly snapshots)
- Add LineChart for score history

**Phase 2: Progress Report Charts**
- Integrate net worth snapshots into a LineChart
- Add stacked AreaChart for goal contributions over time
- Add debt payoff projection LineChart

**Phase 3: Budget Analytics**
- Add monthly budget adherence LineChart
- Add category-level gauge charts

### Files to Modify
| File | Changes |
|------|---------|
| `src/components/reports/FinancialHealthScore.tsx` | Add RadarChart, historical LineChart |
| `src/components/reports/ProgressReport.tsx` | Add net worth LineChart, goal progress AreaChart |
| `src/components/budgets/AnnualBudgetPage.tsx` | Add budget adherence trend chart |
| `src/hooks/useSupabaseNetWorth.ts` | Expose snapshots for chart data |

### Visual Preview

**Financial Health Radar Chart:**
```
         Emergency Fund (80%)
              ╱╲
    Income ╱    ╲ Debt
  Diversity      Ratio
      (60%)╲    ╱(90%)
            ╲╱
    Savings ─────── Expense
     Rate         Stability
    (70%)          (85%)
```

**Net Worth Timeline:**
```
Net Worth Over Time
$150k ┤                           ●
$120k ┤                     ●───●
 $90k ┤               ●───●
 $60k ┤         ●───●
 $30k ┤   ●───●
   $0 ┼───┬───┬───┬───┬───┬───┬──
      Jan Feb Mar Apr May Jun Jul
```

### Expected Outcome
- Visual storytelling for financial health journey
- Historical context for all key metrics
- Better insight into trends and patterns
- Professional accounting-app feel with rich data visualization

