const timeline = [
  { stage: 'Documentation', status: 'Completed', sla: false },
  { stage: 'IT Provisioning', status: 'Completed', sla: false },
  { stage: 'Manager Onboarding', status: 'Pending', sla: true },
  { stage: 'Training Completion', status: 'Delayed', sla: true }
];

export function EmployeeTimeline() {
  const completed = timeline.filter((item) => item.status === 'Completed').length;
  const progress = Math.round((completed / timeline.length) * 100);

  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold">Employee Journey Tracker</h3>
      <div className="mt-3 h-2 rounded bg-slate-200 dark:bg-slate-700">
        <div className="h-2 rounded bg-[#1F4959]" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-1 text-sm">Progress: {progress}%</p>
      <ul className="mt-4 space-y-3 text-sm">
        {timeline.map((item) => (
          <li key={item.stage} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <p className="font-medium">{item.stage}</p>
            <p>Status: {item.status}</p>
            <p className={item.sla ? 'text-amber-500' : 'text-emerald-500'}>
              {item.sla ? 'SLA Breach Alert' : 'Within SLA'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
