import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDashboardData } from '../api';

const freelancerCards = [
  { title: 'Job Recommendations', value: '18 matches', detail: 'AI-ranked opportunities based on skills, rate, and availability.' },
  { title: 'Earnings Overview', value: '$12.4k', detail: 'Track paid, pending, and upcoming milestone releases.' },
  { title: 'Proposal Tracker', value: '7 active', detail: 'Monitor sent bids, shortlist status, and response rate.' },
  { title: 'Profile Completion', value: '88%', detail: 'Improve profile quality to unlock more client invites.' },
];

const clientCards = [
  { title: 'Project Overview', value: '9 active', detail: 'See live projects, milestones, and delivery risk.' },
  { title: 'Talent Suggestions', value: '26 matches', detail: 'Review AI-ranked freelancers for your open work.' },
  { title: 'Payment Summary', value: '$34k escrowed', detail: 'Track escrow balance, invoices, and milestone releases.' },
];


const freelancingModuleSections = [
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
      'Performance analytics: success rate and response time',
    ],
  },
];


const clientModuleSections = [
  {
    title: 'Project Posting',
    items: [
      'AI-assisted job description builder',
      'Budget & timeline estimator',
      'Skill tags & category selection',
      'NDA or contract upload (optional)',
    ],
  },
  {
    title: 'Talent Discovery',
    items: [
      'Smart freelancer recommendations',
      'Search filters: skills, rating, price, location',
      'View portfolios and reviews',
      'Invite freelancers to bid',
    ],
  },
  {
    title: 'Hiring & Collaboration',
    items: [
      'Compare proposals side-by-side',
      'Set milestones and deadlines',
      'Real-time chat and file sharing',
      'Project dashboard with progress tracking',
    ],
  },
  {
    title: 'Payments & Invoicing',
    items: [
      'Escrow funding and milestone release',
      'Auto-invoice generation',
      'Payment history and receipts',
      'Refund and dispute options',
    ],
  },
  {
    title: 'Team & Enterprise Tools (Optional)',
    items: [
      'Multi-user team accounts',
      'Role-based access: admin, manager, viewer',
      'Bulk hiring and project cloning',
      'Analytics dashboard for team performance',
    ],
  },
];

