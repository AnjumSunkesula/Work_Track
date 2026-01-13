export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  return res;
}