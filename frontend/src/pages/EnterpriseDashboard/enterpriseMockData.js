/**
 * Enterprise Dashboard — local mock data only.
 * No backend or API edits. Used for charts and governance metrics.
 */

// Weekly hiring velocity (avg days to hire) + optional SLA target
export const weeklyHiringVelocity = [
  { week: 'W1', avgDays: 35, rolesFilled: 1 },
  { week: 'W2', avgDays: 32, rolesFilled: 2 },
  { week: 'W3', avgDays: 30, rolesFilled: 2 },
  { week: 'W4', avgDays: 31, rolesFilled: 3 },
  { week: 'W5', avgDays: 29, rolesFilled: 2 },
  { week: 'W6', avgDays: 28, rolesFilled: 3 },
  { week: 'W7', avgDays: 27, rolesFilled: 2 },
  { week: 'W8', avgDays: 28, rolesFilled: 3 },
];

export const slaTargetDays = 28;

// Department demand — will be sorted high → low in component; count + name
export const departmentDemand = [
  { name: 'Engineering', count: 12 },
  { name: 'Product', count: 6 },
  { name: 'Sales', count: 5 },
  { name: 'Operations', count: 4 },
  { name: 'Design', count: 3 },
];

// Funnel: Open → Screened → Interviewed → Offered → Joined
export const funnelConversion = [
  { stage: 'Open', count: 24, fill: 'rgba(123, 158, 255, 0.9)' },
  { stage: 'Screened', count: 16, fill: 'rgba(103, 216, 255, 0.85)' },
  { stage: 'Interviewed', count: 10, fill: 'rgba(122, 213, 255, 0.9)' },
  { stage: 'Offered', count: 6, fill: 'rgba(255, 215, 122, 0.85)' },
  { stage: 'Joined', count: 4, fill: 'rgba(141, 233, 182, 0.9)' },
];

// Requisition status for stacked bar: Open | In Progress | Blocked | Filled
export const requisitionStatus = [
  { status: 'Open', count: 10, fill: 'rgba(144, 174, 243, 0.9)' },
  { status: 'In Progress', count: 12, fill: 'rgba(123, 158, 255, 0.9)' },
  { status: 'Blocked', count: 4, fill: 'rgba(255, 215, 122, 0.85)' },
  { status: 'Filled', count: 18, fill: 'rgba(141, 233, 182, 0.9)' },
];

// Governance / HR analytics
export const governanceMetrics = {
  costPerHire: 4200,
  hiringQualityScore: 84,
  diversityIndex: 68,
  offerDeclineReasons: [
    { reason: 'Compensation', count: 12 },
    { reason: 'Timing', count: 8 },
    { reason: 'Role fit', count: 5 },
    { reason: 'Other', count: 3 },
  ],
};
