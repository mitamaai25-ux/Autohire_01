import { NextResponse } from 'next/server';

export async function GET() {
  const fakePdf = Buffer.from('OnboardIQ PDF export placeholder');
  return new NextResponse(fakePdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="onboardiq-report.pdf"'
    }
  });
}
