import type { FareResult } from '../../types';
import { money } from '../../utils/format';
import { HOTLINE, ZALO_PHONE } from '../../utils/constants';

interface Props {
  fare: FareResult;
}

function PhoneLinks() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
      <a className="btn secondary" href={`tel:${HOTLINE.replace(/\s/g, '')}`}>Gọi {HOTLINE}</a>
      <a className="btn ghost" href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer">
        Nhắn Zalo {ZALO_PHONE}
      </a>
    </div>
  );
}

export default function FareCard({ fare }: Props) {
  if (!fare.supported) {
    return (
      <div className="panel">
        <h3>{fare.message}</h3>
        <p className="muted small">Các tuyến có thể đặt: {fare.suggestions?.join('; ')}.</p>
        <PhoneLinks />
      </div>
    );
  }

  return (
    <div className="panel">
      <h3>Chi tiết giá cước</h3>
      <p className="pill" style={{ marginTop: 12 }}>{fare.priceRangeLabel}</p>
      <div style={{ marginTop: 16 }}>
        {fare.breakdown.map((x, i) => (
          <div className="fare-row" key={i}>
            <span>{x.label}</span>
            <strong>{x.amount === null ? 'Liên hệ để báo giá' : money(x.amount)}</strong>
          </div>
        ))}
        <div className="fare-row">
          <strong>Tạm tính</strong>
          <strong className="success">
            {fare.total === null ? 'Liên hệ để báo giá' : money(fare.total)}
          </strong>
        </div>
      </div>
      {fare.notes && <p className="small muted" style={{ marginTop: 12 }}>{fare.notes}</p>}
      {fare.isContactRequired && (
        <>
          <p className="small muted">
            Phụ phí vượt giờ: 100.000đ/giờ cho xe 5 chỗ, 150.000đ/giờ cho xe 7 chỗ; làm tròn theo từng 30 phút.
          </p>
          <PhoneLinks />
        </>
      )}
    </div>
  );
}
