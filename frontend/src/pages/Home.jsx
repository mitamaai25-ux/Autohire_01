import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

const onboardingSteps = [
  {
    icon: '◉',
    title: 'Who are you onboarding today?',
    subtitle: 'Choose the primary workspace so we can configure the right hiring and collaboration tools.',
    options: [
      { name: 'Hiring Team', desc: 'Set up recruiters, interview workflows, and approval lanes.' },
      { name: 'Freelancer', desc: 'Build your profile, portfolio, and payout-ready account.' },
      { name: 'Agency Partner', desc: 'Manage multiple clients, talent benches, and delivery pods.' },
      { name: 'Operations Admin', desc: 'Own compliance, onboarding, and workspace governance.' },
    ],
  },
  {
    icon: '◎',
    title: 'What type of work will happen on AutoHire?',
    subtitle: 'We use this to prioritize templates, automation, and job-matching signals.',
    options: [
      { name: 'Full-time Hiring', desc: 'Permanent roles with structured interview plans and scorecards.' },
      { name: 'Freelance Projects', desc: 'Short-term engagements, statements of work, and milestones.' },
      { name: 'Mixed Workforce', desc: 'Blend employees, contractors, and specialist freelancers.' },
      { name: 'Executive Search', desc: 'High-touch searches with private pipelines and approvals.' },
    ],
  },
  {
    icon: '▣',
    title: 'What should the platform launch first?',
    subtitle: 'Your answer shapes the first dashboard and the onboarding checklist we generate.',
    options: [
      { name: 'Talent Pipeline', desc: 'Open roles, sourcing campaigns, and recruiter handoffs.' },
      { name: 'Freelancer Marketplace', desc: 'Profiles, proposals, contracts, and client delivery workflows.' },
      { name: 'Client & Vendor Onboarding', desc: 'KYC, compliance checks, documentation, and approvals.' },
      { name: 'Analytics Command Center', desc: 'Hiring velocity, fill rate, freelancer health, and spend visibility.' },
    ],
  },
];

const launchChecklist = [
  'Publish a branded hiring page with open roles and freelance opportunities.',
  'Invite recruiters, hiring managers, and talent partners into shared workflows.',
  'Automate contracts, compliance collection, and onboarding milestones.',
];

const recentActivity = [
  { title: 'Senior Product Designer', meta: '6 freelancers shortlisted • Updated 18 min ago', status: 'Shortlisting' },
  { title: 'Client onboarding: Northstar Labs', meta: 'Compliance pack 92% complete • Updated today', status: 'In review' },
  { title: 'Mobile team hiring sprint', meta: '3 interviews scheduled • Updated yesterday', status: 'Active' },
];

const workspaceStats = [
  { label: 'Open roles', value: '24' },
  { label: 'Freelancers ready', value: '186' },
  { label: 'Avg. onboarding SLA', value: '36h' },
  { label: 'Placements this month', value: '41' },
];

