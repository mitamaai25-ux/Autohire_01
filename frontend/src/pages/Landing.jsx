import { Link } from 'react-router-dom';

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

function Landing() {
  return (
    <main className="landing-page">
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
          </div>
        </div>
      </section>

      <section className="feature-grid">
        {features.map((item) => (
          <article className="feature-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
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
