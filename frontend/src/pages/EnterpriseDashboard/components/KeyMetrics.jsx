import { keyMetricsComparison } from '../dashboardMockData';

export default function KeyMetrics({ data }) {
  const metrics = data
    ? [
        { metric: 'Budget utilization', value: data.budgetUtilizationPercent ?? 0 },
        { metric: 'Quality of hire score', value: Math.round((data.qualityOfHireScore ?? 0) * 20) },
        { metric: 'Diversity index', value: Math.round((data.diversityIndex ?? 0) * 100) },
      ]
    : keyMetricsComparison;

  return (
    <article className="ed-card ed-keymetrics-card">
      <h3 className="ed-card-title">Key Metrics</h3>
      <p className="ed-card-desc">Budget, quality, and diversity</p>
      <ul className="ed-keymetrics-list">
        {metrics.map((row) => (
          <li key={row.metric} className="ed-keymetrics-row">
            <span className="ed-keymetrics-label">{row.metric}</span>
            <div className="ed-keymetrics-bar-bg">
              <div className="ed-keymetrics-bar-fill" style={{ width: `${Math.min(100, row.value)}%` }} />
            </div>
            <span className="ed-keymetrics-pct">{row.value}%</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
