export function DashboardFilters() {
  return (
    <section className="card p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm">
          Date Range
          <input className="mt-1 w-full rounded-lg border p-2 text-sm dark:bg-[#1F4959]/20" defaultValue="Last 90 days" />
        </label>
        <label className="text-sm">
          Department
          <select className="mt-1 w-full rounded-lg border p-2 text-sm dark:bg-[#1F4959]/20">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>HR</option>
          </select>
        </label>
        <label className="text-sm">
          Role
          <select className="mt-1 w-full rounded-lg border p-2 text-sm dark:bg-[#1F4959]/20">
            <option>All Roles</option>
            <option>Software Engineer</option>
            <option>Sales Associate</option>
            <option>People Ops</option>
          </select>
        </label>
        <label className="text-sm">
          Mode
          <select className="mt-1 w-full rounded-lg border p-2 text-sm dark:bg-[#1F4959]/20">
            <option>Hybrid</option>
            <option>Remote</option>
            <option>Onsite</option>
          </select>
        </label>
      </div>
    </section>
  );
}
