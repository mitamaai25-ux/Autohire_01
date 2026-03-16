import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { canAccess, type AppRole } from './lib/rbac';

const routeScopes: Record<string, string> = {
  '/': 'dashboard',
  '/analytics': 'analytics',
  '/employee-journey': 'journey',
  '/feedback': 'feedback',
  '/compliance': 'compliance',
  '/reports': 'reports',
  '/settings': 'settings'
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith('/api') || path.startsWith('/_next') || path.includes('.')) {
    return NextResponse.next();
  }

  const role = (request.headers.get('x-demo-role') || 'HR') as AppRole;
  const scope = routeScopes[path];

  if (scope && !canAccess(role, scope)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
