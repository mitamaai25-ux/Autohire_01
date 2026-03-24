export const kpis = [
  { label: 'Time to Productivity', value: '42 days', change: '+6%' },
  { label: '90-Day Retention Rate', value: '88%', change: '+2%' },
  { label: 'Early Attrition %', value: '9%', change: '-1.1%' },
  { label: 'Training Completion %', value: '91%', change: '+4%' },
  { label: 'Engagement Score', value: '78/100', change: '+5' }
];

export const dashboardSummary = [
  { label: 'Active Cohorts', value: '12', context: 'Across 4 business units' },
  { label: 'Employees Onboarding', value: '248', context: '32 started this week' },
  { label: 'Average Onboarding NPS', value: '+47', context: '+3 points vs prior cycle' },
  { label: 'Manager Response SLA', value: '6.2 hrs', context: 'Target: <8 hours' }
];

export const trendSeries = [
  { period: 'Day 30', productivity: 41, retention: 86, attrition: 12 },
  { period: 'Day 60', productivity: 63, retention: 88, attrition: 10 },
  { period: 'Day 90', productivity: 77, retention: 90, attrition: 8 }
];

export const departments = ['Engineering', 'Sales', 'HR', 'Support'];

export const departmentReadiness = [
  { department: 'Engineering', completion: 94, risk: 'Low' },
  { department: 'Sales', completion: 88, risk: 'Moderate' },
  { department: 'HR', completion: 96, risk: 'Low' },
  { department: 'Support', completion: 83, risk: 'Moderate' }
];

export const stageFunnel = [
  { stage: 'Offer Accepted', value: 100 },
  { stage: 'Documentation', value: 92 },
  { stage: 'IT Access', value: 84 },
  { stage: 'Training', value: 74 },
  { stage: 'Productive', value: 61 }
];
