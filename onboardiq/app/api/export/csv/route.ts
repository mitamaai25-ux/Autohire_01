import { NextResponse } from 'next/server';

export async function GET() {
  const rows = [
    ['employee', 'retentionScore', 'engagementScore'],
    ['Ava Patel', '84', '78'],
    ['Noah Garcia', '72', '69']
  ];
  const csv = rows.map((r) => r.join(',')).join('\n');
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="onboardiq-report.csv"'
    }
  });
}
