import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: 'j1',
    title: 'Frontend Developer',
    company: 'Nebula Labs',
    type: 'Part Time',
    mode: 'Remote',
    area: 'Bangalore',
  },
  {
    id: 'j2',
    title: 'Backend Engineer',
    company: 'Atlas Systems',
    type: 'Full Time',
    mode: 'Hybrid',
    area: 'Pune',
  },
  {
    id: 'j3',
    title: 'UI Designer',
    company: 'Pixel Orbit',
    type: 'Part Time',
    mode: 'Online',
    area: 'Mumbai',
  },
  {
    id: 'j4',
    title: 'Product Analyst',
    company: 'Northstar Data',
    type: 'Full Time',
    mode: 'Remote',
    area: 'Delhi',
  },
  {
    id: 'j5',
    title: 'QA Engineer',
    company: 'Helio Works',
    type: 'Full Time',
    mode: 'Online',
    area: 'Hyderabad',
  },
  {
    id: 'j6',
    title: 'Content Strategist',
    company: 'Echo Creative',
    type: 'Part Time',
    mode: 'Hybrid',
    area: 'Chennai',
  },
];

function Jobs() {
  const [activeType, setActiveType] = useState('Part Time');
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
        <h2>Jobs Dashboard</h2>
        <p className="subtitle">Browse part-time and full-time jobs by work mode and location area.</p>

        <div className="jobs-types" role="tablist" aria-label="Job types">
          {['Part Time', 'Full Time'].map((type) => (
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
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p className="muted">
                  {job.type} • {job.mode} • {job.area}
                </p>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default Jobs;
