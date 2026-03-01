import { governanceMetrics } from '../enterpriseMockData';

export default function GovernanceMetrics() {
  const { costPerHire, hiringQualityScore, diversityIndex, offerDeclineReasons } = governanceMetrics;
  const maxDecline = Math.max(...offerDeclineReasons.map((r) => r.count), 1);

  return (
    <article className="ed-card ed-governance-card">
      <h3 className="ed-card-title">Quality, Cost & Diversity</h3>
      <p className="ed-card-desc">HR governance metrics</p>

      <div className="ed-gov-blocks">
        <div className="ed-gov-block">
          <span className="ed-gov-label">Cost per Hire</span>
          <span className="ed-gov-value">${costPerHire.toLocaleString()}</span>
        </div>
        <div className="ed-gov-block">
          <span className="ed-gov-label">Hiring Quality Score</span>
          <span className="ed-gov-value">{hiringQualityScore}%</span>
        </div>
        <div className="ed-gov-block">
          <span className="ed-gov-label">Diversity Index</span>
          <span className="ed-gov-value">{diversityIndex}%</span>
        </div>
      </div>

      <div className="ed-decline-section">
        <h4 className="ed-decline-title">Offer Decline Reasons</h4>
        <ul className="ed-decline-list">
          {offerDeclineReasons.map((r) => (
            <li key={r.reason} className="ed-decline-row">
              <span className="ed-decline-label">{r.reason}</span>
              <div className="ed-decline-bar-bg">
                <div
                  className="ed-decline-bar-fill"
                  style={{ width: `${(r.count / maxDecline) * 100}%` }}
                />
              </div>
              <span className="ed-decline-count">{r.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
