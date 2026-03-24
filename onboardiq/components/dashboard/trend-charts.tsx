'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { trendSeries } from '@/lib/mock-data';

export function TrendCharts() {
  return (
    <section className="card p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">90-Day Performance Trend</h3>
        <div className="flex gap-2 text-xs">
          <button className="rounded-lg border border-slate-200 bg-slate-100 px-2 py-1 dark:border-[#5C7C89]/40 dark:bg-slate-700">30D</button>
          <button className="rounded-lg border border-slate-200 bg-slate-100 px-2 py-1 dark:border-[#5C7C89]/40 dark:bg-slate-700">60D</button>
          <button className="rounded-lg bg-[#1F4959] px-2 py-1 text-white">90D</button>
        </div>
      </div>
      <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
        Productivity and retention are trending upward while early attrition is stabilizing below target thresholds.
      </p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendSeries}>
            <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.2} />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: '0.75rem',
                border: '1px solid rgba(148, 163, 184, 0.35)',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.12)'
              }}
            />
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
