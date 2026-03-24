import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

const onboardingSteps = [
  {
    icon: '◉',
    title: 'Select onboarding path',
    subtitle: 'Choose who is joining the platform first so we can load the right setup checklist.',
    options: [
      { name: 'Freelancer Registration', desc: 'Portfolio, rate card, payout setup, and profile completion.' },
      { name: 'Client Registration', desc: 'Project goals, budget setup, and team permissions.' },
      { name: 'Recruiter Setup', desc: 'Talent sourcing seats, shortlist views, and AI matching controls.' },
      { name: 'Admin Enablement', desc: 'Moderation, dispute center, analytics, and CMS controls.' },
    ],
  },
  {
    icon: '◎',
    title: 'What should launch in dashboard first?',
    subtitle: 'This configures the first cards users see after login.',
    options: [
      { name: 'Freelancer Dashboard', desc: 'Job recommendations, earnings overview, proposal tracker.' },
      { name: 'Client Dashboard', desc: 'Project overview, talent suggestions, payment summary.' },
      { name: 'Dual View', desc: 'Switch between freelancer and client dashboard roles.' },
      { name: 'Admin View', desc: 'Moderation and analytics first with user operations shortcuts.' },
    ],
  },
  {
    icon: '▣',
    title: 'Which operating modules do you need first?',
    subtitle: 'Pick the area to prioritize in workspace rollout.',
    options: [
      { name: 'Browse Projects / Talent', desc: 'Category, budget, rating filters with Save/Invite/Bid actions.' },
      { name: 'Project Workspace + Payments', desc: 'Task boards, milestones, chat/files, escrow, and invoices.' },
      { name: 'Ratings & Disputes', desc: 'Two-way reviews, dispute center, and performance analytics.' },
      { name: 'Global + Monetization + Learning', desc: 'Language, accessibility, dark mode, plans, boosts, webinars.' },
    ],
  },
];

const workflowModules = [
  {
    title: 'Job Discovery',
    items: [
      'Smart job recommendations (AI-based)',
      'Advanced filters: category, budget, duration, client rating',
      'Save jobs for later',
      'Real-time job alerts',
    ],
  },
  {
    title: 'Proposal & Bidding',
    items: [
      'Custom proposal templates',
      'AI-suggested bid ranges',
      'Cover letter assistance',
      'Proposal tracking: sent, viewed, shortlisted',
    ],
  },
  {
    title: 'Project Workspace',
    items: [
      'Task board with milestones',
      'Real-time chat with file sharing',
      'Time tracker (optional)',
      'Version control for deliverables',
    ],
  },
  {
    title: 'Payments & Earnings',
    items: [
      'Escrow-based payments',
      'Milestone-based release',
      'Invoice generation',
      'Earnings dashboard with filters',
      'Tax and withdrawal settings',
    ],
  },
  {
    title: 'Ratings & Reviews',
    items: [
      'Two-way feedback system',
      'Dispute resolution request',
      'Performance analytics: job success rate and response time',
    ],
  },
  {
    title: 'Admin & Global Controls',
    items: ['User management', 'Project moderation', 'Dispute center', 'Language/currency, accessibility, dark mode'],
  },
  {
    title: 'Monetization & Community',
    items: ['Subscription tiers', 'Featured boosts', 'Premium tools', 'Skill tests, webinars, forums'],
  },
];

const workspaceStats = [
  { label: 'Active freelancers', value: '186' },
  { label: 'Client projects', value: '74' },
  { label: 'Escrow protected', value: '$412k' },
  { label: 'Resolution SLA', value: '18h' },
];

