'use client';

export function ReportsPanel() {
  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold">Reports & Export</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <a className="rounded-lg bg-[#1F4959] px-3 py-2 text-sm text-white" href="/api/export/csv">Export CSV</a>
        <a className="rounded-lg bg-[#5C7C89] px-3 py-2 text-sm text-white" href="/api/export/pdf">Download PDF</a>
        <a className="rounded-lg bg-[#242424] px-3 py-2 text-sm text-white" href="/api/scheduler/monthly">Schedule Monthly Report</a>
      </div>
    </section>
  );
}
