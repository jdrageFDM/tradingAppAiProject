import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/trade', label: 'Trade' },
  { path: '/market', label: 'Market' },
  { path: '/account', label: 'Account' }
];

function Sidebar() {
  return (
    <aside className="sidebar-panel">
      <div className="brand-block">
        <div className="brand-mark">AI</div>
        <div>
          <h1>TradePulse</h1>
          <p>Equity intelligence</p>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-card">
        <p className="card-label">Watchlist</p>
        <ul className="watchlist-menu">
          <li>APPL • 178.34 ▲1.6%</li>
          <li>TSLA • 249.79 ▼0.8%</li>
          <li>MSFT • 411.22 ▲0.9%</li>
        </ul>
      </div>

      <div className="sidebar-card sidebar-info">
        <p className="small-label">Quick snapshot</p>
        <div className="info-row">
          <span>Buying power</span>
          <strong>$14,900</strong>
        </div>
        <div className="info-row">
          <span>Open orders</span>
          <strong>2</strong>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
