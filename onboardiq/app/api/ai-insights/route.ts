import { NextResponse } from 'next/server';
import { generateOnboardingInsights } from '@/lib/ai';

export async function POST(req: Request) {
  const body = await req.json();
  const result = await generateOnboardingInsights(body);
  return NextResponse.json(result);
}
