import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { demoApiService } from '../services/demo.api';
import { calculateFare } from '../utils/fare';
import { dateView } from '../utils/format';
import { STATUS_LABELS, VEHICLE_LABELS, TRIP_TYPE_LABELS } from '../utils/constants';
import { useApp } from '../hooks/useApp';
import FareCard from '../components/common/FareCard';
import Modal from '../components/common/Modal';
import type { Booking } from '../types';

function Skeleton() {
  return (
    <div className="panel" role="status" aria-label="Đang tải dữ liệu">
      <div className="skeleton" style={{ width: '55%' }} />
      <div className="skeleton" />
      <div className="skeleton" style={{ width: '72%' }} />
    </div>
  );
}

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useApp();
  const [row, setRow] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [modal, setModal] = useState<{ title: string; body: string; onConfirm: () => Promise<void> } | null>(null);

  const money = (n: number | null) => n === null ? 'Liên hệ báo giá' : new Intl.NumberFormat('vi-VN').format(n) + 'đ';

  const [now] = useState(() => Date.now());
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setLoading(true);
    setLoadError('');
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    demoApiService
      .getBooking(id)
      .then((data) => {
        if (!ignore) {
          if (!data) {
            setLoadError('Không tìm thấy chuyến');
          } else {
            setRow(data);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setLoadError('Không tải được chi tiết chuyến');
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [id, reloadKey]);

  const eligible = useMemo(() => {
    if (!row) return false;
    return new Date(row.departure_time).getTime() - now >= 7_200_000;
  }, [row, now]);

  if (loading) return <section className="section"><div className="wrap"><Skeleton /></div></section>;
  if (loadError || !row) return (
    <section className="section">
      <div className="wrap panel">
        <h3>{loadError || 'Không tìm thấy chuyến'}</h3>
        {loadError === 'Không tìm thấy chuyến'
          ? <Link className="btn primary" to="/my-trips" style={{ marginTop: 20, display: 'inline-flex' }}>Về danh sách</Link>
          : <button className="btn primary" style={{ marginTop: 16 }} onClick={reload}>Thử lại</button>}
      </div>
    </section>
  );

  const canCancel = !['completed', 'cancelled', 'payment_failed'].includes(row.status);
  const fare = calculateFare({ ...row, seat_mode: row.service_type === 'SHARED_RIDE' && row.seat_count > 2 ? 'row' : 'one' });

  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Link className="btn ghost" to="/my-trips">← Danh sách chuyến</Link>
            <h1 style={{ marginTop: 16 }}>Chi tiết {row.id}</h1>
            <span className="badge">{STATUS_LABELS[row.status]}</span>
          </div>
        </div>

        <div className="layout" style={{ marginTop: 32 }}>
          <div className="panel space">
            <h3>{row.pickup_address} → {row.dropoff_address}</h3>
            <p>Khởi hành: <strong>{dateView(row.departure_time)}</strong></p>
            <p>Khách hàng: {row.customer_name} · {row.phone_number}</p>
            <p>Dịch vụ: {row.service_type === 'SHARED_RIDE' ? 'Đi ghép' : 'Bao xe'} · {VEHICLE_LABELS[row.vehicle_type]}</p>
            <p>
              {row.service_type === 'SHARED_RIDE'
                ? `${row.seat_count} ghế`
                : TRIP_TYPE_LABELS[row.trip_type ?? 'one_way']}
              {' · '}{row.is_highway ? 'Có cao tốc' : 'Không chọn cao tốc'}
            </p>
            <p>Ghi chú: {row.note || 'Không có'}</p>
            <p>Tài xế mẫu: {row.driver ?? 'Chưa điều phối'} · Biển số: {row.plate ?? 'Chưa có'}</p>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
              <h3>Tiến trình</h3>
              <p className="muted" style={{ marginTop: 12 }}>Đặt chuyến → Thanh toán → Điều phối → Đón khách → Hoàn thành</p>
              <p className="small" style={{ marginTop: 8 }}>Trạng thái hiện tại: {STATUS_LABELS[row.status]}</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {canCancel && eligible && (
                <button className="btn secondary" onClick={() => setModal({
                  title: 'Huỷ chuyến này?',
                  body: 'Thao tác sẽ chuyển chuyến sang trạng thái đã huỷ. Chỉ huỷ miễn phí khi còn ít nhất 2 giờ.',
                  onConfirm: async () => {
                    if (new Date(row.departure_time).getTime() - Date.now() < 7_200_000) {
                      showToast('Đã qua thời hạn huỷ miễn phí. Vui lòng gọi Hotline.');
                      return;
                    }
                    await demoApiService.cancelBooking(row.id);
                    row.status = 'cancelled';
                    setRow({ ...row });
                    showToast('Đã huỷ chuyến mô phỏng');
                  },
                })}>Huỷ chuyến miễn phí</button>
              )}
              {canCancel && !eligible && (
                <p className="small muted" style={{ width: '100%' }}>
                  Còn dưới 2 giờ đến giờ đi: không thể huỷ miễn phí tại đây. Vui lòng gọi Hotline để được hỗ trợ.
                </p>
              )}
              <button className="btn secondary" onClick={() => setModal({
                title: 'Yêu cầu đổi thông tin',
                body: 'Yêu cầu hỗ trợ thay đổi thông tin chuyến sẽ được ghi nhận trong phiên mô phỏng.',
                onConfirm: async () => { showToast('Đã ghi nhận yêu cầu đổi thông tin mô phỏng'); },
              })}>Yêu cầu đổi thông tin</button>
              <button className="btn secondary" onClick={() => setModal({
                title: 'Yêu cầu hoàn tiền',
                body: 'Yêu cầu hoàn tiền cần được hỗ trợ xác nhận; đây là thao tác mô phỏng.',
                onConfirm: async () => { row.refund = 'Đang xem xét'; setRow({ ...row }); showToast('Đã ghi nhận yêu cầu hoàn tiền mô phỏng'); },
              })}>Yêu cầu hoàn tiền</button>
              <button className="btn ghost" onClick={() => showToast(row.refund ? `Trạng thái hoàn tiền: ${row.refund}` : 'Chưa có yêu cầu hoàn tiền cho chuyến này')}>
                Xem trạng thái hoàn tiền
              </button>
            </div>

            {row.status === 'completed' && (
              <RatingForm onToast={showToast} />
            )}
          </div>

          <aside className="sticky-side">
            <FareCard fare={fare} />
            <p className="small muted" style={{ marginTop: 12 }}>
              Tạm tính tại thời điểm tạo chuyến: {money(row.estimated_fare)}.
            </p>
          </aside>
        </div>
      </div>

      {modal && (
        <Modal
          title={modal.title}
          body={modal.body}
          onConfirm={modal.onConfirm}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}

function RatingForm({ onToast }: { onToast: (m: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  if (done) return <p className="success">Đã ghi nhận đánh giá mô phỏng. Cảm ơn bạn!</p>;
  return (
    <form className="space" style={{ borderTop: '1px solid var(--line)', paddingTop: 20 }}
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const review = (fd.get('review') as string).trim();
        if (!review) { onToast('Vui lòng nhập nhận xét'); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setLoading(false);
        setDone(true);
        onToast('Đã ghi nhận đánh giá mô phỏng');
      }}>
      <h3>Đánh giá chuyến</h3>
      <div>
        <label className="label" htmlFor="stars">Số sao</label>
        <select className="field" id="stars" name="stars" defaultValue="5">
          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} sao</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="review">Nhận xét</label>
        <textarea className="field" id="review" name="review" required />
      </div>
      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? 'Đang gửi' : 'Gửi đánh giá'}
      </button>
    </form>
  );
}
