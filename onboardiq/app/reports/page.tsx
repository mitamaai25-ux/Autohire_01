import { ReportsPanel } from '@/components/reports/reports-panel';

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <header className="card p-4">
        <h1 className="text-2xl font-semibold">Reports & Export</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">Export CSV/PDF and trigger automated monthly schedules.</p>
      </header>
      <ReportsPanel />
    </div>
  );
}
