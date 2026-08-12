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
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="avatar" className="nav-avatar" />
          ) : (
            <span className="nav-avatar-placeholder">{(user?.name ?? 'G').charAt(0)}</span>
          )}
          <div className="profile-pill-info">
            <strong>{user?.name ?? 'Guest'}</strong>
            <span className="profile-pill-role">{user?.role ?? 'Visitor'}</span>
          </div>
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
