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

const skillLibrary = {
  engineer: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'REST APIs'],
  developer: ['React', 'Node.js', 'Testing', 'Git', 'Problem Solving'],
  designer: ['Figma', 'Wireframing', 'Design Systems', 'User Research', 'Prototyping'],
  analyst: ['SQL', 'Excel', 'Dashboarding', 'Data Modeling', 'Stakeholder Reporting'],
  manager: ['Roadmapping', 'Communication', 'Sprint Planning', 'Prioritization', 'Risk Management'],
  tutor: ['Communication', 'Curriculum Planning', 'Assessment', 'Presentation', 'Mentoring'],
};

const vagueTerms = ['good', 'best', 'various', 'etc', 'some', 'dynamic', 'hardworking', 'nice'];

const getRoleSkills = (title = '') => {
  const lower = title.toLowerCase();
  const firstKey = Object.keys(skillLibrary).find((key) => lower.includes(key));
  return firstKey ? skillLibrary[firstKey] : ['Communication', 'Ownership', 'Collaboration', 'Reporting'];
};

const inferExperienceRecommendation = (title = '', selectedMode = '') => {
  const lower = title.toLowerCase();
  if (lower.includes('senior') || lower.includes('lead') || lower.includes('manager')) return '6+ years (Senior)';
  if (selectedMode === 'part-time' || lower.includes('associate') || lower.includes('junior')) {
    return '1-3 years (Junior/Mid)';
  }
  return '3-5 years (Mid-level)';
};

const inferBudgetRange = (selectedMode = '') => {
  if (selectedMode === 'part-time') return '₹25,000 - ₹60,000 / month';
  if (selectedMode === 'full-time') return '₹8L - ₹18L / year';
  if (selectedMode === 'remote') return '₹9L - ₹20L / year';
  if (selectedMode === 'hybrid') return '₹7L - ₹16L / year';
  return '₹5L - ₹12L / year';
};

const inferMarketBenchmark = (title = '', selectedMode = '') => {
  const lower = title.toLowerCase();
  if (lower.includes('engineer') || lower.includes('developer')) {
    return selectedMode === 'part-time' ? 'Market median: ₹45,000/month' : 'Market median: ₹12.5L/year';
  }
  if (lower.includes('designer')) return 'Market median: ₹9.2L/year';
  if (lower.includes('analyst')) return 'Market median: ₹8.4L/year';
  return 'Market median: ₹7.8L/year';
};

const detectClarityGaps = (input = '') => {
  const text = input.toLowerCase();
  const improvements = [];

  if (text.length < 80) improvements.push('Add scope details (team, product, and key responsibilities).');
  if (!/\d+\s*(year|years)/.test(text)) improvements.push('Specify required years of experience for screening clarity.');
  if (!/(remote|hybrid|on[- ]site|online)/.test(text)) improvements.push('Mention work mode explicitly (remote, hybrid, onsite, or online).');
  if (!/(budget|salary|ctc|compensation|₹|rs|usd)/.test(text)) improvements.push('Add budget or compensation band to improve applicant quality.');
  if (!/(responsible|build|design|manage|analy[sz]e|deliver)/.test(text)) {
    improvements.push('Use action-oriented responsibilities (build, manage, design, deliver).');
  }

  const foundVague = vagueTerms.filter((term) => text.includes(term));
  if (foundVague.length) {
    improvements.push(`Replace vague wording (${foundVague.join(', ')}) with measurable expectations.`);
  }

  return improvements;
};

const generateStructuredDescription = ({ title, area, mode, experience }) => {
  const safeTitle = title || 'Role';
  const safeArea = area || 'the target region';
  const safeMode = mode || 'work setup';
  return [
    `We are hiring a ${safeTitle} to support our hiring roadmap across ${safeArea}.`,
    `This is a ${safeMode} role focused on delivering measurable outcomes and stakeholder collaboration.`,
    `The candidate should bring ${experience} and demonstrate ownership across delivery milestones.`,
  ].join(' ');
};

