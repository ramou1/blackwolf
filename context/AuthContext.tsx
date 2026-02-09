"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { LoggedInUser } from "@/lib/mockUsers";
import {
  loginWithFirebase,
  logoutFirebase,
  onAuthChange,
} from "@/lib/firebaseAuth";
import { isFirebaseReady } from "@/lib/firebase";

const STORAGE_KEY = "blackwolf-user";

interface AuthContextType {
  user: LoggedInUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (isFirebaseReady) {
      const unsubscribe = onAuthChange((authUser) => {
        setUser(authUser);
        setLoaded(true);
      });
      return () => unsubscribe();
    }
    // Mock: carrega usuário do localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as LoggedInUser;
        if (parsed.id && parsed.email && parsed.name && parsed.role) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setAuthError(null);
    const result = await loginWithFirebase(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      if (!isFirebaseReady) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));
      }
      return true;
    }
    setAuthError(result.success === false ? result.error : null);
    return false;
  }, []);

  const logout = useCallback(async () => {
    await logoutFirebase();
    setUser(null);
    if (!isFirebaseReady) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    authError,
    clearAuthError,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
