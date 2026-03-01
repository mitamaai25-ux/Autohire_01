import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { roleDemandData } from '../dashboardMockData';

export default function RoleDemandChart() {
  return (
    <article className="ed-card ed-chart-card ed-role-card">
      <h3 className="ed-card-title">Role Demand by Department</h3>
      <p className="ed-card-desc">Open requisitions by area</p>
      <div className="ed-chart-wrap ed-bar-wrap">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={roleDemandData} margin={{ top: 8, right: 8, left: 8, bottom: 24 }}>
            <XAxis dataKey="name" stroke="#a9bee9" tick={{ fontSize: 11 }} />
            <YAxis stroke="#a9bee9" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(12, 21, 49, 0.95)',
                border: '1px solid rgba(127, 160, 255, 0.35)',
                borderRadius: '10px',
                color: '#e9efff',
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={36}>
              {roleDemandData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
