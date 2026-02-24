import { Link } from 'react-router-dom';

const howItWorks = [
  {
    title: 'Post a Job',
    description:
      'Define role goals, hiring criteria, and timelines in a guided workflow tailored for fast-moving teams.',
  },
  {
    title: 'AI Matches Candidates',
    description:
      'AutoHire evaluates resumes, skills, and portfolio signals to rank high-fit candidates with clear reasoning.',
  },
  {
    title: 'Hire with Confidence',
    description:
      'Compare profiles, validate skill gaps, and make data-backed hiring decisions with transparent AI scoring.',
  },
];

const skillNodes = ['React', 'Node.js', 'Python', 'NLP', 'UI/UX', 'MLOps', 'Data Viz', 'TypeScript'];

const pricingPlans = [
  {
    name: 'Free Starter',
    price: '$0',
    details: ['1 active job post', 'Basic AI candidate scoring', 'Email support'],
    featured: false,
  },
  {
    name: 'Pro Employer',
    price: '$89/mo',
    details: ['Unlimited job posts', 'Advanced AI ranking + ATS score', 'Interview funnel analytics'],
    featured: true,
  },
  {
    name: 'Enterprise AI Suite',
    price: 'Custom',
    details: ['Private AI model tuning', 'Custom integrations + SSO', 'Dedicated success architect'],
    featured: false,
  },
];

function Home() {
  return (
    <main className="landing">
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="globe" />
          <div className="neural-grid" />
        </div>
        <div className="hero-content">
          <p className="eyebrow">AutoHire Intelligence Platform</p>
          <h1>AI-Driven Hiring Intelligence</h1>
          <p className="subtitle">Match, score, and hire with explainable AI precision.</p>
          <div className="actions">
            <Link className="btn btn-primary" to="/register">
              Enter as Employer
            </Link>
            <Link className="btn btn-secondary" to="/login">
              Enter as Freelancer
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <h2>How It Works</h2>
        <div className="how-grid">
          {howItWorks.map((item) => (
            <article className="interactive-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section network" id="network">
        <h2>Talent Network Visualization</h2>
        <p className="section-note">Live signal map across skills, roles, and match confidence.</p>
        <div className="network-panel">
          <div className="skill-cloud">
            {skillNodes.map((node, index) => (
              <span className="skill-node" style={{ '--i': index }} key={node}>
                {node}
              </span>
            ))}
          </div>
          <div className="match-strength">
            <p>AI Match Strength</p>
            <strong>94%</strong>
          </div>
        </div>
      </section>

      <section className="section" id="dashboard-preview">
        <h2>AI Dashboard Preview</h2>
        <div className="glass-grid">
          <article className="glass-card">
            <h3>ATS Resume Score</h3>
            <p className="metric">88 / 100</p>
          </article>
          <article className="glass-card">
            <h3>Skill Gap Radar Chart</h3>
            <div className="radar-placeholder">Radar</div>
          </article>
          <article className="glass-card">
            <h3>Candidate Ranking</h3>
            <ol>
              <li>Sarah Chen</li>
              <li>Michael Reyes</li>
              <li>Priya Nair</li>
            </ol>
          </article>
          <article className="glass-card">
            <h3>Hiring Funnel Visualization</h3>
            <div className="funnel-bars">
              <span style={{ width: '95%' }}>Applied</span>
              <span style={{ width: '70%' }}>Screened</span>
              <span style={{ width: '42%' }}>Interviewed</span>
              <span style={{ width: '20%' }}>Offer</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="freelancer-preview">
        <h2>Freelancer Profile Preview</h2>
        <div className="freelancer-layout">
          <article className="panel">
            <h3>Circular Skill Radar</h3>
            <div className="circular-radar" />
            <p className="score">AutoHire AI Score: 91</p>
          </article>
          <article className="panel">
            <h3>Career Timeline</h3>
            <ul className="timeline">
              <li>2026 — Senior AI Product Designer</li>
              <li>2024 — Full-Stack Engineer, FinTech</li>
              <li>2022 — ML Research Associate</li>
            </ul>
          </article>
          <article className="panel">
            <h3>Portfolio Projects</h3>
            <div className="portfolio-grid">
              <div>Interview Copilot</div>
              <div>Skills Graph Engine</div>
              <div>Talent Heatmap UI</div>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="pricing">
        <h2>Pricing</h2>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className={`price-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <a href="#hero">About</a>
        <a href="#how-it-works">Features</a>
        <a href="#network">AI Technology</a>
        <a href="#pricing">Contact</a>
        <div className="social-links">
          <span>LinkedIn</span>
          <span>X</span>
          <span>GitHub</span>
        </div>
      </footer>
    </main>
  );
}

export default Home;
