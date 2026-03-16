import { EmployeeTimeline } from '@/components/journey/employee-timeline';

export default function EmployeeJourneyPage() {
  return (
    <div className="space-y-4">
      <header className="card p-4">
        <h1 className="text-2xl font-semibold">Employee Journey Tracker</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">Timeline per employee with milestone status, SLA alerts, and onboarding progress.</p>
      </header>
      <EmployeeTimeline />
    </div>
  );
}
