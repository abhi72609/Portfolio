
const API_BASE_URL = "http://127.0.0.1:8000";

async function portfolioRequest(endpoint, options = {}) {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    throw new Error("Please log in to edit your portfolio.");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Your session expired. Please log in again.");
  }

  if (!response.ok) {
    throw new Error(
      data.detail || "Unable to process your portfolio request."
    );
  }

  return data;
}

export function getMyPortfolio() {
  return portfolioRequest("/api/portfolio/me", {
    method: "GET",
  });
}

export function saveMyPortfolio({ template, portfolio_data }) {
  return portfolioRequest("/api/portfolio/me", {
    method: "PUT",
    body: JSON.stringify({
      template,
      portfolio_data,
    }),
  });
}
