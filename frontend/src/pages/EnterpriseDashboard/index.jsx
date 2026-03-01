import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEnterpriseDashboard } from '../../api';
import ExecutiveKPIs from './components/ExecutiveKPIs';
import HiringVelocityChart from './components/HiringVelocityChart';
import HiringFunnel from './components/HiringFunnel';
import DepartmentDemandChart from './components/DepartmentDemandChart';
import HiringStatusStack from './components/HiringStatusStack';
import GovernanceMetrics from './components/GovernanceMetrics';
import WorkforceInsights from './components/WorkforceInsights';
import './enterprise-dashboard.css';

export default function EnterpriseDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const payload = await getEnterpriseDashboard();
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
      <main className="page enterprise-dashboard-page">
        <section className="card freelancer-dashboard-card">
          <p className="muted">Loading enterprise dashboard...</p>
        </section>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="page enterprise-dashboard-page">
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
    <main className="page enterprise-dashboard-page">
      <section className="card freelancer-dashboard-card">
        <div className="dashboard-header freelancer-dashboard-header">
          <h2>Enterprise Dashboard</h2>
          <Link className="btn btn-secondary" to="/">
            Back to Home
          </Link>
        </div>
        <div className="ed-row-exec">
          <ExecutiveKPIs />
        </div>

        <div className="ed-row-1">
          <HiringVelocityChart />
          <HiringFunnel />
        </div>

        <div className="ed-row-2">
          <DepartmentDemandChart />
          <HiringStatusStack />
        </div>

        <div className="ed-row-3">
          <GovernanceMetrics />
        </div>

        <div className="ed-row-4">
          <WorkforceInsights />
        </div>
      </section>
    </main>
  );
}
