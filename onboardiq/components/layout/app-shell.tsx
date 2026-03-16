'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const nav = [
  ['Overview', '/'],
  ['Analytics', '/analytics'],
  ['Employee Journey', '/employee-journey'],
  ['Feedback', '/feedback'],
  ['Compliance & IT', '/compliance'],
  ['Reports', '/reports'],
  ['Settings', '/settings']
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
        <aside className="card p-4">
          <p className="mb-4 text-lg font-semibold text-[#1F4959] dark:text-[#5C7C89]">OnboardIQ</p>
          <nav className="space-y-1">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'block rounded-xl px-3 py-2 text-sm transition',
                  pathname === href
                    ? 'bg-[#1F4959] text-white'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-[#1F4959]/30'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="space-y-4">{children}</main>
      </div>
    </div>
  );
}
