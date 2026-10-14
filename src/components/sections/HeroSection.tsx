import { CITIES, IMAGES } from '../../utils/constants';
import { useBookingSearch } from '../../features/booking/hooks/useBookingSearch';

export default function HeroSection() {
  const { quickError, handleQuickSubmit } = useBookingSearch();
  return (
    <section className="hero">
        <div className="wrap split">
          <div>
            <p className="pill">Tuyến đường của bạn, lựa chọn của bạn</p>
            <h1 style={{ marginTop: 20 }}>
              Đi xa, <em style={{ color: 'var(--brick)', fontStyle: 'italic' }}>gần nhau</em> hơn.
            </h1>
            <p className="muted" style={{ marginTop: 20 }}>
              Đặt xe đi ghép hoặc bao xe liên tỉnh với bảng giá rõ ràng trước khi khởi hành.
            </p>
            <form id="quick-form" className="panel hero-card space" noValidate onSubmit={handleQuickSubmit}>
              <h3>Bạn muốn đi đâu?</h3>
              <div className="form-grid">
                <div>
                  <label className="label" htmlFor="q-pickup">Điểm đi</label>
                  <select className="field" id="q-pickup" name="pickup_address" defaultValue="Hải Phòng">
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="q-dropoff">Điểm đến</label>
                  <select className="field" id="q-dropoff" name="dropoff_address" defaultValue="Hà Nội">
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="q-time">Ngày giờ khởi hành</label>
                  <input className="field" id="q-time" name="departure_time" type="datetime-local" />
                </div>
                <div>
                  <label className="label" htmlFor="q-service">Dịch vụ</label>
                  <select className="field" id="q-service" name="service_type" defaultValue="SHARED_RIDE">
                    <option value="SHARED_RIDE">Đi ghép</option>
                    <option value="PRIVATE_CHARTER">Bao xe</option>
                  </select>
                </div>
              </div>
              {quickError && <p className="error" role="alert">{quickError}</p>}
              <button className="btn primary" type="submit" style={{ width: '100%' }}>
                Xem giá cước →
              </button>
            </form>
          </div>
          <div className="hero-art">
            <img src={IMAGES.hero} alt="Không gian nghỉ ngơi trong ảnh minh họa ban đầu" fetchPriority="high" width={1200} height={800} />
            <div className="hero-caption">
              <span className="pill">Dữ liệu mẫu mô phỏng</span>
              <p style={{ marginTop: 12 }}>Từ Hải Phòng đến những hành trình mới.</p>
            </div>
          </div>
        </div>
      </section>
  );
}
