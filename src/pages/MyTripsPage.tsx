import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { demoApiService } from '../services/demo.api';
import { dateView } from '../utils/format';
import { STATUS_LABELS } from '../utils/constants';
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

export default function MyTripsPage() {
  const [tripTab, setTripTab] = useState<'upcoming' | 'history'>('upcoming');
  const [tripFilter, setTripFilter] = useState('all');
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const money = (n: number | null) =>
    n === null ? 'Liên hệ báo giá' : new Intl.NumberFormat('vi-VN').format(n) + 'đ';

  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => {
    setLoading(true);
    setLoadError('');
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let ignore = false;
    demoApiService
      .listBookings()
      .then((data) => {
        if (!ignore) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setLoadError('Không thể tải chuyến');
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const HISTORY_STATUSES = ['completed', 'cancelled', 'payment_failed'];
  const filtered = items.filter((x) => {
    const isHistory = HISTORY_STATUSES.includes(x.status);
    const tabMatch = tripTab === 'history' ? isHistory : !isHistory;
    const filterMatch = tripFilter === 'all' || x.status === tripFilter;
    return tabMatch && filterMatch;
  });

  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1>Chuyến của tôi.</h1>
            <p className="muted" style={{ marginTop: 12 }}>Dữ liệu mẫu mô phỏng và chuyến vừa tạo trong phiên này.</p>
          </div>
          <Link className="btn primary" to="/book">Đặt chuyến mới</Link>
        </div>

        <div className="tabs" role="tablist" aria-label="Loại chuyến">
          <button type="button" role="tab" aria-selected={tripTab === 'upcoming'}
            onClick={() => { setTripTab('upcoming'); setTripFilter('all'); }}>Chuyến sắp tới</button>
          <button type="button" role="tab" aria-selected={tripTab === 'history'}
            onClick={() => { setTripTab('history'); setTripFilter('all'); }}>Lịch sử</button>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label className="label" htmlFor="trip-filter">Lọc trạng thái</label>
          <select className="field" id="trip-filter" style={{ maxWidth: 300 }} value={tripFilter}
            onChange={e => setTripFilter(e.target.value)}>
            <option value="all">Tất cả trạng thái</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{String(v)}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <Skeleton />
        ) : loadError ? (
          <div className="panel">
            <h3>Không thể tải chuyến</h3>
            <p className="muted">Vui lòng thử lại.</p>
            <button className="btn primary" style={{ marginTop: 16 }} onClick={reload}>Thử lại</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="panel" style={{ textAlign: 'center' }}>
            <div aria-hidden="true" style={{ fontSize: 55 }}>◇</div>
            <h3>Chưa có chuyến phù hợp</h3>
            <p className="muted" style={{ marginTop: 12 }}>Hãy đổi bộ lọc hoặc bắt đầu hành trình mới.</p>
            <Link className="btn primary" to="/book" style={{ marginTop: 20, display: 'inline-flex' }}>Đặt chuyến</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {filtered.map((x) => (
              <article className="panel" key={x.id}
                style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <span className="badge">{STATUS_LABELS[x.status]}</span>
                  <h3 style={{ marginTop: 12 }}>{x.pickup_address} → {x.dropoff_address}</h3>
                  <p className="small muted" style={{ marginTop: 8 }}>{dateView(x.departure_time)} · {x.id}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>{money(x.estimated_fare)}</strong>
                  <div style={{ marginTop: 16 }}>
                    <a className="btn secondary" href={`/my-trips/${encodeURIComponent(x.id)}`}>Xem chi tiết</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
