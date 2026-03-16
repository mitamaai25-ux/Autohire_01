/**
 * Local mock data for Freelancer Dashboard charts and derived visuals.
 * Can be wired to real APIs later. Does not replace API response for primary metrics.
 */

// Last 8 weeks: growth-oriented time series
export const performanceTrendData = [
  { week: 'W1', successRate: 18, clientRating: 4.2, completedProjects: 2 },
  { week: 'W2', successRate: 20, clientRating: 4.3, completedProjects: 3 },
  { week: 'W3', successRate: 22, clientRating: 4.4, completedProjects: 5 },
  { week: 'W4', successRate: 21, clientRating: 4.5, completedProjects: 6 },
  { week: 'W5', successRate: 24, clientRating: 4.6, completedProjects: 8 },
  { week: 'W6', successRate: 25, clientRating: 4.7, completedProjects: 10 },
  { week: 'W7', successRate: 23, clientRating: 4.65, completedProjects: 12 },
  { week: 'W8', successRate: 25, clientRating: 4.7, completedProjects: 14 },
];

// Funnel: Applied → Shortlisted → Interview → Hired → Completed (derived from 48 applications, 12 interviews)
export const hiringFunnelData = [
  { stage: 'Applied', count: 48, fill: 'rgba(123, 158, 255, 0.9)' },
  { stage: 'Shortlisted', count: 28, fill: 'rgba(103, 216, 255, 0.85)' },
  { stage: 'Interview', count: 12, fill: 'rgba(122, 213, 255, 0.9)' },
  { stage: 'Hired', count: 8, fill: 'rgba(144, 174, 243, 0.9)' },
  { stage: 'Completed', count: 6, fill: 'rgba(137, 172, 255, 0.95)' },
];

// 6-axis radar: normalized 0–100 (mock from skill match + completeness + extra dimensions)
export const skillsRadarData = [
  { subject: 'Technical Skill', value: 88, fullMark: 100 },
  { subject: 'Communication', value: 85, fullMark: 100 },
  { subject: 'Delivery Speed', value: 82, fullMark: 100 },
  { subject: 'Reliability', value: 90, fullMark: 100 },
  { subject: 'Domain Knowledge', value: 78, fullMark: 100 },
  { subject: 'Profile Strength', value: 87, fullMark: 100 },
];

// Project health donut: Completed | In Progress | At Risk | Delayed
export const projectHealthData = [
  { name: 'Completed', value: 22, fill: 'rgba(141, 233, 182, 0.9)' },
  { name: 'In Progress', value: 1, fill: 'rgba(123, 158, 255, 0.9)' },
  { name: 'At Risk', value: 0, fill: 'rgba(255, 215, 122, 0.9)' },
  { name: 'Delayed', value: 1, fill: 'rgba(255, 143, 154, 0.85)' },
];

// Quality metrics for comparison block (metric name, percentage, label)
export const qualityMetricsComparison = [
  { metric: 'On-time delivery', value: 95, label: 'Above Avg' },
  { metric: 'Communication clarity', value: 92, label: 'Above Avg' },
  { metric: 'Scope adherence', value: 88, label: 'Avg' },
  { metric: 'Technical quality', value: 94, label: 'Above Avg' },
];
