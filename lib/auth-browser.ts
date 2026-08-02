export type AuthUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

export type AuthSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  expires_in?: number;
  user: AuthUser;
};

const STORAGE_KEY = "artbop-auth-session";

function authConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("网站登录服务尚未配置");
  }

  return { url, anonKey };
}

async function authRequest(
  path: string,
  init: RequestInit = {},
) {
  const { url, anonKey } = authConfig();
  const response = await fetch(`${url}/auth/v1${path}`, {
    ...init,
    headers: {
      apikey: anonKey,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data.msg || data.message || data.error_description || "登录请求失败",
    );
  }

  return data;
}

export function loadStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as AuthSession) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function storeSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;

  if (session) {
    const expiresAt =
      session.expires_at ||
      Math.floor(Date.now() / 1000) + (session.expires_in || 3600);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...session, expires_at: expiresAt }),
    );
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
) {
  return authRequest("/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      data: { display_name: displayName },
    }),
  });
}

export async function signInWithEmail(email: string, password: string) {
  return authRequest("/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }) as Promise<AuthSession>;
}

export async function refreshAuthSession(refreshToken: string) {
  return authRequest("/token?grant_type=refresh_token", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  }) as Promise<AuthSession>;
}

export async function signOutSession(accessToken: string) {
  try {
    await authRequest("/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } finally {
    storeSession(null);
  }
}
