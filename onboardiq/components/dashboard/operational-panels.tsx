import { departmentReadiness, stageFunnel } from '@/lib/mock-data';
import { Activity, ShieldAlert } from 'lucide-react';

const RISK_STYLES: Record<string, string> = {
  Low: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
  Moderate: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
  High: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300'
};

export function OperationalPanels() {
  return (
    <div className="space-y-4">
      <section className="card p-5">
        <h3 className="inline-flex items-center gap-2 text-base font-semibold">
          <Activity className="h-4 w-4 text-cyan-500" />
          Onboarding Funnel Health
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Conversion from offer acceptance to full productivity.
        </p>
        <ul className="mt-4 space-y-3">
          {stageFunnel.map((stage) => (
            <li key={stage.stage}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>{stage.stage}</span>
                <span className="font-semibold">{stage.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 rounded-full bg-gradient-to-r from-[#1F4959] to-cyan-500" style={{ width: `${stage.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-5">
        <h3 className="inline-flex items-center gap-2 text-base font-semibold">
          <ShieldAlert className="h-4 w-4 text-violet-500" />
          Department Readiness
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Completion rate and current risk level by onboarding function.
        </p>
        <div className="mt-4 space-y-3">
          {departmentReadiness.map((item) => (
            <article className="rounded-xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-[#5C7C89]/40 dark:bg-[#011425]/50" key={item.department}>
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.department}</p>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${RISK_STYLES[item.risk]}`}>
                  {item.risk} risk
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Completion rate: <strong>{item.completion}%</strong>
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
