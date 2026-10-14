import { Link } from 'react-router-dom';
import Stepper from './BookingStepper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CITIES, FAR_AREAS, ROUTES } from '../../utils/constants';
import { cityOf, getRoute, isFar } from '../../utils/fare';
import { dateLocal } from '../../utils/format';
import { useApp } from '../../hooks/useApp';

export default function BookStep() {
  const navigate = useNavigate();
  const { booking, setBooking } = useApp();
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pickup_detail = (fd.get('pickup_detail') as string)?.trim();
    const dropoff_detail = (fd.get('dropoff_detail') as string)?.trim();
    const pickup = pickup_detail || (fd.get('pickup_address') as string);
    const dropoff = dropoff_detail || (fd.get('dropoff_address') as string);
    const departure_time = fd.get('departure_time') as string;
    const service_type = fd.get('service_type') as 'SHARED_RIDE' | 'PRIVATE_CHARTER';
    const is_highway = (fd.get('is_highway') as string) === 'on';

    if (!pickup || !dropoff) { setError('Vui lòng chọn điểm đón và điểm trả'); return; }
    if (cityOf(pickup) === cityOf(dropoff)) { setError('Điểm đi và điểm đến phải khác nhau'); return; }
    if (!departure_time || new Date(departure_time).getTime() <= Date.now()) { setError('Vui lòng chọn ngày giờ khởi hành trong tương lai'); return; }
    if (!getRoute(pickup, dropoff)) { setError('Tuyến chưa được hỗ trợ. Vui lòng chọn một tuyến trong bảng giá'); return; }

    const route = getRoute(pickup, dropoff);
    setBooking({
      pickup_address: pickup,
      dropoff_address: dropoff,
      departure_time,
      service_type,
      is_highway: route?.highway ? true : route?.optionalHighway ? is_highway : false,
    });
    navigate('/book/details');
  };

  const route = getRoute(booking.pickup_address, booking.dropoff_address);
  const showHighway = !!route?.optionalHighway;

  return (
    <section className="section">
      <div className="wrap">
        <Stepper active={0} />
        <h1>Chọn cung đường của bạn.</h1>
        <p className="muted" style={{ marginTop: 12, marginBottom: 32 }}>
          Bắt đầu bằng tuyến, thời gian và cách bạn muốn đi.
        </p>
        <div className="layout">
          <form className="panel space" onSubmit={handleSubmit} noValidate>
            {/* Điểm đón / trả */}
            <div className="form-grid">
              <div>
                <label className="label" htmlFor="pickup_address">Điểm đi</label>
                <select className="field" id="pickup_address" name="pickup_address" defaultValue={cityOf(booking.pickup_address) || 'Hải Phòng'}>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="dropoff_address">Điểm đến</label>
                <select className="field" id="dropoff_address" name="dropoff_address" defaultValue={cityOf(booking.dropoff_address) || 'Hà Nội'}>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            {/* Địa chỉ chi tiết */}
            <div className="form-grid" style={{ marginTop: 16 }}>
              <div>
                <label className="label" htmlFor="pickup_detail">Địa chỉ đón cụ thể</label>
                <input className="field" id="pickup_detail" name="pickup_detail" type="text"
                  defaultValue={isFar(booking.pickup_address) ? booking.pickup_address : ''}
                  list="pickup-suggestions" />
                <datalist id="pickup-suggestions">
                  {FAR_AREAS.map(x => <option key={x} value={`${x}, Hải Phòng`} />)}
                </datalist>
              </div>
              <div>
                <label className="label" htmlFor="dropoff_detail">Địa chỉ trả cụ thể</label>
                <input className="field" id="dropoff_detail" name="dropoff_detail" type="text"
                  defaultValue={booking.dropoff_address && !CITIES.includes(booking.dropoff_address) ? booking.dropoff_address : ''} />
              </div>
            </div>
            {/* Thời gian & dịch vụ */}
            <div className="form-grid">
              <div>
                <label className="label" htmlFor="departure_time">Ngày giờ khởi hành</label>
                <input className="field" id="departure_time" name="departure_time" type="datetime-local"
                  defaultValue={dateLocal(booking.departure_time)} required />
              </div>
              <div>
                <label className="label" htmlFor="service_type">Dịch vụ</label>
                <select className="field" id="service_type" name="service_type" defaultValue={booking.service_type}>
                  <option value="SHARED_RIDE">Đi ghép</option>
                  <option value="PRIVATE_CHARTER">Bao xe</option>
                </select>
              </div>
            </div>
            {/* Cao tốc tùy chọn */}
            {showHighway && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <input type="checkbox" name="is_highway" defaultChecked={booking.is_highway} />
                Đi cao tốc trên tuyến Hải Phòng ↔ Thái Nguyên (+100.000đ)
              </label>
            )}
            {error && <p className="error" role="alert">{error}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button className="btn primary" type="submit">Tiếp tục chọn xe</button>
              <Link className="btn secondary" to="/fares">Xem bảng giá</Link>
            </div>
          </form>

          <aside className="panel sticky-side">
            <h3>Các tuyến phục vụ</h3>
            {ROUTES.map(r => (
              <div className="route small" key={`${r.a}-${r.b}`}>{r.a} ↔ {r.b}</div>
            ))}
            <p className="small muted" style={{ marginTop: 12 }}>
              Hải Phòng ↔ Hà Nội và Hà Nội ↔ Hạ Long mặc định đi cao tốc.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
