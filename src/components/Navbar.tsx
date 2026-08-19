import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { persistTheme, resolveThemePreference, Theme } from '../services/theme';

function Navbar() {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => resolveThemePreference());
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const availableBalance = '$84,960';

  useEffect(() => {
    persistTheme(theme);
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
