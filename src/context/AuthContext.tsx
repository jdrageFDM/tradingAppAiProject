import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string, remember?: boolean) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'ai-trading-app-user';
const REMEMBER_EMAIL_KEY = 'ai-trading-app-remembered-email';

const mockUser: AuthUser = {
  name: 'James Smith',
  email: 'jdrage@gmail.com',
  role: 'Trader'
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored) as AuthUser);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string, remember = false) => {
    if (email.toLowerCase() === mockUser.email && password === 'Password1') {
      setUser(mockUser);
      if (remember) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
      return mockUser;
    }
    throw new Error('Invalid email or password');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REMEMBER_EMAIL_KEY);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
