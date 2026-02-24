import { useMemo, useState } from 'react';

const onboardingSteps = [
  {
    icon: '◎',
    title: "What's your editing experience?",
    subtitle: 'This helps me tailor my guidance to your level',
    options: [
      { name: 'Beginner', desc: 'Just getting started with video editing' },
      { name: 'Intermediate', desc: 'Comfortable with basic editing tasks' },
      { name: 'Advanced', desc: 'Experienced editor looking for efficiency' },
      { name: 'Professional', desc: 'Working professional seeking AI enhancement' },
    ],
  },
  {
    icon: '◌',
    title: 'Which software do you use?',
    subtitle: "I'll optimize my suggestions for your workflow",
    options: [
      { name: 'Adobe Premiere Pro', desc: 'Industry standard for professionals' },
      { name: 'Final Cut Pro', desc: 'Optimized for Mac users' },
      { name: 'DaVinci Resolve', desc: 'Advanced color grading' },
      { name: 'Other / Multiple', desc: 'I use various tools' },
    ],
  },
  {
    icon: '▣',
    title: 'What type of content do you create?',
    subtitle: "I'll prioritize relevant editing techniques",
    options: [
      { name: 'YouTube Videos', desc: 'Long-form content & vlogs' },
      { name: 'Shorts & Reels', desc: 'TikTok, Reels, YouTube Shorts' },
      { name: 'Film & Cinematic', desc: 'Movies, documentaries, ads' },
      { name: 'Mixed Content', desc: 'Various types of videos' },
    ],
  },
];

const aiSuggestions = [
  'Try vertical format for better engagement on reels',
  'Add captions to increase watch time by 40%',
  'Use cinematic color grading for a professional look',
];

const recentProjects = [
  { title: 'Summer Vlog 2024', meta: 'Edited 2 hours ago', time: '12:34' },
  { title: 'Product Review', meta: 'Edited yesterday', time: '8:45' },
  { title: 'Tutorial Series', meta: 'Edited 3 days ago', time: '15:22' },
];

function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const active = onboardingSteps[step];
  const isLast = step === onboardingSteps.length - 1;

  const canContinue = useMemo(() => Boolean(answers[step]), [answers, step]);

  const handleSelect = (optionName) => {
    setAnswers((prev) => ({ ...prev, [step]: optionName }));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
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
            <button className="side-item active" type="button">
              Projects
            </button>
            <button className="side-item" type="button">
              AI Studio
            </button>
            <button className="side-item" type="button">
              Settings
            </button>
          </nav>
          <article className="pro-box">
            <h4>Pro Features</h4>
            <p>Unlock advanced AI optimization</p>
            <button className="nav-btn continue" type="button">
              Upgrade
            </button>
          </article>
        </aside>

        <section className="workspace-main">
          <h1>Welcome back 👋</h1>
          <p className="subtitle">Ready to create something amazing?</p>

          <div className="workspace-actions">
            <article className="action-card">
              <h3>New Project</h3>
              <p>Start editing a new video</p>
            </article>
            <article className="action-card upload">
              <h3>Upload Video</h3>
              <p>Drag & drop or click to browse</p>
            </article>
          </div>

          <section>
            <h2 className="workspace-title">AI Suggestions</h2>
            <div className="tips-grid">
              {aiSuggestions.map((tip) => (
                <article className="tip-card" key={tip}>
                  {tip}
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="workspace-title">Recent Projects</h2>
            <div className="recent-grid">
              {recentProjects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-thumb">
                    <span>{project.time}</span>
                  </div>
                  <div className="project-info">
                    <h4>{project.title}</h4>
                    <p>{project.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="onboarding-page">
      <section className="onboarding-shell">
        <header className="onboarding-header">
          <strong className="brand">AutoHire</strong>
          <button className="ghost-btn" type="button">
            Skip for now
          </button>
        </header>

        <div className="progress-rails" aria-hidden="true">
          {onboardingSteps.map((item, index) => (
            <span className={`rail ${index <= step ? 'active' : ''}`} key={item.title} />
          ))}
        </div>

        <p className="step-label">Step {step + 1} of {onboardingSteps.length}</p>

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
