import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Monthly report scheduler configured (demo mode).' });
}
