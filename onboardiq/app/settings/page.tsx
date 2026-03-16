import { AdminSettings } from '@/components/settings/admin-settings';
import { getSessionUser } from '@/lib/auth';

export default async function SettingsPage() {
  const user = await getSessionUser();

  if (user.role !== 'ADMIN') {
    return (
      <section className="card p-4">
        <h1 className="text-2xl font-semibold">Admin Settings</h1>
        <p className="mt-2 text-sm text-amber-600">Restricted: only Admin users can change platform thresholds and AI sensitivity.</p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <header className="card p-4">
        <h1 className="text-2xl font-semibold">Admin Settings</h1>
      </header>
      <AdminSettings />
    </div>
  );
}
