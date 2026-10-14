import { MapPin, Navigation, Route } from 'lucide-react';
import AnimatedVisual from '../common/AnimatedVisual';

export default function JourneyPreview() {
  return (
    <AnimatedVisual className="journey-preview" label="hành trình">
      <div className="journey-preview-heading"><span className="journey-preview-icon"><Route size={21} aria-hidden="true" /></span><div><span className="journey-preview-eyebrow">MỖI CHẶNG ĐƯỜNG, MỘT KẾT NỐI</span><h3>Hành trình trong tầm tay</h3></div></div>
      <div className="journey-preview-map">
        <svg viewBox="0 0 520 300" role="img" aria-label="Minh họa tuyến đường giữa Hải Phòng và Hà Nội, với xe di chuyển trên tuyến">
          <rect width="520" height="300" fill="#ece8dd" />
          <path d="M350-20c-60 68-37 124-84 167s-39 86-25 163" stroke="#a7c6c2" strokeWidth="48" fill="none" />
          <g fill="#d7dec6"><rect x="18" y="15" width="92" height="58" rx="15" /><rect x="384" y="190" width="110" height="85" rx="20" /><rect x="143" y="125" width="62" height="47" rx="12" /></g>
          <g stroke="#fffaf1" strokeWidth="14" fill="none"><path d="M-10 95h540M-10 203h540M123-10v320M407-10v320M-10 278 530 24" /><path d="M32-10v320M-10 35h540M-10 251h540" strokeWidth="7" /></g>
          <g fill="#d2ccbc"><rect x="47" y="116" width="47" height="32" rx="5" /><rect x="48" y="158" width="47" height="25" rx="5" /><rect x="150" y="24" width="57" height="43" rx="5" /><rect x="429" y="119" width="48" height="25" rx="5" /><rect x="433" y="153" width="44" height="31" rx="5" /><rect x="163" y="225" width="35" height="38" rx="5" /></g>
          <path d="M85 224C130 224 131 167 178 167H330C372 167 354 76 430 76" stroke="#fffaf1" strokeWidth="16" fill="none" strokeLinecap="round" />
          <path d="M85 224C130 224 131 167 178 167H330C372 167 354 76 430 76" stroke="#a44c2d" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path className="journey-preview-route" d="M85 224C130 224 131 167 178 167H330C372 167 354 76 430 76" stroke="#f4c69e" strokeWidth="3" strokeDasharray="3 12" fill="none" />
          <circle className="journey-preview-pulse" cx="85" cy="224" r="18" fill="#a44c2d" opacity=".16" />
          <circle cx="85" cy="224" r="8" fill="#a44c2d" stroke="#fffaf1" strokeWidth="4" />
          <circle cx="430" cy="76" r="10" fill="#436751" stroke="#fffaf1" strokeWidth="4" />
          <g className="journey-preview-car"><rect x="-19" y="-11" width="38" height="22" rx="7" fill="#983b1c" stroke="#fffaf1" strokeWidth="3" /><rect x="-7" y="-7" width="16" height="14" rx="3" fill="#e7ddca" /><path d="M-12-11v-3M12-11v-3M-12 11v3M12 11v3" stroke="#343f37" strokeWidth="3" /></g>
        </svg>
        <div className="journey-map-label journey-map-label-start">Hải Phòng</div><div className="journey-map-label journey-map-label-end">Hà Nội</div>
        <span className="journey-map-note">Tuyến minh họa</span>
      </div>
      <div className="journey-preview-stops">
        <div><MapPin size={18} aria-hidden="true" /><span><small>ĐIỂM ĐÓN</small><strong>Hải Phòng</strong></span></div>
        <span className="journey-stop-connector" aria-hidden="true" />
        <div><Navigation size={18} aria-hidden="true" /><span><small>ĐIỂM ĐẾN</small><strong>Hà Nội</strong></span></div>
      </div>
      <p className="journey-preview-note">Chọn tuyến · Xem giá · Theo dõi chuyến demo</p>
    </AnimatedVisual>
  );
}
