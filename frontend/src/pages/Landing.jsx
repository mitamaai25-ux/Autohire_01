import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const features = [
  {
    title: 'AI Talent Matching',
    text: 'AutoHire scores employer roles against freelancer skills with explainable AI confidence.',
  },
  {
    title: 'Dual Marketplace',
    text: 'A unified platform where hiring teams and independent experts collaborate in real time.',
  },
  {
    title: '3D Insight Graphs',
    text: 'Visualize candidate fit, skill adjacency, and delivery probability with immersive analytics.',
  },
];

const personas = [
  {
    id: 'employer',
    label: 'Employer',
    previewTitle: 'Employer Command Center',
    previewItems: ['Candidate fit shortlists', 'Interview readiness score', 'Offer acceptance likelihood'],
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    previewTitle: 'Freelancer Growth Dashboard',
    previewItems: ['Profile optimization tips', 'Bid win probability', 'Skill demand heatmap'],
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    previewTitle: 'Recruiter Pipeline Studio',
    previewItems: ['Multi-role talent pools', 'Pipeline stage velocity', 'Placement confidence analytics'],
  },
  {
    id: 'enterprise_hr',
    label: 'Enterprise HR',
    previewTitle: 'Enterprise Workforce Intelligence',
    previewItems: ['Org-wide hiring risk matrix', 'Retention and mobility forecasts', 'Compensation band confidence'],
  },
];

const explainablePillars = [
  {
    title: 'Fairness by Design',
    text: 'Bias checks continuously evaluate scoring outputs across role, skill, and experience groups.',
  },
  {
    title: 'Transparent Reasoning',
    text: 'Each match score includes plain-language factors so employers and freelancers understand rankings.',
  },
  {
    title: 'Privacy-First Intelligence',
    text: 'Sensitive profile data is minimized, protected, and processed with strict consent-aware controls.',
  },
];

const candidates = [
  { id: 'c1', name: 'Ava Patel', role: 'Full-Stack Engineer' },
  { id: 'c2', name: 'Liam Chen', role: 'ML Engineer' },
  { id: 'c3', name: 'Noah Garcia', role: 'Product Designer' },
  { id: 'c4', name: 'Sara Kim', role: 'Data Analyst' },
  { id: 'c5', name: 'Mia Johnson', role: 'Frontend Engineer' },
];

const decisionMetrics = [
  {
    title: 'Hiring Risk Index',
    value: 'Low · 18%',
    detail: 'Risk engine flags delivery mismatch probability based on prior project volatility.',
  },
  {
    title: 'Retention Probability',
    value: '87%',
    detail: 'Estimated long-term engagement confidence using behavior and project-fit signals.',
  },
  {
    title: 'Salary Confidence',
    value: '91%',
    detail: 'Compensation recommendation confidence from market bands, role level, and skill depth.',
  },
];

const jobRequirements = ['React', 'Node.js', 'Data modeling', 'API design', 'System thinking'];

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

  const score = useMemo(() => 72 + ((phase * 7) % 26), [phase]);
  const signal = useMemo(
    () =>
      ['Analyzing profile vectors', 'Scoring skill adjacency', 'Predicting delivery confidence'][
        phase % 3
      ],
    [phase]
  );

  const personaView = useMemo(
    () => personas.find((persona) => persona.id === activePersona) || personas[0],
    [activePersona]
  );

  return (
    <main className="landing-page">
      <header className="top-menu">
        <strong className="brand">AutoHire</strong>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/onboarding">Onboarding</Link>
          <Link to="/resume-scoring">Resume Scoring</Link>
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
        <div className="hero-card">
          <p className="badge">AutoHire • AI Hiring + Freelancing Intelligence</p>
          <h1>Futuristic AI-Powered Hiring & Freelancing Platform</h1>
          <p>
            Discover talent like LinkedIn, hire like Upwork, and optimize outcomes with neon-lit AI
            matching intelligence.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/onboarding">
              Start Onboarding
            </Link>
            <Link className="btn btn-secondary" to="/register">
              Create Account
            </Link>
            <Link className="btn btn-secondary" to="/login">
              Sign In
            </Link>
            <Link className="btn btn-secondary" to="/resume-scoring">
              Resume Scoring
            </Link>
            <Link className="btn btn-secondary" to="/recruiter-dashboard">
              Recruiter Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="persona-section">
        <div className="xai-header">
          <p className="badge">Persona Selection Flow</p>
          <h2>Enter as Employer, Freelancer, Recruiter, or Enterprise HR</h2>
          <p>Choose your role to preview the AI-tailored dashboard experience before onboarding.</p>
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
          <p className="persona-preview-sub">Tailored dashboard preview for {personaView.label}</p>
          <ul>
            {personaView.previewItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="feature-grid">
        {features.map((item) => (
          <article className="feature-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="match-sim-section">
        <div className="xai-header">
          <p className="badge">Real-Time AI Matching Simulation</p>
          <h2>Dynamic Candidate Graph While AI Evaluates Job Requirements</h2>
          <p>
            AutoHire continuously recalculates connections between role requirements and candidate strength
            signals as new evidence arrives.
          </p>
        </div>

        <div className="sim-grid">
          <article className="sim-card network-map">
            <h3>Live Candidate Connection Map</h3>
            <div className="graph-area">
              <div className="job-node">Role</div>
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
            <h3>AI Evaluation Feed</h3>
            <p className="pulse">{signal}</p>
            <p>
              Current best fit: <strong>{candidates[activeIndex].name}</strong> — {candidates[activeIndex].role}
            </p>
            <div className="score-wrap">
              <span>Match Confidence</span>
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

      <section className="decision-section">
        <div className="xai-header">
          <p className="badge">AI Decision Assistant</p>
          <h2>Actionable Hiring Intelligence in Clean Analytics Cards</h2>
          <p>
            AutoHire converts match analysis into decision-ready metrics so teams can evaluate risk,
            retention outlook, and compensation confidence at a glance.
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

      <section className="xai-section">
        <div className="xai-header">
          <p className="badge">Explainable AI</p>
          <h2>How AutoHire Evaluates Candidates</h2>
          <p>
            Our AI engine combines profile relevance, verified skills, delivery history, and role context
            while preserving fairness, transparency, and privacy-first governance.
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
    </main>
  );
}

export default Landing;
