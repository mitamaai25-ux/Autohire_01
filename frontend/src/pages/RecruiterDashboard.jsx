import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApiHealth, matchFreelancers } from '../api';

function RecruiterDashboard() {
  const [form, setForm] = useState({
    jobDescription:
      'Need a senior full-stack freelancer for React + Node.js SaaS platform with API design and delivery ownership.',
    requiredSkills: 'React, Node.js, API design, Data modeling',
    minRating: 4,
    minExperience: 0,
    minProjects: 10,
    realtime: true,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ loading: true, message: 'Checking API connection…', healthy: false });

  const payload = useMemo(
    () => ({
      jobDescription: form.jobDescription,
      requiredSkills: form.requiredSkills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
      filters: {
        minRating: Number(form.minRating),
        minExperience: Number(form.minExperience),
        minProjects: Number(form.minProjects),
      },
      realtime: form.realtime,
    }),
    [form]
  );

  const checkApiStatus = async () => {
    setApiStatus({ loading: true, message: 'Checking API connection…', healthy: false });
    try {
      const data = await getApiHealth();
      setApiStatus({ loading: false, message: data.message || 'API connected.', healthy: true });
    } catch (healthError) {
      setApiStatus({ loading: false, message: healthError.message, healthy: false });
    }
  };

  const runMatching = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await matchFreelancers(payload);
      setResult(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkApiStatus();
    runMatching();
  }, []);

  useEffect(() => {
    if (!form.realtime) return;
    const timer = setInterval(() => {
      runMatching();
    }, 3500);
    return () => clearInterval(timer);
  }, [form.realtime, payload]);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    runMatching();
  };

  return (
    <main className="page recruiter-page">
      <section className="card recruiter-card">
        <div className="dashboard-header recruiter-header">
          <div>
            <p className="badge">Recruiter workspace</p>
            <h2>Recruiter Dashboard — AI-Powered Job Matching Engine</h2>
            <p className="subtitle recruiter-subtitle">
              Semantic matching with cosine similarity, auto-suggestions, intelligent filters, and live ranking
              refresh.
            </p>
          </div>
          <div className="recruiter-actions">
            <Link className="btn btn-secondary" to="/ui">
              Home
            </Link>
            <button className="btn btn-secondary" type="button" onClick={checkApiStatus}>
              Refresh API
            </button>
          </div>
        </div>

        <p className={`api-status ${apiStatus.healthy ? 'healthy' : 'offline'}`}>
          {apiStatus.loading ? 'Checking API connection…' : apiStatus.message}
        </p>

        <form onSubmit={onSubmit}>
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={form.jobDescription}
            onChange={onChange}
            rows={4}
          />

          <label htmlFor="requiredSkills">Required Skills (comma-separated)</label>
          <input id="requiredSkills" name="requiredSkills" value={form.requiredSkills} onChange={onChange} />

          <div className="filter-grid">
            <div>
              <label htmlFor="minRating">Min Client Rating</label>
              <input
                id="minRating"
                name="minRating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.minRating}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="minExperience">Min Experience (years)</label>
              <input id="minExperience" name="minExperience" type="number" min="0" value={form.minExperience} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="minProjects">Min Project History</label>
              <input id="minProjects" name="minProjects" type="number" min="0" value={form.minProjects} onChange={onChange} />
            </div>
          </div>

          <label className="check-row">
            <input type="checkbox" name="realtime" checked={form.realtime} onChange={onChange} />
            Real-time ranking update
          </label>

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Run Matching'}
          </button>
        </form>

        {result && (
          <section className="match-result">
            <div className="recruiter-result-header">
              <div>
                <h3>Auto-suggestions</h3>
                <p>{result.suggestions.join(' • ') || 'No suggestions available.'}</p>
              </div>
              <p className="muted">Last updated: {new Date(result.updatedAt).toLocaleTimeString()}</p>
            </div>

            <div className="recruiter-summary-grid">
              <article>
                <span>Ranked profiles</span>
                <strong>{result.rankings.length}</strong>
              </article>
              <article>
                <span>Top match score</span>
                <strong>{result.rankings[0]?.matchScore || 0}%</strong>
              </article>
              <article>
                <span>Realtime mode</span>
                <strong>{form.realtime ? 'On' : 'Off'}</strong>
              </article>
            </div>

            <div className="rankings-grid">
              {result.rankings.map((item) => (
                <article className="ranking-card" key={item.id}>
                  <h4>{item.name}</h4>
                  <p className="muted">{item.role}</p>
                  <p>
                    Match Score: <strong>{item.matchScore}%</strong>
                  </p>
                  <p>Skill Match: {item.skillMatch}%</p>
                  <p>Semantic Match: {item.semanticMatchScore}%</p>
                  <p>Experience Weight: {item.experienceWeight}</p>
                  <p>Confidence Level: {item.confidenceLevel}</p>
                  <p>
                    Rating: {item.clientRating} • Projects: {item.projectHistory}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default RecruiterDashboard;
