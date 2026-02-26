import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { performanceTrendData } from '../dashboardMockData';

const CHART_COLORS = {
  successRate: '#7ad5ff',
  clientRating: '#ffd27a',
  completedProjects: '#8de9b6',
};

export default function PerformanceChart() {
  return (
    <article className="fd-card fd-chart-card fd-performance-chart">
      <h3 className="fd-card-title">Performance Trend</h3>
      <p className="fd-card-desc">Last 8 weeks — success rate, client rating, completed projects</p>
      <div className="fd-chart-wrap fd-line-chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={performanceTrendData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(127, 160, 255, 0.15)" />
            <XAxis dataKey="week" stroke="#a9bee9" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#a9bee9" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#a9bee9" tick={{ fontSize: 11 }} domain={[0, 5]} />
            <Tooltip
              contentStyle={{
                background: 'rgba(12, 21, 49, 0.95)',
                border: '1px solid rgba(127, 160, 255, 0.35)',
                borderRadius: '10px',
                color: '#e9efff',
              }}
              labelStyle={{ color: '#b6c8f3' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value) => <span style={{ color: '#b5c4ea' }}>{value}</span>}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="successRate"
              name="Success Rate %"
              stroke={CHART_COLORS.successRate}
              strokeWidth={2}
              dot={{ fill: CHART_COLORS.successRate, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="clientRating"
              name="Client Rating"
              stroke={CHART_COLORS.clientRating}
              strokeWidth={2}
              dot={{ fill: CHART_COLORS.clientRating, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="completedProjects"
              name="Completed Projects"
              stroke={CHART_COLORS.completedProjects}
              strokeWidth={2}
              dot={{ fill: CHART_COLORS.completedProjects, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
