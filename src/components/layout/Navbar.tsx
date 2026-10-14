import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { BRAND_NAME } from '../../utils/constants';

export default function Navbar() {
  const { user } = useApp();
  const { pathname } = useLocation();

  return (
    <header className="site-header" style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: '#F5F1EAeb', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--line)',
    }}>
      <div className="wrap site-navbar-content">
        <Link to="/" style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26, fontWeight: 600, color: 'var(--brick)' }}>
          {BRAND_NAME}
        </Link>

        <nav aria-label="Điều hướng chính" className="site-navbar-links">
          <NavLink to="/book" current={pathname}>Đặt xe</NavLink>
          <NavLink to="/my-trips" current={pathname}>Chuyến của tôi</NavLink>
          <NavLink to="/fares" current={pathname}>Giá cước</NavLink>
          <NavLink to="/policies" current={pathname}>Chính sách & FAQ</NavLink>
          <NavLink to={user ? '/account' : '/login'} current={pathname}>
            {user ? `Xin chào, ${user.name}` : 'Tài khoản'}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, current, children }: { to: string; current: string; children: React.ReactNode }) {
  const active = current === to || (to !== '/' && current.startsWith(to));
  return (
    <Link to={to} style={{ color: active ? 'var(--brick)' : 'var(--ink)', fontWeight: active ? 700 : 400 }}>
      {children}
    </Link>
  );
}
