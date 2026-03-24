export function DashboardFilters() {
  return (
    <section className="card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">Filter scope</h3>
        <button className="text-xs font-medium text-[#1F4959] underline-offset-2 hover:underline dark:text-cyan-300">Reset filters</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Date range
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-[#5C7C89]/40 dark:bg-[#1F4959]/20"
            defaultValue="Last 90 days"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Department
          <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-[#5C7C89]/40 dark:bg-[#1F4959]/20">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>HR</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Role
          <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-[#5C7C89]/40 dark:bg-[#1F4959]/20">
            <option>All Roles</option>
            <option>Software Engineer</option>
            <option>Sales Associate</option>
            <option>People Ops</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Work model
          <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-[#5C7C89]/40 dark:bg-[#1F4959]/20">
            <option>Hybrid</option>
            <option>Remote</option>
            <option>Onsite</option>
          </select>
        </label>
      </div>
    </section>
  );
}
