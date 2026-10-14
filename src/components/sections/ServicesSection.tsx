import { IMAGES } from '../../utils/constants';
import { Link } from 'react-router-dom';

export default function ServicesSection() {
  return (
    <section className="section">
        <div className="wrap">
          <h2>Một hành trình, hai cách đi.</h2>
          <div className="split" style={{ marginTop: 40 }}>
            <div className="photo">
              <img src={IMAGES.shared} alt="Đi ghép xe tiện lợi" loading="lazy" />
            </div>
            <div className="space">
              <span className="pill">01 / Đi ghép</span>
              <h3>Chọn chỗ ngồi vừa đủ</h3>
              <p className="muted">Đặt một ghế, hai ghế hoặc bao hàng ghế. Giá tính theo tuyến và lựa chọn ghế.</p>
              <Link className="btn primary" to="/book">Đặt chuyến đi ghép</Link>
            </div>
          </div>
          <div className="split" style={{ marginTop: 64 }}>
            <div className="space">
              <span className="pill">02 / Bao xe</span>
              <h3>Chủ động toàn bộ chuyến đi</h3>
              <p className="muted">Chọn xe 5 chỗ hoặc 7 chỗ, đi một chiều, hai chiều hoặc hỏi giá thuê xe theo giờ.</p>
              <Link className="btn secondary" to="/book">Khám phá bao xe</Link>
            </div>
            <div className="photo">
              <img src={IMAGES.privateCar} alt="Bao xe riêng" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
  );
}
