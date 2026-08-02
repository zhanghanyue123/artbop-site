"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthSession,
  AuthUser,
  loadStoredSession,
  refreshAuthSession,
  registerWithEmail,
  signInWithEmail,
  signOutSession,
  storeSession,
} from "../lib/auth-browser";

type AuthContextValue = {
  loading: boolean;
  user: AuthUser | null;
  session: AuthSession | null;
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<{ confirmationRequired: boolean }>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let active = true;

    async function restore() {
      const stored = loadStoredSession();
      if (!stored) {
        if (active) setLoading(false);
        return;
      }

      try {
        const expiresSoon =
          !stored.expires_at || stored.expires_at * 1000 < Date.now() + 60000;
        const nextSession = expiresSoon
          ? await refreshAuthSession(stored.refresh_token)
          : stored;
        storeSession(nextSession);
        if (active) setSession(nextSession);
      } catch {
        storeSession(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    restore();
    return () => {
      active = false;
    };
  }, []);

  async function register(
    email: string,
    password: string,
    displayName: string,
  ) {
    const result = await registerWithEmail(email, password, displayName);
    const nextSession = result.session ||
      (result.access_token ? result : null);

    if (nextSession) {
      storeSession(nextSession);
      setSession(nextSession);
    }

    return { confirmationRequired: !nextSession };
  }

  async function login(email: string, password: string) {
    const nextSession = await signInWithEmail(email, password);
    storeSession(nextSession);
    setSession(nextSession);
  }

  async function logout() {
    if (session?.access_token) {
      await signOutSession(session.access_token);
    } else {
      storeSession(null);
    }
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        user: session?.user || null,
        session,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
