import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { funnelConversion } from '../enterpriseMockData';

export default function HiringFunnel() {
  return (
    <article className="ed-card ed-chart-card ed-funnel-card">
      <h3 className="ed-card-title">Hiring Funnel</h3>
      <p className="ed-card-desc">Open → Screened → Interviewed → Offered → Joined</p>
      <div className="ed-chart-wrap ed-funnel-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={funnelConversion}
            layout="vertical"
            margin={{ top: 8, right: 16, left: 72, bottom: 8 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="stage" width={72} stroke="#a9bee9" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(12, 21, 49, 0.95)',
                border: '1px solid rgba(127, 160, 255, 0.35)',
                borderRadius: '10px',
                color: '#e9efff',
              }}
              formatter={(value) => [value, 'Count']}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={26}>
              {funnelConversion.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
