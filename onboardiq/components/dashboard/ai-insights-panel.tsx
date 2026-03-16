import { generateOnboardingInsights } from '@/lib/ai';

export async function AIInsightsPanel() {
  const payload = {
    retentionScore: 82,
    attritionRisk: 'Low-Medium',
    sentiment: 'neutral',
    skillGap: ['Product Knowledge', 'Stakeholder Communication', 'Advanced Tooling']
  };
  const insights = await generateOnboardingInsights(payload);

  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold">AI Insights Panel</h3>
      <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
        <p>Predictive Retention Score: <strong>{payload.retentionScore}/100</strong></p>
        <p>Early Attrition Risk: <strong>{payload.attritionRisk}</strong></p>
        <p>Sentiment: <strong className="capitalize">{payload.sentiment}</strong></p>
        <p>Insight Source: <strong className="uppercase">{insights.source}</strong></p>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{insights.summary}</p>
      <ul className="mt-2 list-disc pl-5 text-sm">
        {insights.recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
