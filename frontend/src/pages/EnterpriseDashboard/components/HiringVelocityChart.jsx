import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { weeklyHiringVelocity, slaTargetDays } from '../enterpriseMockData';

const COLORS = { avgDays: '#7ad5ff', rolesFilled: '#8de9b6' };

export default function HiringVelocityChart() {
  return (
    <article className="ed-card ed-chart-card ed-velocity-card">
      <h3 className="ed-card-title">Hiring Velocity vs SLA</h3>
      <p className="ed-card-desc">Time-to-hire trend with {slaTargetDays}-day target; below target is on track.</p>
      <div className="ed-chart-wrap ed-line-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={weeklyHiringVelocity} margin={{ top: 8, right: 56, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(127, 160, 255, 0.15)" />
            <XAxis dataKey="week" stroke="#a9bee9" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#a9bee9" tick={{ fontSize: 11 }} name="Days" />
            <YAxis yAxisId="right" orientation="right" stroke="#a9bee9" tick={{ fontSize: 11 }} />
            <ReferenceLine
              yAxisId="left"
              y={slaTargetDays}
              stroke="#ffd27a"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'SLA target',
                fill: '#ffd27a',
                fontSize: 10,
                position: 'right',
                offset: 8,
              }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(12, 21, 49, 0.95)',
                border: '1px solid rgba(127, 160, 255, 0.35)',
                borderRadius: '10px',
                color: '#e9efff',
              }}
              labelStyle={{ color: '#b6c8f3' }}
              formatter={(value, name) => {
                if (name === 'Avg days to hire') return [value, `${value} days (target: ${slaTargetDays})`];
                return [value, name];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value) => (
                <span style={{ color: value === 'SLA target (days)' ? '#ffd27a' : '#b5c4ea' }}>{value}</span>
              )}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="avgDays"
              name="Avg days to hire"
              stroke={COLORS.avgDays}
              strokeWidth={2}
              dot={{ fill: COLORS.avgDays, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rolesFilled"
              name="Roles filled"
              stroke={COLORS.rolesFilled}
              strokeWidth={2}
              dot={{ fill: COLORS.rolesFilled, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
