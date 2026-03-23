import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const features = [
  {
    title: 'Recruiting + Freelance Marketplace',
    text: 'Run full-time hiring and project-based freelancing from one shared branded platform.',
  },
  {
    title: 'Guided Onboarding Journeys',
    text: 'Launch personalized onboarding for clients, candidates, recruiters, and independent talent.',
  },
  {
    title: 'Operational Visibility',
    text: 'Track pipeline health, freelancer readiness, onboarding SLAs, and placements in real time.',
  },
];

const personas = [
  {
    id: 'employer',
    label: 'Employer',
    previewTitle: 'Employer hiring workspace',
    previewItems: ['Open roles and approval flows', 'Interview plans and scorecards', 'Offer and onboarding progress'],
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    previewTitle: 'Freelancer onboarding portal',
    previewItems: ['Profile verification', 'Proposal tracking', 'Contracts, milestones, and payouts'],
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    previewTitle: 'Recruiter pipeline studio',
    previewItems: ['Talent pools by role', 'Funnel velocity and handoffs', 'Client-ready shortlists'],
  },
  {
    id: 'enterprise_hr',
    label: 'Operations',
    previewTitle: 'Operations onboarding command center',
    previewItems: ['Compliance checklists', 'Stakeholder approvals', 'Vendor and client activation status'],
  },
];

const explainablePillars = [
  {
    title: 'Structured onboarding',
    text: 'Every user journey is broken into clear milestones for sign-up, verification, contracts, and launch readiness.',
  },
  {
    title: 'Shared collaboration',
    text: 'Hiring teams, recruiters, freelancers, and operations partners work inside the same workflow instead of juggling tools.',
  },
  {
    title: 'Decision-ready insights',
    text: 'Surface the status, risk, and next action for each role, project, and onboarding track from one place.',
  },
];

const candidates = [
  { id: 'c1', name: 'Ava Patel', role: 'Senior Product Designer' },
  { id: 'c2', name: 'Liam Chen', role: 'Fractional Data Engineer' },
  { id: 'c3', name: 'Noah Garcia', role: 'Growth Marketer' },
  { id: 'c4', name: 'Sara Kim', role: 'Recruiting Coordinator' },
  { id: 'c5', name: 'Mia Johnson', role: 'Frontend Developer' },
];

const decisionMetrics = [
  {
    title: 'Roles filled faster',
    value: '2.3x',
    detail: 'Centralized sourcing, freelancer outreach, and onboarding tasks reduce handoff delays.',
  },
  {
    title: 'Onboarding completion',
    value: '94%',
    detail: 'Automated reminders and approval routing keep clients, candidates, and contractors moving.',
  },
  {
    title: 'Talent readiness score',
    value: '91%',
    detail: 'Quickly see who is verified, available, and ready to start on the right opportunity.',
  },
];

const jobRequirements = ['Verified profile', 'Portfolio strength', 'Role fit', 'Availability', 'Compliance ready'];

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
          <p className="badge">AutoHire • Hiring, Freelancing, and Onboarding OS</p>
          <h1>Build a modern website for hiring, freelancing, and seamless onboarding.</h1>
          <p>
            AutoHire gives teams one polished destination to attract talent, manage freelance work,
            and onboard everyone from candidates to clients with confidence.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/ui/onboarding">
              Start onboarding
            </Link>
            <Link className="btn btn-secondary" to="/register">
              Create account
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
          <h2>Designed for employers, recruiters, freelancers, and onboarding teams</h2>
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
          <h2>See how roles, freelancers, and onboarding tasks move through one system</h2>
          <p>
            AutoHire connects sourcing, matching, approvals, and launch readiness so teams always know
            the next best action.
          </p>
        </div>

        <div className="sim-grid">
          <article className="sim-card network-map">
            <h3>Talent + project flow</h3>
            <div className="graph-area">
              <div className="job-node">Opportunity</div>
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
              <span>Readiness score</span>
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
          <h2>A website experience that supports the entire talent lifecycle</h2>
          <p>
            From talent attraction to onboarding completion, AutoHire turns fragmented hiring workflows
            into one reliable operating system.
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
          <h2>Everything needed to launch hiring and freelancing onboarding in one place</h2>
          <p>
            The experience is designed to look like a modern hiring website while still giving teams the
            operational depth required to onboard talent and clients at scale.
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
          <Link to="/login">Login</Link>
        </div>
      </footer>

    </main>
  );
}

export default Landing;
