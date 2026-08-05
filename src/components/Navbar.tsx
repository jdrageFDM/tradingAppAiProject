import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/login');
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
        <button className="ghost-button">Insights</button>
        <button className="ghost-button">Notifications</button>
        <div className="profile-pill">
          <span>{user?.name.charAt(0) ?? '?'}</span>
          <div>
            <strong>{user?.name ?? 'Guest'}</strong>
            <span>{user?.role ?? 'Visitor'}</span>
          </div>
        </div>
        <button className="ghost-button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
