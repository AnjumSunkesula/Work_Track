const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/Users`;

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorBody;

    try {
      errorBody = await res.json();
    } catch {
      errorBody = {};
    }

    // Normalize error
    if (errorBody.code === "INVALID_EMAIL") {
      throw { code: "INVALID_EMAIL" };
    }

    if (errorBody.code === "INVALID_PASSWORD") {
      throw { code: "INVALID_PASSWORD" };
    }

    throw { code: "UNKNOWN_ERROR" };
  }

  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Registration failed");
  }

  return res.json();
}

export async function getMe(token) {
  const res = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
