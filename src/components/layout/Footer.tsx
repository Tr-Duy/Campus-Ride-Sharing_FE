import { Link } from 'react-router-dom';
import { BRAND_NAME, HOTLINE, ZALO_PHONE } from '../../utils/constants';

export default function Footer() {
  return (
    <footer style={{ padding: '42px 0', borderTop: '1px solid var(--line)', background: 'var(--cream)' }}>
      <div className="wrap">
        <strong style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20, fontWeight: 600, color: 'var(--brick)' }}>
          {BRAND_NAME}
        </strong>
        <p className="muted small" style={{ marginTop: 8 }}>
          Đặt xe liên tỉnh minh bạch về giá. Thông tin liên hệ và hoạt động điều phối trên trang là dữ liệu mẫu mô phỏng.
        </p>
        <nav aria-label="Liên kết cuối trang" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', marginTop: 20, fontSize: 14 }}>
          <Link to="/book">Đặt xe</Link>
          <Link to="/my-trips">Chuyến của tôi</Link>
          <Link to="/fares">Giá cước</Link>
          <Link to="/policies">Chính sách & FAQ</Link>
          <Link to="/policies#terms">Điều khoản</Link>
          <a href={`tel:${HOTLINE.replace(/\s/g, '')}`}>Hotline {HOTLINE}</a>
          <a href={`https://zalo.me/0901234567`} target="_blank" rel="noopener noreferrer">Zalo {ZALO_PHONE}</a>
        </nav>
      </div>
    </footer>
  );
}
