import { qualityMetricsComparison } from '../dashboardMockData';

export default function QualityMetrics() {
  return (
    <article className="fd-card fd-quality-card">
      <h3 className="fd-card-title">Quality Metrics</h3>
      <p className="fd-card-desc">Performance comparison</p>
      <ul className="fd-quality-list">
        {qualityMetricsComparison.map((row) => (
          <li key={row.metric} className="fd-quality-row">
            <span className="fd-quality-label">{row.metric}</span>
            <div className="fd-quality-bar-bg">
              <div className="fd-quality-bar-fill" style={{ width: `${row.value}%` }} />
            </div>
            <span className="fd-quality-pct">{row.value}%</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