function JobsDashboard() {
  const { mode = 'part-time' } = useParams();
  const [windowKey, setWindowKey] = useState('weekly');
  const [areaFilter, setAreaFilter] = useState('');
  const [generatorInput, setGeneratorInput] = useState({
    roleTitle: '',
    roleContext: '',
    area: '',
  });
  const [generated, setGenerated] = useState(null);

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

  const handleGenerate = (event) => {
    event.preventDefault();

    const title = generatorInput.roleTitle.trim() || `${label} Specialist`;
    const roleSkills = getRoleSkills(title);
    const requiredSkills = roleSkills.slice(0, 4);
    const preferredSkills = roleSkills.slice(2);
    const experienceRecommendation = inferExperienceRecommendation(title, mode);
    const budgetRangeSuggestion = inferBudgetRange(mode);
    const marketSalaryBenchmark = inferMarketBenchmark(title, mode);

    const structuredJobDescription = generateStructuredDescription({
      title,
      area: generatorInput.area.trim(),
      mode: label,
      experience: experienceRecommendation,
    });

    const clarityImprovements = detectClarityGaps(generatorInput.roleContext);

    setGenerated({
      structuredJobDescription,
      requiredSkills,
      preferredSkills,
      budgetRangeSuggestion,
      experienceRecommendation,
      marketSalaryBenchmark,
      vagueDetected: clarityImprovements.length > 0,
      clarityImprovements,
    });
  };

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

        <section className="jobs-generator">
          <h3>AI Job Description Generator (Recruiter)</h3>
          <form className="jobs-generator-form" onSubmit={handleGenerate}>
            <label htmlFor="roleTitle">Role Title</label>
            <input
              id="roleTitle"
              value={generatorInput.roleTitle}
              onChange={(event) =>
                setGeneratorInput((prev) => ({
                  ...prev,
                  roleTitle: event.target.value,
                }))
              }
              placeholder="e.g. Senior Backend Engineer"
            />

            <label htmlFor="roleContext">Role Context / Draft Description</label>
            <textarea
              id="roleContext"
              rows={4}
              value={generatorInput.roleContext}
              onChange={(event) =>
                setGeneratorInput((prev) => ({
                  ...prev,
                  roleContext: event.target.value,
                }))
              }
              placeholder="Add draft responsibilities, expectations, and goals..."
            />

            <label htmlFor="roleArea">Working Area</label>
            <input
              id="roleArea"
              value={generatorInput.area}
              onChange={(event) =>
                setGeneratorInput((prev) => ({
                  ...prev,
                  area: event.target.value,
                }))
              }
              placeholder="e.g. Bangalore"
            />

            <button className="btn btn-primary" type="submit">
              Generate with AI
            </button>
          </form>

          {generated && (
            <article className="jobs-generator-output">
              <h4>Generated Output</h4>
              <p>
                <strong>Structured Job Description:</strong> {generated.structuredJobDescription}
              </p>
              <p>
                <strong>Required Skills:</strong> {generated.requiredSkills.join(', ')}
              </p>
              <p>
                <strong>Preferred Skills:</strong> {generated.preferredSkills.join(', ')}
              </p>
              <p>
                <strong>Budget Range Suggestion:</strong> {generated.budgetRangeSuggestion}
              </p>
              <p>
                <strong>Experience Level Recommendation:</strong> {generated.experienceRecommendation}
              </p>
              <p>
                <strong>Market Salary Benchmark:</strong> {generated.marketSalaryBenchmark}
              </p>
              <p>
                <strong>Vague Description Detected:</strong> {generated.vagueDetected ? 'Yes' : 'No'}
              </p>
              {generated.clarityImprovements.length > 0 && (
                <>
                  <p>
                    <strong>Clarity Improvements:</strong>
                  </p>
                  <ul>
                    {generated.clarityImprovements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          )}
        </section>

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
