import { Link } from 'react-router-dom';

const adminFeatures = [
  {
    title: 'User management',
    items: [
      'Manage freelancer and client accounts',
      'Suspend/reactivate user profiles',
      'Role assignment and access reviews',
    ],
  },
  {
    title: 'Project moderation and approval',
    items: [
      'Review new project postings before publication',
      'Flag risk projects and request revisions',
      'Approve or reject policy-sensitive briefs',
    ],
  },
  {
    title: 'Dispute resolution center',
    items: [
      'Track open disputes by SLA and priority',
      'Review evidence and milestone history',
      'Issue outcomes with audit trail',
    ],
  },
  {
    title: 'Analytics dashboard',
    items: [
      'Revenue trends and payout velocity',
      'User growth across freelancer/client cohorts',
      'Retention snapshots and churn alerts',
    ],
  },
  {
    title: 'CMS for blogs, FAQs, and announcements',
    items: [
      'Create and schedule blog posts',
      'Maintain FAQs and policy updates',
      'Publish product announcements',
    ],
  },
  {
    title: 'Notification management',
    items: [
      'Configure email, push, and in-app notifications',
      'Audience segmentation for campaigns',
      'Delivery analytics and fallback routing',
    ],
  },
];

function AdminPanel() {
  return (
    <main className="page dashboard-page">
      <section className="card dashboard-card dashboard-card-wide admin-panel-card">
        <div className="dashboard-header recruiter-header">
          <div>
            <p className="badge">Admin Panel</p>
            <h2>Platform operations and governance center</h2>
            <p className="muted">Control moderation, analytics, CMS content, and cross-channel notifications from one place.</p>
          </div>
          <Link className="btn btn-secondary" to="/ui">
            Home
          </Link>
        </div>

        <div className="workflow-grid">
          {adminFeatures.map((feature) => (
            <article className="workflow-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <ul>
                {feature.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AdminPanel;
