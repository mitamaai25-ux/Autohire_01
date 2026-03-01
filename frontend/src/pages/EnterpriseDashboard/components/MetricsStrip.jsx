export default function MetricsStrip({ data }) {
  if (!data) return null;

  const items = [
    { label: 'Open Requisitions', value: data.openRequisitions ?? 0 },
    { label: 'Filled This Quarter', value: data.filledThisQuarter ?? 0 },
    { label: 'Avg Time-to-Hire', value: `${data.avgTimeToHireDays ?? 0} days` },
    { label: 'Offer Accept Rate', value: `${data.offerAcceptanceRate ?? 0}%` },
  ];

  return (
    <div className="ed-strip">
      {items.map((item) => (
        <div key={item.label} className="ed-strip-item">
          <span className="ed-strip-label">{item.label}</span>
          <span className="ed-strip-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
