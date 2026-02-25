import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const mockMetrics = {
  'part-time': {
    totalOpenings: 48,
    applicationsToday: 73,
    avgSalary: '₹35k/mo',
    topArea: 'Bangalore',
    trends: { daily: '+4%', weekly: '+11%', monthly: '+19%' },
    roles: [
      { title: 'Part-time UI Designer', area: 'Bangalore', applicants: 22, status: 'Screening' },
      { title: 'Evening Support Associate', area: 'Pune', applicants: 15, status: 'Interview' },
      { title: 'Content Editor', area: 'Mumbai', applicants: 11, status: 'Offer' },
    ],
  },
  'full-time': {
    totalOpenings: 91,
    applicationsToday: 156,
    avgSalary: '₹11.5L/y',
    topArea: 'Pune',
    trends: { daily: '+7%', weekly: '+14%', monthly: '+23%' },
    roles: [
      { title: 'Senior Backend Engineer', area: 'Pune', applicants: 41, status: 'Screening' },
      { title: 'Product Manager', area: 'Bangalore', applicants: 28, status: 'Interview' },
      { title: 'QA Automation Lead', area: 'Hyderabad', applicants: 18, status: 'Offer' },
    ],
  },
  hybrid: {
    totalOpenings: 57,
    applicationsToday: 84,
    avgSalary: '₹9.8L/y',
    topArea: 'Hyderabad',
    trends: { daily: '+3%', weekly: '+9%', monthly: '+16%' },
    roles: [
      { title: 'Hybrid Data Analyst', area: 'Hyderabad', applicants: 25, status: 'Screening' },
      { title: 'UX Researcher', area: 'Chennai', applicants: 13, status: 'Interview' },
      { title: 'Growth Specialist', area: 'Delhi', applicants: 9, status: 'Offer' },
    ],
  },
  remote: {
    totalOpenings: 66,
    applicationsToday: 120,
    avgSalary: '₹10.2L/y',
    topArea: 'Delhi NCR',
    trends: { daily: '+5%', weekly: '+13%', monthly: '+21%' },
    roles: [
      { title: 'Remote React Engineer', area: 'Delhi NCR', applicants: 37, status: 'Screening' },
      { title: 'Remote DevOps Engineer', area: 'Bangalore', applicants: 26, status: 'Interview' },
      { title: 'Remote Product Writer', area: 'Mumbai', applicants: 14, status: 'Offer' },
    ],
  },
  online: {
    totalOpenings: 39,
    applicationsToday: 59,
    avgSalary: '₹7.4L/y',
    topArea: 'Mumbai',
    trends: { daily: '+2%', weekly: '+6%', monthly: '+12%' },
    roles: [
      { title: 'Online Tutor', area: 'Mumbai', applicants: 19, status: 'Screening' },
      { title: 'Online Community Manager', area: 'Kolkata', applicants: 12, status: 'Interview' },
      { title: 'Virtual Assistant', area: 'Chandigarh', applicants: 8, status: 'Offer' },
    ],
  },
};

function JobsDashboard() {
  const { mode = 'part-time' } = useParams();
  const [windowKey, setWindowKey] = useState('weekly');
  const [areaFilter, setAreaFilter] = useState('');

  const metrics = useMemo(() => mockMetrics[mode] || mockMetrics['part-time'], [mode]);

  const label = mode
    .split('-')
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

  const filteredRoles = useMemo(
    () =>
      metrics.roles.filter((role) =>
        !areaFilter.trim() ? true : role.area.toLowerCase().includes(areaFilter.trim().toLowerCase())
      ),
    [metrics.roles, areaFilter]
  );

  return (
    <main className="page jobs-page">
      <section className="card jobs-card">
        <div className="dashboard-header">
          <h2>{label} Jobs Dashboard</h2>
          <Link className="btn btn-secondary" to="/jobs">
            Back to Jobs
          </Link>
        </div>

        <div className="stats-grid jobs-stats-grid">
          <article>
            <h3>Total Openings</h3>
            <p>{metrics.totalOpenings}</p>
          </article>
          <article>
            <h3>Applications Today</h3>
            <p>{metrics.applicationsToday}</p>
          </article>
          <article>
            <h3>Average Package</h3>
            <p>{metrics.avgSalary}</p>
          </article>
          <article>
            <h3>Top Working Area</h3>
            <p>{metrics.topArea}</p>
          </article>
        </div>

        <section className="jobs-insights">
          <div className="jobs-insights-header">
            <h3>Demand Insights</h3>
            <div className="jobs-window-tabs" role="tablist" aria-label="Demand window">
              {['daily', 'weekly', 'monthly'].map((item) => (
                <button
                  className={`jobs-window-btn ${windowKey === item ? 'active' : ''}`}
                  key={item}
                  onClick={() => setWindowKey(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <p className="muted">
            Hiring demand trend ({windowKey}): <strong>{metrics.trends[windowKey]}</strong>
          </p>
        </section>

        <section className="jobs-role-section">
          <div className="jobs-role-header">
            <h3>Role Pipeline</h3>
            <input
              placeholder="Filter pipeline by area"
              value={areaFilter}
              onChange={(event) => setAreaFilter(event.target.value)}
            />
          </div>

          <div className="jobs-grid">
            {filteredRoles.length === 0 ? (
              <p className="muted">No roles found for selected area filter.</p>
            ) : (
              filteredRoles.map((role) => (
                <article className="job-item" key={`${role.title}-${role.area}`}>
                  <h3>{role.title}</h3>
                  <p className="muted">Area: {role.area}</p>
                  <p>Applicants: {role.applicants}</p>
                  <p>
                    Pipeline: <strong>{role.status}</strong>
                  </p>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default JobsDashboard;
