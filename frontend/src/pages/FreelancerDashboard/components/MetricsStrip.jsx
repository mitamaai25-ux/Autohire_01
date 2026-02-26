export default function MetricsStrip({ data }) {
  if (!data) return null;

  const items = [
    { label: 'Profile Score', value: data.profileScore ?? 0, suffix: '/100' },
    { label: 'Trust Score', value: data.trustIndicator ?? 0, suffix: '/100' },
    { label: 'Response Time', value: data.responseTime?.value ?? 0, suffix: ' hrs' },
    { label: 'Projects Completed', value: data.projects?.completed ?? 0, suffix: '' },
  ];

  return (
    <div className="fd-strip">
      {items.map((item) => (
        <div key={item.label} className="fd-strip-item">
          <span className="fd-strip-label">{item.label}</span>
          <span className="fd-strip-value">
            {item.value}
            {item.suffix}
          </span>
        </div>
      ))}
    </div>
  );
}
