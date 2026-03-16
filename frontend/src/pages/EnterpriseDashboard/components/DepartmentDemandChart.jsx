import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { departmentDemand } from '../enterpriseMockData';

const BAR_FILLS = [
  'rgba(123, 158, 255, 0.9)',
  'rgba(103, 216, 255, 0.85)',
  'rgba(122, 213, 255, 0.9)',
  'rgba(144, 174, 243, 0.9)',
  'rgba(141, 233, 182, 0.85)',
];

export default function DepartmentDemandChart() {
  const sorted = useMemo(() => {
    const total = departmentDemand.reduce((s, d) => s + d.count, 0);
    return [...departmentDemand]
      .sort((a, b) => b.count - a.count)
      .map((d) => ({ ...d, sharePct: total > 0 ? Math.round((d.count / total) * 100) : 0 }));
  }, []);

  return (
    <article className="ed-card ed-chart-card ed-demand-card">
      <h3 className="ed-card-title">Role Demand by Department</h3>
      <p className="ed-card-desc">Sorted by demand; tooltip shows % of total hiring.</p>
      <div className="ed-chart-wrap ed-bar-wrap">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={sorted} margin={{ top: 8, right: 8, left: 8, bottom: 24 }}>
            <XAxis dataKey="name" stroke="#a9bee9" tick={{ fontSize: 11 }} />
            <YAxis stroke="#a9bee9" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(12, 21, 49, 0.95)',
                border: '1px solid rgba(127, 160, 255, 0.35)',
                borderRadius: '10px',
                color: '#e9efff',
              }}
              formatter={(value, name, props) => [
                `${value} (${props.payload.sharePct}% of total)`,
                props.payload.name,
              ]}
              labelFormatter={() => ''}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {sorted.map((_, i) => (
                <Cell key={i} fill={BAR_FILLS[i % BAR_FILLS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
