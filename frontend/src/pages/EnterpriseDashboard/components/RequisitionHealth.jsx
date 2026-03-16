import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const HEALTH_FILLS = {
  filled: 'rgba(141, 233, 182, 0.9)',
  inProgress: 'rgba(123, 158, 255, 0.9)',
  onHold: 'rgba(255, 215, 122, 0.9)',
  open: 'rgba(144, 174, 243, 0.85)',
};

const LABELS = {
  filled: 'Filled',
  inProgress: 'In Progress',
  onHold: 'On Hold',
  open: 'Open',
};

export default function RequisitionHealth({ requisitionHealth }) {
  if (!requisitionHealth) return null;

  const data = Object.entries(requisitionHealth).map(([key, value]) => ({
    name: LABELS[key] || key,
    value,
    fill: HEALTH_FILLS[key] || 'rgba(137, 172, 255, 0.8)',
  }));

  return (
    <article className="ed-card ed-chart-card ed-donut-card">
      <h3 className="ed-card-title">Requisition Health</h3>
      <p className="ed-card-desc">By status: Filled, In Progress, On Hold, Open</p>
      <div className="ed-chart-wrap ed-donut-wrap">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="rgba(10, 16, 35, 0.6)" strokeWidth={1} />
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
