import { kpis } from '@/lib/mock-data';

export function KpiCards() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {kpis.map((kpi) => (
        <article className="card p-4" key={kpi.label}>
          <p className="text-xs text-slate-500 dark:text-slate-300">{kpi.label}</p>
          <p className="mt-1 text-2xl font-semibold">{kpi.value}</p>
          <p className="mt-1 text-xs text-emerald-600">{kpi.change}</p>
        </article>
      ))}
    </section>
  );
}
