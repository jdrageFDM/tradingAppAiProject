import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const availableBalance = '$84,960';

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
        <NavLink to="/account" className="profile-pill profile-link">
          <strong>{user?.name ?? 'Guest'}</strong>
        </NavLink>
        <div className="balance-pill">
          <span>Available balance</span>
          <strong>{availableBalance}</strong>
        </div>
        <button className="ghost-button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
