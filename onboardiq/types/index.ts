export type Role = 'ADMIN' | 'HR' | 'MANAGER';

export type InsightPayload = {
  retentionScore: number;
  attritionRisk: string;
  sentiment: 'positive' | 'neutral' | 'negative' | string;
  skillGap: string[];
};
