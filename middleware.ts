import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // El middleware ya no verifica la sesión porque usamos localStorage
  // La verificación se hace en el cliente (app/admin/layout.tsx)
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
