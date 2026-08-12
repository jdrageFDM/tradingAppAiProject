import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorBanner from '../components/ErrorBanner';

const THEME_STORAGE_KEY = 'ai-trading-theme';
const PREFERENCES_STORAGE_KEY = 'ai-trading-preferences';

const resolveThemePreference = (): 'dark' | 'light' => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  const rawPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
  if (rawPreferences) {
    try {
      const parsed = JSON.parse(rawPreferences);
      if (parsed.theme === 'light' || parsed.theme === 'dark') {
        return parsed.theme;
      }
    } catch {
      // Ignore malformed stored preferences and fall through to browser preference.
    }
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark';
};

function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resolvedTheme = resolveThemePreference();
    setTheme(resolvedTheme);
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    try {
      const storedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (storedPreferences) {
        const parsed = JSON.parse(storedPreferences);
        localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify({ ...parsed, theme }));
      }
    } catch {
      localStorage.removeItem(PREFERENCES_STORAGE_KEY);
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('ai-trading-app-remembered-email');
    if (storedEmail) {
      setEmail(storedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password, remember);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
    }
  };

  const handleThemeToggle = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="login-page">
      <div className="login-toolbar">
        <button type="button" className="theme-toggle" onClick={handleThemeToggle}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
      <section className="login-panel">
        <div className="login-brand">
          <div className="brand-mark">AI</div>
          <div>
            <p className="small-label">TradePulse</p>
            <h1>Welcome back</h1>
          </div>
        </div>
        <p className="login-subtitle">Sign in to continue trading with TradePulse.</p>
        {error && <ErrorBanner message={error} />}
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jdrage@gmail.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password1"
              required
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            Remember me
          </label>
          <button type="submit" className="primary-button login-submit-button">
            Sign in
          </button>
        </form>
        <p className="login-note">Use jdrage@gmail.com / Password1</p>
      </section>
    </div>
  );
}

export default Login;