function Home() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('overview');
  const [profileSetup, setProfileSetup] = useState({
    skillCategory: '',
    portfolioFiles: [],
    kycVerified: false,
    emailVerified: false,
    phoneVerified: false,
    language: '',
    availability: '',
  });

  const active = onboardingSteps[step];
  const isLast = step === onboardingSteps.length - 1;
  const canContinue = useMemo(() => Boolean(answers[step]), [answers, step]);

  const profileCompletion = useMemo(() => {
    let score = 0;
    if (profileSetup.skillCategory) score += 20;
    if (profileSetup.portfolioFiles.length > 0) score += 20;
    if (profileSetup.kycVerified) score += 15;
    if (profileSetup.emailVerified) score += 10;
    if (profileSetup.phoneVerified) score += 10;
    if (profileSetup.language) score += 10;
    if (profileSetup.availability) score += 10;
    score += Math.round((Object.keys(answers).length / onboardingSteps.length) * 5);
    return Math.min(score, 100);
  }, [answers, profileSetup]);

  const handleSelect = (optionName) => setAnswers((prev) => ({ ...prev, [step]: optionName }));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleSkipForNow = () => setCompleted(true);

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
            {['overview', 'modules', 'launchpad'].map((tab) => (
              <button
                className={`side-item ${activeWorkspaceTab === tab ? 'active' : ''}`}
                key={tab}
                onClick={() => setActiveWorkspaceTab(tab)}
                type="button"
              >
                {tab === 'overview' ? 'Overview' : tab === 'modules' ? 'Workflow Modules' : 'Launchpad'}
              </button>
            ))}
            <button className="side-item" onClick={() => navigate('/jobs')} type="button">
              Browse Marketplace
            </button>
            <button className="side-item" onClick={() => navigate('/dashboard')} type="button">
              Open Dashboard
            </button>
          </nav>
          <article className="pro-box">
            <h4>Scale plan</h4>
            <p>Unlock premium tools, featured boosts, and advanced analytics.</p>
            <button className="nav-btn continue" type="button">
              Upgrade
            </button>
          </article>
        </aside>

        <section className="workspace-main">
          {activeWorkspaceTab === 'launchpad' ? (
            <section className="new-project-shell">
              <header className="new-project-topbar">
                <h2>Platform launchpad</h2>
                <button className="btn btn-secondary" type="button">
                  Export rollout
                </button>
              </header>

              <div className="new-project-layout">
                <aside className="mentor-panel">
                  <div className="mentor-head">
                    <strong>AI rollout copilot</strong>
                    <span>Live</span>
                  </div>
                  <p>
                    Your onboarding answers have been converted into an execution workflow. Add owners and due dates
                    for each module to finalize launch.
                  </p>
                  <textarea rows={5} placeholder="Assign leads for dashboard, payments, dispute center, and growth modules..." />
                </aside>

                <article className="editor-panel platform-preview-panel">
                  <div className="editor-dropzone launchpad-preview">
                    <h3>Onboarding decisions</h3>
                    <ul className="launch-checklist">
                      {onboardingSteps.map((item, index) => (
                        <li key={item.title}>{answers[index] || `${item.title} (pending)`}</li>
                      ))}
                    </ul>
                    <button className="btn btn-primary" type="button">
                      Generate go-live checklist
                    </button>
                  </div>
                </article>
              </div>
            </section>
          ) : (
            <>
              <h1>Workflow-ready onboarding workspace</h1>
              <p className="subtitle">
                Operate freelancer, client, admin, payment, and community experiences from one platform blueprint.
              </p>

              <div className="workspace-stat-grid">
                {workspaceStats.map((stat) => (
                  <article className="stat-card" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </article>
                ))}
              </div>

              {activeWorkspaceTab === 'modules' ? (
                <section className="workflow-section dashboard-workflow-section">
                  <div className="workflow-grid">
                    {workflowModules.map((group) => (
                      <article className="workflow-card" key={group.title}>
                        <h3>{group.title}</h3>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              ) : (
                <section className="workflow-section dashboard-workflow-section">
                  <div className="workflow-grid">
                    {workflowModules.slice(0, 4).map((group) => (
                      <article className="workflow-card" key={group.title}>
                        <h3>{group.title}</h3>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              )}
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

            <article className="profile-setup-card">
              <h3>Onboarding & Profile Setup</h3>
              <p className="muted">Complete these details to improve trust, matching quality, and project readiness.</p>

              <label htmlFor="skillCategory">Skill-based registration (category)</label>
              <select
                id="skillCategory"
                value={profileSetup.skillCategory}
                onChange={(event) =>
                  setProfileSetup((prev) => ({
                    ...prev,
                    skillCategory: event.target.value,
                  }))
                }
              >
                <option value="">Select category</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
                <option value="operations">Operations</option>
                <option value="finance">Finance</option>
              </select>

              <label htmlFor="portfolioUpload">Portfolio upload (images, videos, documents)</label>
              <input
                id="portfolioUpload"
                type="file"
                multiple
                onChange={(event) =>
                  setProfileSetup((prev) => ({
                    ...prev,
                    portfolioFiles: Array.from(event.target.files || []),
                  }))
                }
              />

              <div className="kyc-grid">
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={profileSetup.kycVerified}
                    onChange={(event) =>
                      setProfileSetup((prev) => ({
                        ...prev,
                        kycVerified: event.target.checked,
                      }))
                    }
                  />
                  Identity verification (KYC)
                </label>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={profileSetup.emailVerified}
                    onChange={(event) =>
                      setProfileSetup((prev) => ({
                        ...prev,
                        emailVerified: event.target.checked,
                      }))
                    }
                  />
                  Email verification
                </label>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={profileSetup.phoneVerified}
                    onChange={(event) =>
                      setProfileSetup((prev) => ({
                        ...prev,
                        phoneVerified: event.target.checked,
                      }))
                    }
                  />
                  Phone verification
                </label>
              </div>

              <div className="kyc-grid">
                <div>
                  <label htmlFor="language">Language proficiency</label>
                  <select
                    id="language"
                    value={profileSetup.language}
                    onChange={(event) =>
                      setProfileSetup((prev) => ({
                        ...prev,
                        language: event.target.value,
                      }))
                    }
                  >
                    <option value="">Select language level</option>
                    <option value="english-c1">English (C1)</option>
                    <option value="english-b2">English (B2)</option>
                    <option value="spanish-b2">Spanish (B2)</option>
                    <option value="hindi-c1">Hindi (C1)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="availability">Availability settings</label>
                  <select
                    id="availability"
                    value={profileSetup.availability}
                    onChange={(event) =>
                      setProfileSetup((prev) => ({
                        ...prev,
                        availability: event.target.value,
                      }))
                    }
                  >
                    <option value="">Select availability</option>
                    <option value="full-time">Full-time availability</option>
                    <option value="part-time">Part-time availability</option>
                    <option value="weekends">Weekends only</option>
                    <option value="on-demand">On-demand / project based</option>
                  </select>
                </div>
              </div>

              <div className="profile-progress-wrap" aria-live="polite">
                <div className="profile-progress-header">
                  <span>Profile completion progress</span>
                  <strong>{profileCompletion}%</strong>
                </div>
                <div className="profile-progress-track">
                  <span className="profile-progress-fill" style={{ width: `${profileCompletion}%` }} />
                </div>
              </div>
            </article>
          </section>

          <aside className="onboarding-side-panel">
            <p className="badge">Workflow preview</p>
            <h3>Modules unlocked after onboarding</h3>
            <ul>
              <li>Freelancer and client registration with role-aware dashboards.</li>
              <li>Browse projects/talent with AI match scores and invite/bid actions.</li>
              <li>Project workspace, payments, disputes, admin panel, and global settings.</li>
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
