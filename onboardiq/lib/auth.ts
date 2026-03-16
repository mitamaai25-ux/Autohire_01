import type { AppRole } from './rbac';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: AppRole;
};

export async function getSessionUser(): Promise<SessionUser> {
  // Replace with Auth.js/Clerk session in production.
  return {
    id: 'demo-user',
    email: 'hr@onboardiq.com',
    name: 'HR Manager',
    role: 'HR'
  };
}
