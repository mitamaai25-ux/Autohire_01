import { useState } from 'react';
import { scoreResume } from '../api';

function ResumeScoring() {
  const [form, setForm] = useState({
    skills: '',
    experienceYears: 0,
    educationLevel: 'bachelors',
    projectsCount: 0,
    keywordsMatched: 0,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const payload = {
        ...form,
        skills: form.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
      };
      const data = await scoreResume(payload);
      setResult(data);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="card resume-card">
        <h2>AI Resume Scoring</h2>
        <p className="subtitle">Get an instant AutoHire score with transparent scoring breakdown.</p>

        <form onSubmit={onSubmit}>
          <label htmlFor="skills">Skills (comma-separated)</label>
          <input id="skills" name="skills" type="text" onChange={onChange} placeholder="React, Node.js, SQL" required />

          <label htmlFor="experienceYears">Experience (years)</label>
          <input id="experienceYears" name="experienceYears" type="number" min="0" onChange={onChange} required />

          <label htmlFor="educationLevel">Education Level</label>
          <select id="educationLevel" name="educationLevel" onChange={onChange} value={form.educationLevel}>
            <option value="phd">PhD</option>
            <option value="masters">Masters</option>
            <option value="bachelors">Bachelors</option>
            <option value="diploma">Diploma</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="projectsCount">Projects Count</label>
          <input id="projectsCount" name="projectsCount" type="number" min="0" onChange={onChange} required />

          <label htmlFor="keywordsMatched">Keywords Matched</label>
          <input id="keywordsMatched" name="keywordsMatched" type="number" min="0" onChange={onChange} required />

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Scoring...' : 'Score Resume'}
          </button>
        </form>

        {result && (
          <section className="score-result">
            <h3>Resume Score: {result.score}/100</h3>
            <p>
              Breakdown — Skills: {result.breakdown.skills}, Experience: {result.breakdown.experience},
              Projects: {result.breakdown.projects}, Keywords: {result.breakdown.keywords}, Education:{' '}
              {result.breakdown.education}
            </p>
            {result.recommendations.length > 0 && (
              <ul>
                {result.recommendations.map((rec) => (
                  <li key={rec}>{rec}</li>
                ))}
              </ul>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

export default ResumeScoring;
