import { DashboardFilters } from '@/components/dashboard/filters';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { TrendCharts } from '@/components/dashboard/trend-charts';
import { AIInsightsPanel } from '@/components/dashboard/ai-insights-panel';
import { dashboardSummary } from '@/lib/mock-data';
import { OperationalPanels } from '@/components/dashboard/operational-panels';
import { ArrowUpRight, CalendarClock, Download } from 'lucide-react';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <header className="card relative overflow-hidden p-6">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-cyan-500/15 via-sky-500/5 to-transparent"
          aria-hidden
        />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
              Executive Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-semibold">OnboardIQ Workforce Overview</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
              Monitor onboarding outcomes, assess early risk signals, and identify the coaching actions most likely to improve 90-day success.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg bg-[#1F4959] px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#163947]">
                Export snapshot
                <Download className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-[#5C7C89]/40 dark:bg-[#011425] dark:text-slate-100 dark:hover:bg-[#1A3443]">
                View benchmark report
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm dark:border-[#5C7C89]/40 dark:bg-[#011425]">
            <p className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">
              <CalendarClock className="h-3.5 w-3.5" />
              Reporting Window
            </p>
            <p className="font-semibold">Q1 2026</p>
          </div>
        </div>
      </header>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardSummary.map((item, index) => (
          <article className="card p-4 transition hover:-translate-y-0.5 hover:shadow-md" key={item.label}>
            <div
              className={`mb-3 h-1.5 w-10 rounded-full ${
                index % 2 === 0 ? 'bg-cyan-500/70' : 'bg-violet-500/70'
              }`}
            />
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
