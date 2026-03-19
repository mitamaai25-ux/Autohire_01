import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem('autohire_token');
      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);

      try {
        const payload = await getDashboardData(token);
        setData(payload);
      } catch (loadError) {
        setData(null);
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('autohire_token');
    localStorage.removeItem('autohire_user');
    navigate('/login');
  };

  return (
    <main className="page">
      <section className="card dashboard-card">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <button className="btn btn-secondary" onClick={logout} type="button">
            Logout
          </button>
        </div>

        {error ? (
          <div>
            <p className="error">{error}</p>
            <p className="muted">Please try again after the API is available, or sign in again if your session has expired.</p>
          </div>
        ) : loading ? (
          <p>Loading dashboard...</p>
        ) : !data ? (
          <p>No dashboard data is available right now.</p>
        ) : (
          <>
            <p className="success">{data.message}</p>
            <div className="stats-grid">
              <article>
                <h3>Jobs Applied</h3>
                <p>{data.stats.jobsApplied}</p>
              </article>
              <article>
                <h3>Interviews</h3>
                <p>{data.stats.interviewsScheduled}</p>
              </article>
              <article>
                <h3>Profile Strength</h3>
                <p>{data.stats.profileStrength}</p>
              </article>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
