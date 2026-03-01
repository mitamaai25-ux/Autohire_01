import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeScoring from './pages/ResumeScoring';
import RecruiterDashboard from './pages/RecruiterDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import Jobs from './pages/Jobs';
import JobsDashboard from './pages/JobsDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Home />} />
      <Route path="/resume-scoring" element={<ResumeScoring />} />
      <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
      <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
      <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/dashboard/:mode" element={<JobsDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
