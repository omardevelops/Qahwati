import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const NAV_LINKS = [
  { to: '/', label: '🏠 Home', exact: true },
  { to: '/beans', label: '☕ Beans' },
  { to: '/brewing-methods', label: '🫗 Brewing Methods' },
  { to: '/grinders', label: '⚙️ Grinders' },
  { to: '/brews', label: '📋 Brews' },
];

function Layout({ children }) {
  const location = useLocation();

  const isActive = (to, exact) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">☕</span>
            <span className="logo-text">Qahwati</span>
          </Link>
          <nav className="nav">
            {NAV_LINKS.map(({ to, label, exact }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link${isActive(to, exact) ? ' nav-link--active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="layout-main">{children}</main>
      <footer className="layout-footer">
        <p>Qahwati &mdash; Your Personal Coffee Journal</p>
      </footer>
    </div>
  );
}

export default Layout;