function Home() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('overview');

  const active = onboardingSteps[step];
  const isLast = step === onboardingSteps.length - 1;

  const canContinue = useMemo(() => Boolean(answers[step]), [answers, step]);

  const handleSelect = (optionName) => {
    setAnswers((prev) => ({ ...prev, [step]: optionName }));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleSkipForNow = () => {
    setCompleted(true);
  };

  const handleContinue = () => {
    if (!canContinue) return;
    if (!isLast) {
      setStep((prev) => prev + 1);
      return;
    }

    setCompleted(true);
  };

  if (completed) {
    return (
      <main className="workspace-page">
        <aside className="workspace-sidebar">
          <strong className="brand">AutoHire</strong>
          <nav>
            <Link className="side-link" to="/ui">
              Home
            </Link>
            <button
              className={`side-item ${activeWorkspaceTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveWorkspaceTab('overview')}
              type="button"
            >
              Overview
            </button>
            <button
              className={`side-item ${activeWorkspaceTab === 'launchpad' ? 'active' : ''}`}
              onClick={() => setActiveWorkspaceTab('launchpad')}
              type="button"
            >
              Launchpad
            </button>
            <button className="side-item" onClick={() => navigate('/jobs')} type="button">
              Marketplace
            </button>
            <button className="side-item" type="button">
              Talent CRM
            </button>
            <button className="side-item" type="button">
              Compliance Hub
            </button>
          </nav>
          <article className="pro-box">
            <h4>Scale plan</h4>
            <p>Unlock branded portals, bulk onboarding, and advanced analytics.</p>
            <button className="nav-btn continue" type="button">
              Upgrade
            </button>
          </article>
        </aside>

        <section className="workspace-main">
          {activeWorkspaceTab === 'launchpad' ? (
            <section className="new-project-shell">
              <header className="new-project-topbar">
                <h2>Hiring & onboarding launchpad</h2>
                <button className="btn btn-secondary" type="button">
                  Export checklist
                </button>
              </header>

              <div className="new-project-layout">
                <aside className="mentor-panel">
                  <div className="mentor-head">
                    <strong>AI onboarding copilot</strong>
                    <span>Live</span>
                  </div>
                  <p>
                    I&apos;ve prepared a launch checklist based on your onboarding answers. Add priorities,
                    owners, or target dates to personalize the rollout.
                  </p>
                  <textarea rows={4} placeholder="Add launch notes, target roles, or onboarding requirements..." />
                </aside>

                <article className="editor-panel platform-preview-panel">
                  <div className="editor-dropzone launchpad-preview">
                    <h3>Workspace launch checklist</h3>
                    <ul className="launch-checklist">
                      {launchChecklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <button className="btn btn-primary" type="button">
                      Generate onboarding plan
                    </button>
                  </div>
                </article>
              </div>
            </section>
          ) : (
            <>
              <h1>Welcome to your hiring workspace</h1>
              <p className="subtitle">
                Manage recruiting, freelance delivery, and onboarding from one branded operating system.
              </p>

              <div className="workspace-stat-grid">
                {workspaceStats.map((stat) => (
                  <article className="stat-card" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </article>
                ))}
              </div>

              <div className="workspace-actions">
                <article className="action-card">
                  <h3>Create a role</h3>
                  <p>Launch a new opening and route it to recruiters instantly.</p>
                </article>
                <article className="action-card upload">
                  <h3>Invite freelancers</h3>
                  <p>Share your talent portal and collect verified profiles in one place.</p>
                </article>
              </div>

              <section>
                <h2 className="workspace-title">Launch recommendations</h2>
                <div className="tips-grid">
                  {launchChecklist.map((tip) => (
                    <article className="tip-card" key={tip}>
                      {tip}
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="workspace-title">Recent workspace activity</h2>
                <div className="recent-grid">
                  {recentActivity.map((project) => (
                    <article className="project-card" key={project.title}>
                      <div className="project-thumb status-thumb">
                        <span>{project.status}</span>
                      </div>
                      <div className="project-info">
                        <h4>{project.title}</h4>
                        <p>{project.meta}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="onboarding-page">
      <section className="onboarding-shell onboarding-shell-wide">
        <header className="onboarding-header">
          <strong className="brand">AutoHire</strong>
          <div className="onboarding-header-actions">
            <Link className="ghost-btn" to="/ui">
              ← Home
            </Link>
            <button className="ghost-btn" onClick={handleSkipForNow} type="button">
              Skip for now
            </button>
          </div>
        </header>

        <div className="progress-rails" aria-hidden="true">
          {onboardingSteps.map((item, index) => (
            <span className={`rail ${index <= step ? 'active' : ''}`} key={item.title} />
          ))}
        </div>

        <div className="onboarding-content-grid">
          <section>
            <p className="step-label">
              Step {step + 1} of {onboardingSteps.length}
            </p>

            <div className="onboarding-icon">{active.icon}</div>
            <h1>{active.title}</h1>
            <p className="subtitle">{active.subtitle}</p>

            <div className="options-grid">
              {active.options.map((option) => (
                <button
                  className={`option-card ${answers[step] === option.name ? 'selected' : ''}`}
                  key={option.name}
                  onClick={() => handleSelect(option.name)}
                  type="button"
                >
                  <strong>{option.name}</strong>
                  <span>{option.desc}</span>
                </button>
              ))}
            </div>
          </section>

          <aside className="onboarding-side-panel">
            <p className="badge">Platform preview</p>
            <h3>What you unlock after onboarding</h3>
            <ul>
              <li>Branded hiring funnels for full-time roles and freelance gigs.</li>
              <li>Automated onboarding flows for clients, candidates, and independent talent.</li>
              <li>Shared dashboards for recruiting, delivery, finance, and compliance teams.</li>
            </ul>
            <div className="preview-answer-stack">
              {onboardingSteps.map((item, index) => (
                <article className="preview-answer-card" key={item.title}>
                  <span>{item.title}</span>
                  <strong>{answers[index] || 'Waiting for your choice'}</strong>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <footer className="onboarding-footer">
          <button className="nav-btn back" onClick={handleBack} type="button" disabled={step === 0}>
            ← Back
          </button>
          <button className="nav-btn continue" onClick={handleContinue} type="button" disabled={!canContinue}>
            {isLast ? 'Finish →' : 'Continue →'}
          </button>
        </footer>
      </section>
    </main>
  );
}

export default Home;
