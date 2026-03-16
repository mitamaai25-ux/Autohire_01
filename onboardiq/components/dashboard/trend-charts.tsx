'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { trendSeries } from '@/lib/mock-data';

export function TrendCharts() {
  return (
    <section className="card p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">Trend Overview (30/60/90 Days)</h3>
        <div className="flex gap-2 text-xs">
          <button className="rounded-lg bg-[#1F4959] px-2 py-1 text-white">30D</button>
          <button className="rounded-lg bg-slate-100 px-2 py-1 dark:bg-slate-700">60D</button>
          <button className="rounded-lg bg-slate-100 px-2 py-1 dark:bg-slate-700">90D</button>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendSeries}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="productivity" stroke="#1F4959" strokeWidth={2} />
            <Line type="monotone" dataKey="retention" stroke="#5C7C89" strokeWidth={2} />
            <Line type="monotone" dataKey="attrition" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
