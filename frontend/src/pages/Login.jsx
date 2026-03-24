import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiHealth, loginUser } from '../api';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ loading: true, message: 'Checking API connection…', healthy: false });

  useEffect(() => {
    let mounted = true;

    const checkApi = async () => {
      try {
        const data = await getApiHealth();
        if (!mounted) return;
        setApiStatus({ loading: false, message: data.message || 'API connected.', healthy: true });
      } catch (healthError) {
        if (!mounted) return;
        setApiStatus({ loading: false, message: healthError.message, healthy: false });
      }
    };

    checkApi();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(form);
      localStorage.setItem('autohire_token', data.token);
      localStorage.setItem('autohire_user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="card auth-card">
        <div className="auth-card-header">
          <div>
            <p className="badge">Account access</p>
            <h2>Login</h2>
          </div>
          <Link className="btn btn-secondary" to="/ui">
            Home
          </Link>
        </div>

        <p className={`api-status ${apiStatus.healthy ? 'healthy' : 'offline'}`}>
          {apiStatus.loading ? 'Checking API connection…' : apiStatus.message}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" onChange={handleChange} required />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            required
            minLength={6}
          />

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading || apiStatus.loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="alt-text">
          New to AutoHire? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
