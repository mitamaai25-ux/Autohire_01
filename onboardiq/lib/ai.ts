import OpenAI from 'openai';

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export async function generateOnboardingInsights(input: {
  retentionScore: number;
  attritionRisk: string;
  sentiment: string;
  skillGap: string[];
}) {
  if (!client) {
    return {
      source: 'mock',
      summary:
        `Retention looks ${input.retentionScore >= 75 ? 'healthy' : 'at risk'} with ${input.attritionRisk} attrition risk. ` +
        `Primary coaching focus should include: ${input.skillGap.join(', ')}. Sentiment is currently ${input.sentiment}.`,
      recommendations: [
        'Increase manager check-ins during first 45 days.',
        'Assign role-specific training modules for top skill gaps.',
        'Run a pulse survey every two weeks and escalate low sentiment trends.'
      ]
    };
  }

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are an HR onboarding analyst. Return concise recommendations in plain language.'
      },
      {
        role: 'user',
        content: `Retention score: ${input.retentionScore}; Attrition risk: ${input.attritionRisk}; Sentiment: ${input.sentiment}; Skill gaps: ${input.skillGap.join(', ')}`
      }
    ]
  });

  return {
    source: 'openai',
    summary: response.choices[0]?.message?.content || 'No summary generated.',
    recommendations: []
  };
}
