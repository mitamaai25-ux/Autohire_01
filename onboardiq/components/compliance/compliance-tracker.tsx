export function ComplianceTracker() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {[
        ['Documentation completion', '93%'],
        ['IT provisioning status', '88% complete'],
        ['Background verification', '96% complete'],
        ['Access provisioning time', 'Avg 21 hrs']
      ].map(([label, value]) => (
        <article key={label} className="card p-4">
          <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </article>
      ))}
    </section>
  );
}
