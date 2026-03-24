import { kpis } from '@/lib/mock-data';

export function KpiCards() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {kpis.map((kpi) => (
        <article className="card p-4" key={kpi.label}>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">{kpi.label}</p>
          <p className="mt-1 text-2xl font-semibold">{kpi.value}</p>
          <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
            {kpi.change}
          </p>
        </article>
      ))}
    </section>
  );
}