const workspaceGroups = [
  {
    title: 'Browse Projects / Talent',
    items: ['Filters: category, budget, rating', 'Save / Invite / Bid actions', 'AI Match Score'],
  },
  {
    title: 'Project Workspace',
    items: ['Task Board', 'Milestone Tracker', 'Chat + File Sharing', 'Time Tracker'],
  },
  {
    title: 'Payments',
    items: ['Escrow Setup', 'Milestone Release', 'Invoice Generator', 'Withdrawal Settings'],
  },
  {
    title: 'Ratings & Reviews',
    items: ['Two-Way Feedback', 'Dispute Resolution', 'Performance Analytics'],
  },
  {
    title: 'Admin Panel',
    items: ['User Management', 'Project Moderation', 'Dispute Center', 'Analytics Dashboard', 'CMS'],
  },
  {
    title: 'Global Settings + Monetization',
    items: ['Language & Currency', 'Accessibility', 'Dark Mode', 'Subscription Tiers', 'Featured Boosts', 'Premium Tools', 'Skill Tests', 'Webinars', 'Forums'],
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] = useState(localStorage.getItem('autohire_account_type') || 'freelancer');
  const [profileSetup, setProfileSetup] = useState({
    skillCategory: '',
    portfolioFiles: [],
    kycVerified: false,
    emailVerified: false,
    phoneVerified: false,
    language: '',
    availability: '',
  });

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem('autohire_token');
      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);

      try {
        const payload = await getDashboardData(token);
        setData(payload);
      } catch (loadError) {
        setData(null);
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const cards = useMemo(() => (accountType === 'client' ? clientCards : freelancerCards), [accountType]);

  const profileCompletion = useMemo(() => {
    let score = 0;
    if (profileSetup.skillCategory) score += 20;
    if (profileSetup.portfolioFiles.length > 0) score += 20;
    if (profileSetup.kycVerified) score += 15;
    if (profileSetup.emailVerified) score += 10;
    if (profileSetup.phoneVerified) score += 10;
    if (profileSetup.language) score += 10;
    if (profileSetup.availability) score += 15;
    return Math.min(score, 100);
  }, [profileSetup]);

  const logout = () => {
    localStorage.removeItem('autohire_token');
    localStorage.removeItem('autohire_user');
    navigate('/login');
  };

  return (
    <main className="page dashboard-page">
      <section className="card dashboard-card dashboard-card-wide">
        <div className="dashboard-header recruiter-header">
          <div>
            <p className="badge">Dashboard</p>
            <h2>{accountType === 'client' ? 'Client Dashboard' : 'Freelancer Dashboard'}</h2>
          </div>
          <div className="recruiter-actions">
            <Link className="btn btn-secondary" to="/ui">
              Home
            </Link>
            <button className="btn btn-secondary" onClick={logout} type="button">
              Logout
            </button>
          </div>
        </div>

        <div className="account-type-tabs" role="tablist" aria-label="Dashboard role">
          {['freelancer', 'client'].map((type) => (
            <button
              className={`jobs-type-btn ${accountType === type ? 'active' : ''}`}
              key={type}
              onClick={() => {
                setAccountType(type);
                localStorage.setItem('autohire_account_type', type);
              }}
              type="button"
            >
              {type === 'client' ? 'Client Dashboard' : 'Freelancer Dashboard'}
            </button>
          ))}
        </div>

        {error ? (
          <div>
            <p className="error">{error}</p>
            <p className="muted">Please try again after the API is available, or sign in again if your session has expired.</p>
          </div>
        ) : loading ? (
          <p>Loading dashboard...</p>
        ) : !data ? (
          <p>No dashboard data is available right now.</p>
        ) : (
          <>
            <p className="success">{data.message}</p>
            <div className="stats-grid dashboard-stats-grid">
              {cards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.value}</p>
                  <span className="muted">{card.detail}</span>
                </article>
              ))}
            </div>

            {accountType === 'freelancer' && (
              <article className="profile-setup-card dashboard-profile-setup">
                <h3>Onboarding & Profile Setup</h3>
                <p className="muted">Complete these details to improve trust, matching quality, and project readiness.</p>

                <label htmlFor="dashSkillCategory">Skill-based registration (category)</label>
                <select
                  id="dashSkillCategory"
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

                <label htmlFor="dashPortfolioUpload">Portfolio upload (images, videos, documents)</label>
                <input
                  id="dashPortfolioUpload"
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
                    <label htmlFor="dashLanguage">Language proficiency</label>
                    <select
                      id="dashLanguage"
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
                    <label htmlFor="dashAvailability">Availability settings</label>
                    <select
                      id="dashAvailability"
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
            )}

            <section className="workflow-section dashboard-workflow-section">
              <div className="xai-header workflow-inline-header">
                <p className="badge">Workspace map</p>
                <h3>Next workflow areas available from the dashboard</h3>
              </div>
              <div className="workflow-grid">
                {workspaceGroups.map((group) => (
                  <article className="workflow-card" key={group.title}>
                    <h4>{group.title}</h4>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {accountType === 'freelancer' && (
              <section className="workflow-section dashboard-workflow-section">
                <div className="xai-header workflow-inline-header">
                  <p className="badge">Freelancing module</p>
                  <h3>End-to-end freelancer workflow</h3>
                </div>
                <div className="workflow-grid">
                  {freelancingModuleSections.map((group) => (
                    <article className="workflow-card" key={group.title}>
                      <h4>{group.title}</h4>
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

            {accountType === 'client' && (
              <section className="workflow-section dashboard-workflow-section">
                <div className="xai-header workflow-inline-header">
                  <p className="badge">Client module</p>
                  <h3>End-to-end client workflow</h3>
                </div>
                <div className="workflow-grid">
                  {clientModuleSections.map((group) => (
                    <article className="workflow-card" key={group.title}>
                      <h4>{group.title}</h4>
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

export default Dashboard;
