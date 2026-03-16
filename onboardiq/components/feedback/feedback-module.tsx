'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sentimentTrend = [
  { month: 'Jan', positive: 62, neutral: 28, negative: 10 },
  { month: 'Feb', positive: 64, neutral: 25, negative: 11 },
  { month: 'Mar', positive: 70, neutral: 20, negative: 10 }
];

export function FeedbackModule() {
  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold">Feedback Module</h3>
      <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
        <p>Pulse survey builder: <strong>Enabled</strong></p>
        <p>Anonymous feedback: <strong>Toggle On</strong></p>
        <p>eNPS: <strong>+38</strong></p>
      </div>
      <div className="mt-4 h-72">
        <ResponsiveContainer>
          <LineChart data={sentimentTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="positive" stroke="#22c55e" />
            <Line dataKey="neutral" stroke="#5C7C89" />
            <Line dataKey="negative" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
