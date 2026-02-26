const API_BASE_URL = 'http://localhost:5000/api';

export async function registerUser(payload) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed.');
  }

  return data;
}

export async function loginUser(payload) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed.');
  }

  return data;
}

export async function getDashboardData(token) {
  const response = await fetch(`${API_BASE_URL}/dashboard`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not load dashboard.');
  }

  return data;
}

export async function getFreelancerDashboard() {
  const response = await fetch(`${API_BASE_URL}/freelancer-dashboard`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not load freelancer dashboard.');
  }
  return data;
}

export async function scoreResume(payload) {
  const response = await fetch(`${API_BASE_URL}/resume-score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Resume scoring failed.');
  }

  return data;
}


export async function matchFreelancers(payload) {
  const response = await fetch(`${API_BASE_URL}/job-matching`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Job matching failed.');
  }

  return data;
}
