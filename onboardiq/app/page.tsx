import { DashboardFilters } from '@/components/dashboard/filters';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { TrendCharts } from '@/components/dashboard/trend-charts';
import { AIInsightsPanel } from '@/components/dashboard/ai-insights-panel';

export default function OverviewPage() {
  return (
    <div className="space-y-4">
      <header className="card p-4">
        <h1 className="text-2xl font-semibold">OnboardIQ Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">
          AI-powered onboarding analytics platform tracking, analysis, and prediction for new-hire success.
        </p>
      </header>
      <DashboardFilters />
      <KpiCards />
      <TrendCharts />
      <AIInsightsPanel />
    </div>
  );
}
