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
    <section className="card p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">AI Insights Brief</h3>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:border-[#5C7C89]/40 dark:bg-[#011425] dark:text-slate-300">
          {insights.source} model
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm md:grid-cols-2">
        <p>Predictive retention score: <strong>{payload.retentionScore}/100</strong></p>
        <p>Early attrition risk: <strong>{payload.attritionRisk}</strong></p>
        <p>Sentiment trend: <strong className="capitalize">{payload.sentiment}</strong></p>
        <p>Top skill gaps: <strong>{payload.skillGap.length}</strong></p>
      </div>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{insights.summary}</p>
      <h4 className="mt-4 text-sm font-semibold">Recommended actions</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {insights.recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
