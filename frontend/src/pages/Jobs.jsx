import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: 'j1',
    title: 'Founding Frontend Freelancer',
    company: 'Northstar Hiring Cloud',
    type: 'Freelance',
    mode: 'Remote',
    area: 'Global',
    budget: '$45-$60/hr',
    summary: 'Build responsive hiring funnels, candidate portals, and recruiter workspaces.',
  },
  {
    id: 'j2',
    title: 'Talent Operations Specialist',
    company: 'BridgeLane People Ops',
    type: 'Full Time',
    mode: 'Hybrid',
    area: 'New York',
    budget: '$85k-$105k',
    summary: 'Own onboarding workflows, compliance tasks, and stakeholder activation.',
  },
  {
    id: 'j3',
    title: 'Marketplace Growth Manager',
    company: 'Orbit Freelance Network',
    type: 'Full Time',
    mode: 'Remote',
    area: 'Austin',
    budget: '$95k-$120k',
    summary: 'Grow client demand, freelancer supply, and conversion across the marketplace.',
  },
  {
    id: 'j4',
    title: 'Freelance Product Designer',
    company: 'Launchpad Studio',
    type: 'Freelance',
    mode: 'Online',
    area: 'San Francisco',
    budget: '$50-$70/hr',
    summary: 'Design branded onboarding journeys, dashboards, and profile activation flows.',
  },
  {
    id: 'j5',
    title: 'Recruiting Coordinator',
    company: 'Atlas Talent Partners',
    type: 'Full Time',
    mode: 'Onsite',
    area: 'Chicago',
    budget: '$62k-$75k',
    summary: 'Coordinate interviews, candidate communication, and hiring manager updates.',
  },
  {
    id: 'j6',
    title: 'Implementation Freelancer',
    company: 'AutoHire Success Team',
    type: 'Freelance',
    mode: 'Hybrid',
    area: 'Los Angeles',
    budget: '$55-$80/hr',
    summary: 'Configure client onboarding, integrations, and launch checklists for new accounts.',
  },
];

function Jobs() {
  const [activeType, setActiveType] = useState('Freelance');
  const [activeMode, setActiveMode] = useState('All');
  const [area, setArea] = useState('');

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const typeOk = job.type === activeType;
        const modeOk = activeMode === 'All' || job.mode === activeMode;
        const areaOk = !area.trim() || job.area.toLowerCase().includes(area.trim().toLowerCase());
        return typeOk && modeOk && areaOk;
      }),
    [activeType, activeMode, area]
  );

  return (
    <main className="page jobs-page">
      <section className="card jobs-card">
        <div className="dashboard-header jobs-header">
          <div>
            <p className="badge">Marketplace</p>
            <h2>Hiring & Freelance Marketplace</h2>
            <p className="subtitle">
              Explore curated freelance engagements and full-time hiring opportunities across recruiting,
              onboarding, product, and operations teams.
            </p>
          </div>
          <Link className="btn btn-secondary" to="/ui">
            Home
          </Link>
        </div>

        <div className="jobs-types" role="tablist" aria-label="Job types">
          {['Freelance', 'Full Time'].map((type) => (
            <button
              className={`jobs-type-btn ${activeType === type ? 'active' : ''}`}
              key={type}
              onClick={() => setActiveType(type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>

        <div className="jobs-filters">
          <div>
            <label htmlFor="modeFilter">Work Mode</label>
            <select id="modeFilter" value={activeMode} onChange={(event) => setActiveMode(event.target.value)}>
              <option value="All">All</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
              <option value="Online">Online</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>
          <div>
            <label htmlFor="areaSearch">Working Area Search</label>
            <input
              id="areaSearch"
              placeholder="Search city/area"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            />
          </div>
        </div>

        <div className="jobs-dashboard-links">
          <Link className="btn btn-secondary" to="/jobs/dashboard/part-time">
            Part-Time Dashboard
          </Link>
          <Link className="btn btn-secondary" to="/jobs/dashboard/full-time">
            Full-Time Dashboard
          </Link>
          <Link className="btn btn-secondary" to="/jobs/dashboard/hybrid">
            Hybrid Dashboard
          </Link>
          <Link className="btn btn-secondary" to="/jobs/dashboard/remote">
            Remote Dashboard
          </Link>
          <Link className="btn btn-secondary" to="/jobs/dashboard/online">
            Online Dashboard
          </Link>
        </div>

        <section className="jobs-grid">
          {filteredJobs.length === 0 ? (
            <p className="muted">No jobs found for selected filters.</p>
          ) : (
            filteredJobs.map((job) => (
              <article className="job-item" key={job.id}>
                <div className="job-item-head">
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                  <span className="job-budget">{job.budget}</span>
                </div>
                <p className="muted">
                  {job.type} • {job.mode} • {job.area}
                </p>
                <p>{job.summary}</p>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default Jobs;
