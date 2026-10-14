import { Link, NavLink, Outlet } from 'react-router-dom'
import { routes } from '../../../config/routes'

export function AuthShell() {
  return (
    <div className="auth-shell">
      <header className="site-header">
        <Link className="brand" to={routes.login}>Cung Đường</Link>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          <span>Đặt xe</span><span>Chuyến của tôi</span><span>Giá cước</span><span>Chính sách</span>
          <NavLink className="account-link" to={routes.login}>Tài khoản</NavLink>
        </nav>
        <span className="mobile-menu" aria-hidden="true">☰</span>
      </header>
      <main className="auth-main">
        <aside className="journey-panel" aria-label="Cung Đường — đi cùng an tâm">
          <p className="eyebrow">CUNG ĐƯỜNG / ĐI CÙNG AN TÂM</p>
          <h2>Một tài khoản,<br />nhiều hành trình.</h2>
          <p className="journey-copy">Đặt xe liên tỉnh, xem giá rõ ràng<br className="desktop-break" /> và quản lý chuyến đi ở cùng một nơi.</p>
          <RouteIllustration />
          <div className="journey-note"><strong>Hành trình của bạn, luôn trong tầm tay</strong><span>Đặt chuyến&nbsp; · &nbsp;Theo dõi trạng thái&nbsp; · &nbsp;Xem lịch sử</span></div>
        </aside>
        <section className="form-panel"><Outlet /></section>
      </main>
      <footer className="site-footer"><span>© Cung Đường&nbsp; · &nbsp;Thiết kế giao diện</span><span>Điều khoản&nbsp; · &nbsp;Bảo mật&nbsp; · &nbsp;Hỗ trợ</span></footer>
    </div>
  )
}

function RouteIllustration() {
  return <svg className="route-illustration" viewBox="0 0 540 300" role="img" aria-label="Minh họa tuyến đường và xe">
    <path d="M4 214 C92 284 122 129 232 158 S362 134 522 16" fill="none" stroke="#D4C2AB" strokeWidth="52" strokeLinecap="round" />
    <path d="M4 214 C92 284 122 129 232 158 S362 134 522 16" fill="none" stroke="#FFFDFA" strokeWidth="28" strokeLinecap="round" />
    <path d="M4 214 C92 284 122 129 232 158 S362 134 522 16" fill="none" stroke="#93320D" strokeWidth="3" strokeDasharray="8 10" />
    <circle cx="78" cy="189" r="13" fill="#93320D"/><circle cx="78" cy="189" r="5" fill="#FFFDFA"/><circle cx="421" cy="70" r="13" fill="#93320D"/><circle cx="421" cy="70" r="5" fill="#FFFDFA"/>
    <g transform="translate(207 130)"><rect width="80" height="37" rx="12" fill="#93320D"/><rect x="15" y="7" width="37" height="16" rx="5" fill="#F6E3DA"/><rect x="8" y="31" width="12" height="8" rx="3" fill="#2B2A27"/><rect x="60" y="31" width="12" height="8" rx="3" fill="#2B2A27"/></g>
  </svg>
}

export function AuthLayout() {
  return <AuthShell />
}
