/**
 * Local mock data for Enterprise Dashboard charts.
 * Time-series and chart-specific data; primary KPIs come from API.
 */

// Last 8 weeks: time-to-hire (days) and roles filled
export const timeToHireTrendData = [
  { week: 'W1', avgDays: 35, rolesFilled: 1 },
  { week: 'W2', avgDays: 32, rolesFilled: 2 },
  { week: 'W3', avgDays: 30, rolesFilled: 2 },
  { week: 'W4', avgDays: 31, rolesFilled: 3 },
  { week: 'W5', avgDays: 29, rolesFilled: 2 },
  { week: 'W6', avgDays: 28, rolesFilled: 3 },
  { week: 'W7', avgDays: 27, rolesFilled: 2 },
  { week: 'W8', avgDays: 28, rolesFilled: 3 },
];

// Department/role demand mix (bar chart, not radar)
export const roleDemandData = [
  { name: 'Engineering', count: 12, fill: 'rgba(123, 158, 255, 0.9)' },
  { name: 'Product', count: 6, fill: 'rgba(103, 216, 255, 0.85)' },
  { name: 'Sales', count: 5, fill: 'rgba(122, 213, 255, 0.9)' },
  { name: 'Operations', count: 4, fill: 'rgba(144, 174, 243, 0.9)' },
  { name: 'Design', count: 3, fill: 'rgba(141, 233, 182, 0.85)' },
];

// Key metrics for comparison block (budget, quality, diversity)
export const keyMetricsComparison = [
  { metric: 'Budget utilization', value: 78 },
  { metric: 'Quality of hire score', value: 84 },
  { metric: 'Diversity index', value: 68 },
];
