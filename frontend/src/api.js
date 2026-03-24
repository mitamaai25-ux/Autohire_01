const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function parseJsonResponse(response, fallbackMessage) {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message || fallbackMessage);
  }

  return data;
}

function toNetworkError(error, fallbackMessage) {
  if (error instanceof Error && error.message) {
    if (error.message === 'Failed to fetch') {
      return new Error('Unable to reach the AutoHire API. Confirm the backend is running and reachable.');
    }
    return error;
  }

  return new Error(fallbackMessage);
}

export async function getApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });

    return await parseJsonResponse(response, 'Could not reach AutoHire API health endpoint.');
  } catch (error) {
    throw toNetworkError(error, 'Could not reach AutoHire API health endpoint.');
  }
}

export async function registerUser(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return await parseJsonResponse(response, 'Registration failed.');
  } catch (error) {
    throw toNetworkError(error, 'Registration failed.');
  }
}

export async function loginUser(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return await parseJsonResponse(response, 'Login failed.');
  } catch (error) {
    throw toNetworkError(error, 'Login failed.');
  }
}

export async function getDashboardData(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await parseJsonResponse(response, 'Could not load dashboard.');
  } catch (error) {
    throw toNetworkError(error, 'Could not load dashboard.');
  }
}

export async function scoreResume(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/resume-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return await parseJsonResponse(response, 'Resume scoring failed.');
  } catch (error) {
    throw toNetworkError(error, 'Resume scoring failed.');
  }
}

export async function matchFreelancers(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/job-matching`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return await parseJsonResponse(response, 'Job matching failed.');
  } catch (error) {
    throw toNetworkError(error, 'Job matching failed.');
  }
}
