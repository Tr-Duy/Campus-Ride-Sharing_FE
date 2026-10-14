import JourneyPreview from './JourneyPreview';
import { Link } from 'react-router-dom';

export default function FeatureHighlightSection() {
  return (
    <section className="section dark">
        <div className="wrap split">
          <div>
            <h2>
              Rõ từng chặng.{' '}
              <em style={{ color: '#e6a689' }}>An tâm từng quyết định.</em>
            </h2>
            <p className="muted" style={{ marginTop: 20 }}>
              Giá tuyến, phụ phí vùng xa và tùy chọn cao tốc đều được trình bày trước khi xác nhận.
              Cần hỗ trợ? Liên hệ trực tiếp với bộ phận CSKH mô phỏng.
            </p>
            <Link className="btn secondary" to="/policies" style={{ marginTop: 20, display: 'inline-flex' }}>
              Đọc chính sách & FAQ
            </Link>
          </div>
          <JourneyPreview />
        </div>
      </section>
  );
}
