import { DashboardFilters } from '@/components/dashboard/filters';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { TrendCharts } from '@/components/dashboard/trend-charts';
import { AIInsightsPanel } from '@/components/dashboard/ai-insights-panel';
import { dashboardSummary } from '@/lib/mock-data';
import { OperationalPanels } from '@/components/dashboard/operational-panels';

export default function OverviewPage() {
  return (
    <div className="space-y-5">
      <header className="card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
              Executive Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-semibold">OnboardIQ Workforce Overview</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
              Monitor onboarding outcomes, assess early risk signals, and identify the coaching actions most likely to improve 90-day success.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-[#5C7C89]/40 dark:bg-[#011425]">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">Reporting Window</p>
            <p className="font-semibold">Q1 2026</p>
          </div>
        </div>
      </header>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardSummary.map((item) => (
          <article className="card p-4" key={item.label}>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold">{item.value}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{item.context}</p>
          </article>
        ))}
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">Performance trends</h2>
        <DashboardFilters />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">Operational KPIs</h2>
        <KpiCards />
      </section>
      <div className="grid gap-4 xl:grid-cols-[2fr,1fr]">
        <section className="space-y-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">Insights and action plan</h2>
          <TrendCharts />
          <AIInsightsPanel />
        </section>
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">Operational drilldown</h2>
          <OperationalPanels />
        </section>
      </div>
    </div>
  );
}
