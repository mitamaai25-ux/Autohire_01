'use client';

export function AdminSettings() {
  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold">Admin Settings</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-sm">Productivity benchmark <input className="mt-1 w-full rounded-lg border p-2" defaultValue="70" /></label>
        <label className="text-sm">Retention threshold (%) <input className="mt-1 w-full rounded-lg border p-2" defaultValue="85" /></label>
        <label className="text-sm">Onboarding stages
          <input className="mt-1 w-full rounded-lg border p-2" defaultValue="Offer, Docs, IT, Training, Productive" />
        </label>
        <label className="text-sm">AI sensitivity
          <input type="range" min={0} max={100} defaultValue={65} className="mt-2 w-full" />
        </label>
      </div>
    </section>
  );
}
