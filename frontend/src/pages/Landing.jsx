import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const features = [
  {
    title: 'Recruiting + Freelance Marketplace',
    text: 'Run client hiring, freelance project delivery, and onboarding from one shared platform.',
  },
  {
    title: 'Guided Onboarding Journeys',
    text: 'Launch role-aware onboarding for freelancers, clients, recruiters, and internal teams.',
  },
  {
    title: 'Operational Visibility',
    text: 'Track payments, milestones, profile readiness, and performance analytics in real time.',
  },
];

const personas = [
  {
    id: 'client',
    label: 'Client',
    previewTitle: 'Client delivery workspace',
    previewItems: ['Project overview', 'Talent suggestions', 'Payment summary'],
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    previewTitle: 'Freelancer growth dashboard',
    previewItems: ['Job recommendations', 'Earnings overview', 'Proposal tracker'],
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    previewTitle: 'Recruiter pipeline studio',
    previewItems: ['Talent pools by role', 'AI match rankings', 'Client-ready shortlists'],
  },
  {
    id: 'admin',
    label: 'Admin',
    previewTitle: 'Admin operations panel',
    previewItems: ['User management', 'Dispute center', 'CMS and announcements'],
  },
];

const explainablePillars = [
  {
    title: 'Structured onboarding',
    text: 'Every user journey is broken into clear milestones for registration, verification, setup, and launch.',
  },
  {
    title: 'Shared collaboration',
    text: 'Clients, freelancers, recruiters, and admins work inside the same workflow instead of switching tools.',
  },
  {
    title: 'Decision-ready insights',
    text: 'Surface the status, risk, payout, and next action for each profile, project, and milestone.',
  },
];

const candidates = [
  { id: 'c1', name: 'Ava Patel', role: 'Product Designer' },
  { id: 'c2', name: 'Liam Chen', role: 'Data Engineer' },
  { id: 'c3', name: 'Noah Garcia', role: 'Growth Marketer' },
  { id: 'c4', name: 'Sara Kim', role: 'Recruiting Coordinator' },
  { id: 'c5', name: 'Mia Johnson', role: 'Frontend Developer' },
];

const decisionMetrics = [
  {
    title: 'Projects launched faster',
    value: '2.3x',
    detail: 'Unified sourcing, onboarding, and milestone tools reduce startup delays for clients and freelancers.',
  },
  {
    title: 'Profile completion',
    value: '94%',
    detail: 'Guided registration, reminders, and onboarding checklists keep freelancers and clients moving.',
  },
  {
    title: 'Escrow confidence',
    value: '91%',
    detail: 'Payment setup, milestone release, and invoice tooling keep projects financially organized.',
  },
];

const jobRequirements = ['Verified profile', 'Portfolio strength', 'Budget fit', 'Availability', 'Payment readiness'];


