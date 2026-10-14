import { ROUTES } from '../../utils/constants';
import { money } from '../../utils/format';
import { Link } from 'react-router-dom';

export default function PopularRoutesSection() {
  const popular = ROUTES.slice(0, 4);
  return (
    <section className="section" style={{ background: '#ebe3d8' }}>
        <div className="wrap split">
          <div>
            <h2>Những cung đường thường được chọn.</h2>
            <p className="muted" style={{ marginTop: 16 }}>
              Mức giá "từ" theo dữ liệu tuyến. Giá cuối cùng do hệ thống xác nhận khi điều phối.
            </p>
            <Link className="btn primary" to="/fares" style={{ marginTop: 20, display: 'inline-flex' }}>
              Xem toàn bộ bảng giá
            </Link>
          </div>
          <div className="panel">
            {popular.map((r) => (
              <div className="route" key={`${r.a}-${r.b}`}>
                <span>{r.a} ↔ {r.b}</span>
                <strong>Đi ghép từ {money(r.shared.one?.[0] ?? 0)}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
