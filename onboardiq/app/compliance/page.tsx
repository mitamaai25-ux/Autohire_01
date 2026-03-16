import { ComplianceTracker } from '@/components/compliance/compliance-tracker';

export default function CompliancePage() {
  return (
    <div className="space-y-4">
      <header className="card p-4">
        <h1 className="text-2xl font-semibold">Compliance & IT Tracker</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">Documentation, verification and provisioning progress.</p>
      </header>
      <ComplianceTracker />
    </div>
  );
}
