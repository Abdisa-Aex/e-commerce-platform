// Small fetch wrapper used by the whole storefront.
// - Base URL comes from VITE_API_URL (see .env.example)
// - Sends the access token, and silently refreshes it once when it has expired
const BASE = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

const safe = {
  get: (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* private mode: ignore */
    }
  },
  del: (k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  },
};

export const tokens = {
  get access() {
    return safe.get("accessToken");
  },
  get refresh() {
    return safe.get("refreshToken");
  },
  save({ accessToken, refreshToken }) {
    if (accessToken) safe.set("accessToken", accessToken);
    if (refreshToken) safe.set("refreshToken", refreshToken);
  },
  clear() {
    safe.del("accessToken");
    safe.del("refreshToken");
  },
};

let refreshing = null;
const refreshAccessToken = async () => {
  if (!tokens.refresh) return false;
  // share one refresh call between parallel requests
  refreshing ||= fetch(`${BASE}/api/users/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: tokens.refresh }),
  })
    .then(async (r) => {
      if (!r.ok) return false;
      tokens.save(await r.json());
      return true;
    })
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
};

async function request(method, path, body, retry = true) {
  const headers = {};
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  if (body && !isForm) headers["Content-Type"] = "application/json";
  if (tokens.access) headers.Authorization = `Bearer ${tokens.access}`;

  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      method,
      headers,
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    });
  } catch {
    const err = new Error("Cannot reach the server. Check your internet connection.");
    err.network = true;
    throw err;
  }

  if (res.status === 401 && retry && tokens.refresh && !path.startsWith("/users/login")) {
    if (await refreshAccessToken()) return request(method, path, body, false);
    tokens.clear();
    window.dispatchEvent(new Event("auth:logout"));
  }

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* empty body */
  }
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  get: (p) => request("GET", p),
  post: (p, b) => request("POST", p, b ?? {}),
  put: (p, b) => request("PUT", p, b ?? {}),
  patch: (p, b) => request("PATCH", p, b ?? {}),
  del: (p) => request("DELETE", p),
};

export default api;
