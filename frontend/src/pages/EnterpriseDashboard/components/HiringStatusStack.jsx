import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { requisitionStatus } from '../enterpriseMockData';

export default function HiringStatusStack() {
  const data = [{ name: 'Total', ...Object.fromEntries(requisitionStatus.map((r) => [r.status, r.count])) }];

  return (
    <article className="ed-card ed-chart-card ed-status-stack-card">
      <h3 className="ed-card-title">Hiring Status Distribution</h3>
      <p className="ed-card-desc">Open | In Progress | Blocked | Filled</p>
      <div className="ed-chart-wrap ed-stack-wrap">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }} barCategoryGap="20%">
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={0} hide />
            <Tooltip
              contentStyle={{
                background: 'rgba(12, 21, 49, 0.95)',
                border: '1px solid rgba(127, 160, 255, 0.35)',
                borderRadius: '10px',
                color: '#e9efff',
              }}
              formatter={(value, name) => [value, name]}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px' }}
              formatter={(value) => <span style={{ color: '#b5c4ea' }}>{value}</span>}
            />
            {requisitionStatus.map((r) => (
              <Bar key={r.status} dataKey={r.status} stackId="status" fill={r.fill} radius={[0, 0, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className="ed-stack-legend">
          {requisitionStatus.map((r) => (
            <span key={r.status} className="ed-stack-legend-item">
              <span className="ed-stack-dot" style={{ background: r.fill }} />
              {r.status}: {r.count}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
