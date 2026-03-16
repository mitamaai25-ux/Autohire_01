import { useMemo } from 'react';
import { weeklyHiringVelocity, funnelConversion, requisitionStatus } from '../enterpriseMockData';

function deriveKpis() {
  const openRequisitions = requisitionStatus.find((s) => s.status === 'Open')?.count ?? 0;
  const filled = requisitionStatus.find((s) => s.status === 'Filled')?.count ?? 0;
  const lastWeeks = weeklyHiringVelocity.slice(-4);
  const avgDays =
    lastWeeks.length > 0
      ? Math.round(lastWeeks.reduce((a, w) => a + w.avgDays, 0) / lastWeeks.length)
      : 0;
  const offered = funnelConversion.find((f) => f.stage === 'Offered')?.count ?? 0;
  const joined = funnelConversion.find((f) => f.stage === 'Joined')?.count ?? 0;
  const offerAcceptRate = offered > 0 ? Math.round((joined / offered) * 100) : 0;

  return {
    openRequisitions,
    filledThisQuarter: filled,
    avgTimeToHireDays: avgDays,
    offerAcceptanceRate: offerAcceptRate,
  };
}

export default function ExecutiveKPIs() {
  const kpis = useMemo(deriveKpis, []);

  const items = [
    { label: 'Open Requisitions', value: kpis.openRequisitions },
    { label: 'Roles Filled (This Quarter)', value: kpis.filledThisQuarter },
    { label: 'Avg Time-to-Hire', value: `${kpis.avgTimeToHireDays} days` },
    { label: 'Offer Acceptance Rate', value: `${kpis.offerAcceptanceRate}%` },
  ];

  return (
    <>
      {items.map((item) => (
        <article key={item.label} className="ed-kpi-card">
          <span className="ed-kpi-label">{item.label}</span>
          <span className="ed-kpi-value">{item.value}</span>
        </article>
      ))}
    </>
  );
}
