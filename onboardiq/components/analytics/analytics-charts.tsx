'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

const ramp = [
  { week: 'W1', productivity: 20 },
  { week: 'W2', productivity: 35 },
  { week: 'W3', productivity: 48 },
  { week: 'W4', productivity: 60 },
  { week: 'W5', productivity: 71 }
];
const attrition = [
  { dept: 'Eng', value: 4 },
  { dept: 'Sales', value: 11 },
  { dept: 'HR', value: 3 },
  { dept: 'Support', value: 9 }
];
const engagementHeat = [
  { team: 'A', score: 82 },
  { team: 'B', score: 73 },
  { team: 'C', score: 65 },
  { team: 'D', score: 88 }
];

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="card p-4">
        <h3 className="mb-2 font-semibold">Productivity Ramp-up</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={ramp}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line dataKey="productivity" stroke="#1F4959" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card p-4">
        <h3 className="mb-2 font-semibold">Attrition by Department</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={attrition}>
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#5C7C89" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card p-4">
        <h3 className="mb-2 font-semibold">Onboarding Stage Drop-off (Funnel Approx)</h3>
        <div className="space-y-2 text-sm">
          {[
            ['Offer Accepted', 100],
            ['Documentation', 92],
            ['IT Provisioning', 83],
            ['Training', 72],
            ['Productive', 59]
          ].map(([label, value]) => (
            <div key={String(label)}>
              <div className="mb-1 flex justify-between"><span>{label}</span><span>{value}%</span></div>
              <div className="h-2 rounded bg-slate-200 dark:bg-slate-700"><div className="h-2 rounded bg-[#1F4959]" style={{ width: `${value}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-4">
        <h3 className="mb-2 font-semibold">Engagement by Team (Heat/Radar)</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <RadarChart data={engagementHeat}>
              <PolarGrid />
              <PolarAngleAxis dataKey="team" />
              <PolarRadiusAxis />
              <Radar dataKey="score" stroke="#1F4959" fill="#5C7C89" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
