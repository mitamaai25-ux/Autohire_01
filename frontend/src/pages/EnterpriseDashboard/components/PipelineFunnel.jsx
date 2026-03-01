import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const STAGE_FILLS = [
  'rgba(123, 158, 255, 0.9)',
  'rgba(103, 216, 255, 0.85)',
  'rgba(122, 213, 255, 0.9)',
  'rgba(255, 215, 122, 0.85)',
  'rgba(141, 233, 182, 0.9)',
];

export default function PipelineFunnel({ pipeline }) {
  if (!pipeline) return null;

  const data = [
    { stage: 'Open', count: pipeline.open },
    { stage: 'Shortlisted', count: pipeline.shortlisted },
    { stage: 'Interview', count: pipeline.interview },
    { stage: 'Offered', count: pipeline.offered },
    { stage: 'Filled', count: pipeline.filled },
  ];

  return (
    <article className="ed-card ed-chart-card ed-funnel-card">
      <h3 className="ed-card-title">Hiring Pipeline</h3>
      <p className="ed-card-desc">Open → Shortlisted → Interview → Offered → Filled</p>
      <div className="ed-chart-wrap ed-funnel-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 16, left: 72, bottom: 8 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="stage" width={68} stroke="#a9bee9" tick={{ fontSize: 11 }} />
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
              {data.map((_, i) => (
                <Cell key={i} fill={STAGE_FILLS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
