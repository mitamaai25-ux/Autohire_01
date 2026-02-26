import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFreelancerDashboard } from '../../api';
import PerformanceChart from './components/PerformanceChart';
import HiringFunnel from './components/HiringFunnel';
import SkillsRadar from './components/SkillsRadar';
import ProjectHealth from './components/ProjectHealth';
import ClientRatingSummary from './components/ClientRatingSummary';
import MetricsStrip from './components/MetricsStrip';
import InsightCard from './components/InsightCard';
import QualityMetrics from './components/QualityMetrics';
import './freelancer-dashboard.css';

export default function FreelancerDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await getFreelancerDashboard();
        setData(payload);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <main className="page freelancer-dashboard-page">
        <section className="card freelancer-dashboard-card">
          <p className="muted">Loading freelancer dashboard...</p>
        </section>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="page freelancer-dashboard-page">
        <section className="card freelancer-dashboard-card">
          <p className="error">{error || 'Failed to load dashboard.'}</p>
          <Link className="btn btn-secondary" to="/">
            Back to Home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page freelancer-dashboard-page">
      <section className="card freelancer-dashboard-card">
        <div className="dashboard-header freelancer-dashboard-header">
          <h2>Freelancer Dashboard</h2>
          <Link className="btn btn-secondary" to="/">
            Back to Home
          </Link>
        </div>
        <p className="subtitle">
          Performance analytics: trends, funnel, skills, and quality metrics.
        </p>

        <div className="fd-row-1">
          <PerformanceChart />
          <HiringFunnel />
        </div>

        <div className="fd-row-2">
          <SkillsRadar />
          <ProjectHealth />
        </div>

        <div className="fd-row-3">
          <MetricsStrip data={data} />
        </div>

        <div className="fd-row-4">
          <InsightCard />
          <ClientRatingSummary clientRating={data.clientRating} />
          <QualityMetrics />
        </div>
      </section>
    </main>
  );
}
