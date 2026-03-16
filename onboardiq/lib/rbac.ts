export type AppRole = 'ADMIN' | 'HR' | 'MANAGER';

const rolePermissions: Record<AppRole, string[]> = {
  ADMIN: ['*'],
  HR: ['dashboard', 'analytics', 'journey', 'feedback', 'compliance', 'reports'],
  MANAGER: ['dashboard', 'analytics', 'journey', 'feedback']
};

export function canAccess(role: AppRole, scope: string) {
  const allowed = rolePermissions[role] ?? [];
  return allowed.includes('*') || allowed.includes(scope);
}
