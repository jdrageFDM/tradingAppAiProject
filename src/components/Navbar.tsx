import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const THEME_STORAGE_KEY = 'ai-trading-theme';
const PREFERENCES_STORAGE_KEY = 'ai-trading-preferences';

function Navbar() {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const availableBalance = '$84,960';

  useEffect(() => {
    const rawPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    const nextTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : rawPreferences
          ? (() => {
              try {
                const parsed = JSON.parse(rawPreferences);
                return parsed.theme === 'light' ? 'light' : 'dark';
              } catch {
                return 'dark';
              }
            })()
          : 'dark';

    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    try {
      const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify({ ...parsed, theme }));
      }
    } catch {
      localStorage.removeItem(PREFERENCES_STORAGE_KEY);
    }
  }, [theme]);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleThemeToggle = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="topbar">
      <div className="search-box">
        <span className="search-label">Search symbol</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for stocks, ETFs, or indices"
        />
      </div>
      <div className="top-actions">
        <NavLink to="/account" className="profile-pill profile-link">
          <strong>{user?.name ?? 'Guest'}</strong>
        </NavLink>
        <div className="balance-pill">
          <span>Available balance</span>
          <strong>{availableBalance}</strong>
        </div>
        <button type="button" className="theme-toggle" onClick={handleThemeToggle}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
        <button className="ghost-button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
