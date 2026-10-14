import { Link } from 'react-router-dom';
import Stepper from './BookingStepper';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { calculateFare, getRoute } from '../../utils/fare';
import { VEHICLES, TRIP_TYPE_LABELS, STATUS_LABELS } from '../../utils/constants';
import { validPhone, dateView } from '../../utils/format';
import { demoApiService } from '../../services/demo.api';
import FareCard from '../../components/common/FareCard';
import MapSVG from '../../components/common/MapSVG';
import type { SeatMode, TripType, VehicleType } from '../../types';

// ── Step 2: Chi tiết ─────────────────────────────────────
export function DetailsStep() {
  const navigate = useNavigate();
  const { booking, setBooking } = useApp();
  const [error, setError] = useState('');

  if (!getRoute(booking.pickup_address, booking.dropoff_address)) {
    return <MissingBooking />;
  }

  const fare = calculateFare(booking);
  const max = booking.vehicle_type === '7_SEATER' ? 6 : 4;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'vehicle_type') {
      setBooking({ vehicle_type: value as VehicleType });
    } else if (name === 'seat_mode') {
      const mode = value as SeatMode;
      const newMax = booking.vehicle_type === '7_SEATER' ? 6 : 4;
      setBooking({ seat_mode: mode, seat_count: mode === 'row' ? newMax : mode === 'two' ? 2 : 1 });
    } else if (name === 'trip_type') {
      setBooking({ trip_type: value as TripType, durationHours: value === 'hourly_12h' ? 12 : 8 });
    } else if (name === 'durationHours') {
      setBooking({ durationHours: Number(value) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const f = calculateFare(booking);
    if (!f.supported) { setError(f.message ?? ''); return; }
    navigate('/book/confirm');
  };

  return (
    <section className="section">
      <div className="wrap">
        <Stepper active={1} />
        <h1>Đi theo cách của bạn.</h1>
        <div className="layout" style={{ marginTop: 32 }}>
          <form className="panel space" onSubmit={handleSubmit}>
            <p className="pill">{booking.pickup_address} ↔ {booking.dropoff_address}</p>
            <div>
              <label className="label" htmlFor="vehicle_type">Loại xe</label>
              <select className="field" id="vehicle_type" name="vehicle_type"
                value={booking.vehicle_type} onChange={handleChange}>
                <option value="5_SEATER">Xe 5 chỗ</option>
                <option value="7_SEATER">Xe 7 chỗ</option>
              </select>
            </div>

            {booking.service_type === 'SHARED_RIDE' ? (
              <fieldset style={{ border: 'none', padding: 0 }}>
                <legend className="label">Số lượng ghế</legend>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {[['one', '1 ghế'], ['two', '2 ghế'], ['row', `Bao hàng ghế (${max} ghế)`]].map(([v, t]) => (
                    <label key={v} className="btn secondary">
                      <input type="radio" name="seat_mode" value={v}
                        checked={booking.seat_mode === v}
                        onChange={handleChange} /> {t}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <>
                <div>
                  <label className="label" htmlFor="trip_type">Loại chuyến</label>
                  <select className="field" id="trip_type" name="trip_type"
                    value={booking.trip_type} onChange={handleChange}>
                    {Object.entries(TRIP_TYPE_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
                {booking.trip_type.startsWith('hourly') && (
                  <div>
                    <label className="label" htmlFor="durationHours">Tổng thời gian sử dụng dự kiến (giờ)</label>
                    <input className="field" id="durationHours" name="durationHours" type="number"
                      value={booking.durationHours} min="0" step="0.5" onChange={handleChange} />
                    <p className="small muted" style={{ marginTop: 8 }}>
                      Chỉ tính phụ phí cho thời gian vượt 8 hoặc 12 giờ. Giá gốc thuê theo giờ cần liên hệ báo giá.
                    </p>
                  </div>
                )}
              </>
            )}

            {error && <p className="error" role="alert">{error}</p>}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn secondary" to="/book">Quay lại tuyến</Link>
              <button className="btn primary" type="submit">Tiếp tục xác nhận</button>
            </div>
          </form>

          <aside className="sticky-side">
            <FareCard fare={fare} />
          </aside>
        </div>
      </div>
    </section>
  );
}

// ── Step 3: Xác nhận ─────────────────────────────────────
export function ConfirmStep() {
  const navigate = useNavigate();
  const { booking, bookings, setBookings, setBooking, setCurrentId, showToast } = useApp();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!getRoute(booking.pickup_address, booking.dropoff_address) || !booking.departure_time) {
    return <MissingBooking />;
  }

  const fare = calculateFare(booking);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get('customer_name') as string).trim();
    const phone = (fd.get('phone_number') as string).trim();
    const note = (fd.get('note') as string).trim();

    if (name.length < 2) { setError('Vui lòng nhập họ tên có ít nhất 2 ký tự'); return; }
    if (!validPhone(phone)) { setError('Số điện thoại phải có 10 chữ số và bắt đầu bằng 0'); return; }
    if (!fare.supported) { setError(fare.message ?? ''); return; }

    setBooking({ customer_name: name, phone_number: phone, note });
    setLoading(true);
    try {
      const payload = {
        customer_name: name,
        phone_number: phone,
        service_type: booking.service_type,
        vehicle_type: booking.vehicle_type,
        seat_count: booking.service_type === 'SHARED_RIDE' ? booking.seat_count : 0,
        seat_mode: booking.seat_mode,
        pickup_address: booking.pickup_address,
        dropoff_address: booking.dropoff_address,
        departure_time: new Date(booking.departure_time).toISOString(),
        is_highway: booking.is_highway,
        estimated_fare: fare.total,
        note,
        trip_type: booking.trip_type,
        durationHours: booking.durationHours,
      };
      const row = await demoApiService.createBooking(payload);
      setBookings([row, ...bookings]);
      setCurrentId(row.id);
      showToast('Đã tạo chuyến mô phỏng');
      navigate('/book/payment');
    } catch (ex: unknown) {
      setError((ex instanceof Error ? ex.message : "Unexpected error. Please retry."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="wrap">
        <Stepper active={2} />
        <h1>Kiểm tra trước khi đi.</h1>
        <div className="layout" style={{ marginTop: 32 }}>
          <form id="confirm-form" className="panel space" onSubmit={handleSubmit} noValidate>
            <h3>Thông tin liên hệ</h3>
            <div><label className="label" htmlFor="customer_name">Họ và tên</label>
              <input className="field" id="customer_name" name="customer_name" defaultValue={booking.customer_name} required /></div>
            <div><label className="label" htmlFor="phone_number">Số điện thoại</label>
              <input className="field" id="phone_number" name="phone_number" type="tel" defaultValue={booking.phone_number} required /></div>
            <div><label className="label" htmlFor="note">Ghi chú (không bắt buộc)</label>
              <textarea className="field" id="note" name="note" defaultValue={booking.note} /></div>
            {error && <p className="error" role="alert">{error}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Link className="btn secondary" to="/book/details">Chỉnh sửa chuyến</Link>
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? 'Đang tạo chuyến' : 'Xác nhận đặt chuyến'}
              </button>
            </div>
          </form>

          <aside className="sticky-side space">
            <div className="panel">
              <h3>Tóm tắt chuyến</h3>
              <p style={{ marginTop: 12 }}><strong>{booking.pickup_address}</strong> → <strong>{booking.dropoff_address}</strong></p>
              <p className="muted small" style={{ marginTop: 12 }}>
                {dateView(booking.departure_time)} · {booking.service_type === 'SHARED_RIDE' ? 'Đi ghép' : 'Bao xe'} · {VEHICLES[booking.vehicle_type]}
              </p>
              <p className="muted small" style={{ marginTop: 8 }}>
                {booking.service_type === 'SHARED_RIDE'
                  ? (booking.seat_mode === 'row' ? 'Bao hàng ghế' : booking.seat_count + ' ghế')
                  : TRIP_TYPE_LABELS[booking.trip_type]}
                {' · '}{booking.is_highway ? 'Có cao tốc' : 'Không chọn cao tốc'}
              </p>
            </div>
            <FareCard fare={fare} />
          </aside>
        </div>
      </div>
    </section>
  );
}

// ── Step 4: Thanh toán ────────────────────────────────────
export function PaymentStep() {
  const navigate = useNavigate();
  const { currentId, bookings, showToast, updateBookingStatus } = useApp();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const row = bookings.find(x => x.id === currentId);
  const money = (n: number | null) => n === null ? 'Liên hệ để báo giá' : new Intl.NumberFormat('vi-VN').format(n) + 'đ';

  if (!row) return <MissingBooking />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (row.estimated_fare === null) {
      setError('Giá gốc chưa được xác nhận. Vui lòng liên hệ Hotline để được báo giá trước khi thanh toán.');
      return;
    }
    setLoading(true);
    try {
      await demoApiService.payment({ booking_id: row.id, payment_method: 'VNPAY', amount: row.estimated_fare });
      navigate('/book/payment-result?status=success');
    } catch (ex: unknown) {
      updateBookingStatus(row.id, 'payment_failed');
      setError((ex instanceof Error ? ex.message : "Unexpected error. Please retry."));
      showToast('Thanh toán chưa thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="wrap">
        <Stepper active={3} />
        <div className="panel" style={{ maxWidth: 672, margin: '0 auto' }}>
          <h1>Thanh toán chuyến đi.</h1>
          <p className="muted" style={{ marginTop: 16 }}>Cổng thanh toán bên dưới là mô phỏng. Không nhập thông tin thẻ hoặc chuyển tiền thật.</p>
          <div className="fare-row" style={{ marginTop: 24 }}><span>Mã chuyến</span><strong>{row.id}</strong></div>
          <div className="fare-row"><span>Số tiền tạm tính</span><strong>{money(row.estimated_fare)}</strong></div>
          <form className="space" style={{ marginTop: 24 }} onSubmit={handleSubmit}>
            <div>
              <label className="label" htmlFor="payment_method">Phương thức thanh toán</label>
              <select className="field" id="payment_method" name="payment_method">
                <option value="VNPAY">VNPAY (mô phỏng)</option>
              </select>
            </div>
            {error && <p className="error" role="alert">{error}</p>}
            <button className="btn primary" type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Đang chuyển cổng mô phỏng' : 'Thanh toán mô phỏng'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Step 5: Kết quả ───────────────────────────────────────
export function PaymentResult() {
  const { currentId, bookings } = useApp();
  const success = !new URLSearchParams(location.search).get('status')?.includes('failed');
  const row = bookings.find(x => x.id === currentId);
  const money = (n: number | null) => n === null ? 'liên hệ báo giá' : new Intl.NumberFormat('vi-VN').format(n) + 'đ';

  return (
    <section className="section">
      <div className="wrap">
        <Stepper active={4} />
        <div className="panel" style={{ maxWidth: 672, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 68 }} aria-hidden="true">{success ? '✓' : '!'}</div>
          <h1>{success ? 'Đã ghi nhận thanh toán mô phỏng' : 'Thanh toán chưa thành công'}</h1>
          <p className="muted" style={{ marginTop: 20 }}>
            {success
              ? `Mã chuyến ${row?.id ?? 'chưa có'} · Tạm tính ${money(row?.estimated_fare ?? null)}. Chuyến đang chuyển sang điều phối mô phỏng.`
              : 'Bạn chưa bị trừ tiền. Có thể thử lại hoặc chọn lại phương thức thanh toán mô phỏng.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
            {success ? (
              <>
                <Link className="btn primary" to="/book/matching">Theo dõi chuyến</Link>
                <Link className="btn secondary" to="/my-trips">Xem chuyến của tôi</Link>
              </>
            ) : (
              <>
                <Link className="btn primary" to="/book/payment">Thử thanh toán lại</Link>
                <Link className="btn secondary" to="/book/payment">Đổi phương thức</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Matching ──────────────────────────────────────────────
export function MatchingPage() {
  const { currentId, bookings, updateBookingStatus } = useApp();
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');
  const row = bookings.find(x => x.id === currentId);

  useEffect(() => {
    const t = setTimeout(() => {
      setStatus(row ? 'done' : 'error');
    }, 900);
    return () => clearTimeout(t);
  }, [row]);

  useEffect(() => {
    if (row?.id && row.status === 'matching') {
      const t = setTimeout(() => {
        updateBookingStatus(row.id, 'accepted');
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [row?.id, row?.status, updateBookingStatus]);

  return (
    <section className="section">
      <div className="wrap">
        <h1>Theo dõi điều phối.</h1>
        <p className="muted" style={{ marginTop: 12 }}>Thông tin tài xế và vị trí là dữ liệu mẫu mô phỏng.</p>
        {status === 'loading' ? (
          <div style={{ marginTop: 32 }}>
            <div className="panel" role="status" aria-label="Đang tải"><div className="skeleton" /><div className="skeleton" /></div>
          </div>
        ) : status === 'error' || !row ? (
          <div className="panel" style={{ marginTop: 32 }}>
            <h3>Không tải được trạng thái điều phối</h3>
            <button className="btn primary" style={{ marginTop: 16 }} onClick={() => setStatus('loading')}>Thử lại</button>
          </div>
        ) : (
          <div className="layout" style={{ marginTop: 32 }}>
            <div className="panel">
              <MapSVG />
              <p className="pill" style={{ marginTop: 16 }}>{STATUS_LABELS[row.status]}</p>
              <p className="muted small" style={{ marginTop: 16 }}>Minh hoạ vị trí xe di chuyển, không phải định vị thực tế.</p>
            </div>
            <div className="panel space">
              <h3>{STATUS_LABELS[row.status]}</h3>
              <p>Tài xế mẫu: <strong>{row.driver ?? 'Đang điều phối'}</strong></p>
              <p>Biển số mẫu: <strong>{row.plate ?? 'Chưa có'}</strong></p>
              <p>Thời gian đến dự kiến: <strong>Đang cập nhật</strong></p>
              <p>Điện thoại tài xế mẫu: <a href="tel:0912345678" className="success">0912 345 678</a></p>
              <a className="btn primary" href={`/my-trips/${encodeURIComponent(row.id)}`}>Chi tiết chuyến</a>
              <a className="btn secondary" href="tel:1900636636">Gọi 1900 636 636</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function MissingBooking() {
  return (
    <section className="section">
      <div className="wrap panel" style={{ textAlign: 'center' }}>
        <h1>Chưa có chuyến đang đặt.</h1>
        <p className="muted" style={{ marginTop: 16 }}>Hãy chọn tuyến và giờ khởi hành để tiếp tục.</p>
        <Link className="btn primary" to="/book" style={{ marginTop: 24, display: 'inline-flex' }}>Bắt đầu đặt xe</Link>
      </div>
    </section>
  );
}
