import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { hiringFunnelData } from '../dashboardMockData';

export default function HiringFunnel() {
  return (
    <article className="fd-card fd-chart-card fd-funnel-card">
      <h3 className="fd-card-title">Hiring Funnel</h3>
      <p className="fd-card-desc">Applied → Shortlisted → Interview → Hired → Completed</p>
      <div className="fd-chart-wrap fd-funnel-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={hiringFunnelData}
            layout="vertical"
            margin={{ top: 8, right: 16, left: 60, bottom: 8 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="stage" width={56} stroke="#a9bee9" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(12, 21, 49, 0.95)',
                border: '1px solid rgba(127, 160, 255, 0.35)',
                borderRadius: '10px',
                color: '#e9efff',
              }}
              formatter={(value) => [value, 'Count']}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {hiringFunnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
