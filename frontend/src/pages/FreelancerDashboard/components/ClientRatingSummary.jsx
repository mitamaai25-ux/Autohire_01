export default function ClientRatingSummary({ clientRating }) {
  const weighted = clientRating?.weighted ?? 0;
  const outOf = clientRating?.outOf ?? 5;
  const totalReviews = clientRating?.totalReviews ?? 0;
  const filledStars = Math.round(weighted);

  return (
    <article className="fd-card fd-chart-card fd-rating-card">
      <h3 className="fd-card-title">Client Rating Summary</h3>
      <p className="fd-card-desc">Weighted average from reviews</p>
      <div className="fd-rating-content">
        <p className="fd-rating-value">
          {weighted}
          <span className="fd-rating-outof">/ {outOf}</span>
        </p>
        <div className="fd-stars" aria-hidden>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`fd-star ${i <= filledStars ? 'filled' : ''}`}>
              ★
            </span>
          ))}
        </div>
        <p className="fd-muted">{totalReviews} reviews</p>
      </div>
    </article>
  );
}
