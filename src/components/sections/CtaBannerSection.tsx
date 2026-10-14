import { Link } from 'react-router-dom';

export default function CtaBannerSection() {
  return (
    <section className="section">
        <div className="wrap split">
          <div>
            <h2>Hành trình tiếp theo đang chờ bạn.</h2>
            <p className="muted" style={{ marginTop: 16 }}>
              Tìm tuyến phù hợp hoặc xem lại chuyến của mình bất cứ lúc nào trong phiên này.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn primary" to="/book">Đặt xe ngay</Link>
            <Link className="btn secondary" to="/my-trips">Chuyến của tôi</Link>
          </div>
        </div>
      </section>
  );
}
