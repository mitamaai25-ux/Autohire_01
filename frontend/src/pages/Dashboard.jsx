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
