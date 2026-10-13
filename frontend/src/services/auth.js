
const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Send a request to the FastAPI backend.
 * Converts unsuccessful responses into readable errors.
 */
async function authRequest(endpoint, userData) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.detail || "Something went wrong. Please try again."
    );
  }

  return data;
}

/**
 * Register a new Portfolia user.
 */
export function signupUser({ full_name, email, password }) {
  return authRequest("/api/auth/signup", {
    full_name,
    email,
    password,
  });
}

/**
 * Log in an existing Portfolia user.
 */
export function loginUser({ email, password }) {
  return authRequest("/api/auth/login", {
    email,
    password,
  });
}