function Landing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [activePersona, setActivePersona] = useState(personas[0].id);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => prev + 1);
      setActiveIndex((prev) => (prev + 1) % candidates.length);
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  const score = useMemo(() => 76 + ((phase * 5) % 20), [phase]);
  const signal = useMemo(
    () => ['Syncing applicant data', 'Reviewing freelancer readiness', 'Routing onboarding actions'][phase % 3],
    [phase]
  );

  const personaView = useMemo(
    () => personas.find((persona) => persona.id === activePersona) || personas[0],
    [activePersona]
  );

  return (
    <main className="landing-page">
      <header className="top-menu fade-in-down">
        <strong className="brand">AutoHire</strong>
        <nav>
          <Link to="/ui">UI Home</Link>
          <Link to="/ui/onboarding">Onboarding</Link>
          <Link to="/jobs">Marketplace</Link>
          <Link to="/recruiter-dashboard">Recruiter Dashboard</Link>
          <Link to="/admin">Admin Panel</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <section className="hero-3d">
        <div className="orbs" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>
        <div className="hero-card float-glow">
          <p className="badge">AutoHire • Hiring, Freelancing, Payments, and Onboarding OS</p>
          <h1>One workflow for freelancer onboarding, client delivery, payments, and marketplace growth.</h1>
          <p>
            AutoHire gives teams and independent talent a single product to register, get matched,
            collaborate in project workspaces, release milestones, and manage long-term performance.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/register?type=freelancer">
              Freelancer registration
            </Link>
            <Link className="btn btn-secondary" to="/register?type=client">
              Client registration
            </Link>
            <Link className="btn btn-secondary" to="/login">
              Login
            </Link>
            <Link className="btn btn-secondary" to="/jobs">
              Browse marketplace
            </Link>
          </div>
        </div>
      </section>


      <section className="persona-section reveal-up delay-1">
        <div className="xai-header">
          <p className="badge">One platform, multiple journeys</p>
          <h2>Designed for clients, freelancers, recruiters, and admins</h2>
          <p>Select a persona to preview the experience AutoHire can deliver for each stakeholder.</p>
        </div>

        <div className="persona-tabs">
          {personas.map((persona) => (
            <button
              className={`persona-tab ${activePersona === persona.id ? 'active' : ''}`}
              key={persona.id}
              onClick={() => setActivePersona(persona.id)}
              type="button"
            >
              {persona.label}
            </button>
          ))}
        </div>

        <article className="persona-preview-card">
          <h3>{personaView.previewTitle}</h3>
          <p className="persona-preview-sub">Tailored experience for {personaView.label}</p>
          <ul>
            {personaView.previewItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="feature-grid reveal-up delay-2">
        {features.map((item) => (
          <article className="feature-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="match-sim-section reveal-up delay-3">
        <div className="xai-header">
          <p className="badge">Live marketplace activity</p>
          <h2>See how projects, talent, and onboarding actions move through one system</h2>
          <p>
            AutoHire connects discovery, matching, onboarding, collaboration, payouts, and review cycles so teams always know the next best action.
          </p>
        </div>

        <div className="sim-grid">
          <article className="sim-card network-map">
            <h3>Talent + project flow</h3>
            <div className="graph-area">
              <div className="job-node">Project</div>
              {candidates.map((candidate, index) => (
                <div
                  className={`candidate-node ${index === activeIndex ? 'active' : ''}`}
                  key={candidate.id}
                  style={{ '--idx': index }}
                >
                  {candidate.name.split(' ')[0]}
                </div>
              ))}
              {candidates.map((candidate, index) => (
                <span
                  className={`connection ${index === activeIndex ? 'active' : ''}`}
                  key={`${candidate.id}-line`}
                  style={{ '--idx': index }}
                />
              ))}
            </div>
          </article>

          <article className="sim-card simulation-readout">
            <h3>Operations feed</h3>
            <p className="pulse">{signal}</p>
            <p>
              Current best fit: <strong>{candidates[activeIndex].name}</strong> — {candidates[activeIndex].role}
            </p>
            <div className="score-wrap">
              <span>AI match score</span>
              <strong>{score}%</strong>
            </div>
            <ul>
              {jobRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="decision-section reveal-up delay-4">
        <div className="xai-header">
          <p className="badge">Why teams choose AutoHire</p>
          <h2>A website experience that supports the full freelancer and client lifecycle</h2>
          <p>
            From registration and discovery to escrow and reviews, AutoHire turns fragmented workflows into one reliable operating system.
          </p>
        </div>
        <div className="decision-grid">
          {decisionMetrics.map((metric) => (
            <article className="decision-card" key={metric.title}>
              <h3>{metric.title}</h3>
              <p className="decision-value">{metric.value}</p>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="xai-section reveal-up delay-5">
        <div className="xai-header">
          <p className="badge">Built for execution</p>
          <h2>Everything needed to launch hiring, freelancing, payments, and onboarding in one place</h2>
          <p>
            The experience is designed to look like a modern hiring website while still giving teams the operational depth required to onboard talent and clients at scale.
          </p>
        </div>
        <div className="xai-grid">
          {explainablePillars.map((pillar) => (
            <article className="xai-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer reveal-up delay-5">
        <div>
          <strong>AutoHire</strong>
          <p>Modern hiring, freelance collaboration, and onboarding in one operating system.</p>
        </div>
        <div className="site-footer-links">
          <Link to="/ui">Home</Link>
          <Link to="/ui/onboarding">Onboarding</Link>
          <Link to="/jobs">Marketplace</Link>
          <Link to="/admin">Admin Panel</Link>
          <Link to="/login">Login</Link>
        </div>
      </footer>
    </main>
  );
}

export default Landing;
