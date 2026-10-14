import { useState } from 'react';
import { ROUTES } from '../utils/constants';

export default function FaresPage() {
  const [fareTab, setFareTab] = useState<'SHARED_RIDE' | 'PRIVATE_CHARTER'>('SHARED_RIDE');
  const [fareFilter, setFareFilter] = useState<string>('all');

  const TRIP_TYPE_LABELS: Record<string, string> = {
    one_way: 'Một chiều',
    round_trip: 'Hai chiều',
    hourly_8h: 'Thuê 8 tiếng',
    hourly_12h: 'Thuê 12 tiếng',
  };
  const money = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

  const FAR_AREAS = ['Lập Lễ','Tam Hưng','Minh Đức','Lưu Kiếm','Đồ Sơn','KCN Nam Đình Vũ','Kiến Thụy','Tiên Lãng','Cát Hải','Phà Đồng Bài'];

  const filteredRoutes = ROUTES.filter((_, i) => fareFilter === 'all' || fareFilter === String(i));

  return (
    <section className="section cd-fares">
      <div className="wrap">
        <h1>Bảng giá rõ từng tuyến.</h1>
        <p className="muted" style={{ marginTop: 16 }}>
          Tất cả số tiền là giá "từ". Giá cuối cùng do hệ thống xác nhận khi điều phối.
        </p>

        <div className="tabs" role="tablist" aria-label="Loại dịch vụ">
          <button type="button" data-fare-tab="SHARED_RIDE" aria-selected={fareTab === 'SHARED_RIDE'}
            onClick={() => setFareTab('SHARED_RIDE')}>Đi ghép</button>
          <button type="button" data-fare-tab="PRIVATE_CHARTER" aria-selected={fareTab === 'PRIVATE_CHARTER'}
            onClick={() => setFareTab('PRIVATE_CHARTER')}>Bao xe</button>
        </div>

        <div style={{ marginBottom: 32 }}>
          <label className="label" htmlFor="fare-filter">Chọn tuyến</label>
          <select className="field" id="fare-filter" style={{ maxWidth: 440 }} value={fareFilter}
            onChange={e => setFareFilter(e.target.value)}>
            <option value="all">Tất cả tuyến</option>
            {ROUTES.map((r, i) => (
              <option key={i} value={String(i)}>{r.a} ↔ {r.b}</option>
            ))}
          </select>
        </div>

        <div id="fare-list">
          {filteredRoutes.map((r, i) => (
            <article className="panel" key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <h3>{r.a} ↔ {r.b}</h3>
                {r.highway && <span className="pill">Mặc định đi cao tốc</span>}
                {r.optionalHighway && <span className="pill">Có thể chọn cao tốc +100.000đ</span>}
              </div>

              {fareTab === 'SHARED_RIDE' ? (
                Object.entries(r.shared).map(([key, prices]) => (
                  <div className="fare-row" key={key}>
                    <span>{{ one: '1 ghế', two: '2 ghế', row: 'Bao hàng ghế' }[key]}</span>
                    <strong>{(prices as number[]).map(x => 'từ ' + money(x)).join(' · ')}</strong>
                  </div>
                ))
              ) : (
                <>
                  {Object.entries(r.private).map(([key, prices]) => (
                    <div className="fare-row" key={key}>
                      <span>{TRIP_TYPE_LABELS[key]} · Xe 5 chỗ</span>
                      <strong>{(prices as number[]).map(x => 'từ ' + money(x)).join(' · ')}</strong>
                    </div>
                  ))}
                  <div className="fare-row">
                    <span>Xe 7 chỗ</span>
                    <strong>Cộng 100.000đ</strong>
                  </div>
                  <div className="fare-row">
                    <span>Thuê theo thời gian 8 hoặc 12 tiếng</span>
                    <strong>Liên hệ để báo giá</strong>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <a className="btn secondary" style={{ fontSize: 13 }} href="tel:1900636636">Gọi 1900 636 636</a>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>

        <div className="panel" style={{ marginTop: 32, background: '#efe6dc', borderColor: '#dfcfc0', boxShadow: 'none' }}>
          <h3>Phụ phí cần biết</h3>
          <p style={{ marginTop: 12 }}>
            Xe 7 chỗ khi bao xe: +100.000đ. Vùng đón xa Hải Phòng: đi ghép +50.000đ, bao xe +100.000đ.
            Tuyến Hải Phòng ↔ Thái Nguyên chọn cao tốc: +100.000đ.
          </p>
          <p style={{ marginTop: 12 }}>
            Vượt giờ bao xe: xe 5 chỗ 100.000đ/giờ, xe 7 chỗ 150.000đ/giờ; làm tròn theo block 30 phút.
          </p>
          <p className="small muted" style={{ marginTop: 12 }}>
            Vùng đón xa: {FAR_AREAS.join(', ')}. Hải Phòng ↔ Hà Nội và Hà Nội ↔ Hạ Long mặc định đi cao tốc.
          </p>
        </div>
      </div>
    </section>
  );
}
