import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { registerUser } from '../api';

const accountTypes = ['freelancer', 'client'];

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type');
  const initialType = accountTypes.includes(typeFromUrl) ? typeFromUrl : 'freelancer';

  const [form, setForm] = useState({ name: '', email: '', password: '', accountType: initialType });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const accountSummary = useMemo(
    () =>
      form.accountType === 'client'
        ? ['Project overview', 'Talent suggestions', 'Payment summary']
        : ['Job recommendations', 'Earnings overview', 'Proposal tracker'],
    [form.accountType]
  );

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser({ name: form.name, email: form.email, password: form.password });
      localStorage.setItem('autohire_account_type', form.accountType);
      navigate('/login');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="card auth-card auth-card-wide">
        <div className="auth-card-header">
          <div>
            <p className="badge">Sign up</p>
            <h2>{form.accountType === 'client' ? 'Client Registration' : 'Freelancer Registration'}</h2>
          </div>
          <Link className="btn btn-secondary" to="/ui">
            Home
          </Link>
        </div>

        <div className="account-type-tabs" role="tablist" aria-label="Account type">
          {accountTypes.map((type) => (
            <button
              className={`jobs-type-btn ${form.accountType === type ? 'active' : ''}`}
              key={type}
              onClick={() => setForm((prev) => ({ ...prev, accountType: type }))}
              type="button"
            >
              {type === 'client' ? 'Client Registration' : 'Freelancer Registration'}
            </button>
          ))}
        </div>

        <div className="auth-card-split">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" onChange={handleChange} required />

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

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <aside className="auth-preview-card">
            <h3>{form.accountType === 'client' ? 'Client dashboard preview' : 'Freelancer dashboard preview'}</h3>
            <ul>
              {accountSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>

        <p className="alt-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
