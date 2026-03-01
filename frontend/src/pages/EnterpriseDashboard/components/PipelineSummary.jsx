export default function PipelineSummary({ data }) {
  if (!data) return null;
  const rate = data.offerAcceptanceRate ?? 0;
  const diversity = Math.round((data.diversityIndex ?? 0) * 100);

  return (
    <article className="ed-card ed-summary-card">
      <h3 className="ed-card-title">Pipeline at a Glance</h3>
      <p className="ed-card-desc">Offer acceptance and diversity</p>
      <div className="ed-summary-content">
        <div className="ed-summary-block">
          <span className="ed-summary-value">{rate}%</span>
          <span className="ed-summary-label">Offer acceptance</span>
        </div>
        <div className="ed-summary-block">
          <span className="ed-summary-value">{diversity}</span>
          <span className="ed-summary-label">Diversity index</span>
        </div>
      </div>
    </article>
  );
}
