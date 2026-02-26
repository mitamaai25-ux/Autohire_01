import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { projectHealthData } from '../dashboardMockData';

export default function ProjectHealth() {
  return (
    <article className="fd-card fd-chart-card fd-donut-card">
      <h3 className="fd-card-title">Project Health</h3>
      <p className="fd-card-desc">By status: Completed, In Progress, At Risk, Delayed</p>
      <div className="fd-chart-wrap fd-donut-wrap">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={projectHealthData}
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {projectHealthData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(10, 16, 35, 0.6)" strokeWidth={1} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
