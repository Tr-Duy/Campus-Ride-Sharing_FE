import { HOTLINE, ZALO_PHONE } from '../utils/constants';

const FAQ_ITEMS = [
  ['Khi nào tôi có thể huỷ chuyến miễn phí?', 'Bạn có thể yêu cầu huỷ miễn phí khi còn ít nhất 2 giờ trước giờ khởi hành. Nếu còn dưới 2 giờ, hãy gọi Hotline để được hỗ trợ.'],
  ['Giá đã gồm mọi phụ phí chưa?', 'Bảng tạm tính hiển thị riêng phụ phí vùng đón xa, xe 7 chỗ khi bao xe, cao tốc tùy chọn và vượt giờ nếu có. Giá cuối cùng do hệ thống xác nhận khi điều phối.'],
  ['Tôi có thể đặt xe trước bao lâu?', 'Bạn có thể chọn bất kỳ ngày giờ tương lai trong biểu mẫu. Tình trạng nhận chuyến cần được xác nhận khi điều phối.'],
  ['Bao xe theo giờ tính thế nào?', 'Giá gốc gói 8 hoặc 12 tiếng cần liên hệ để báo giá. Phần vượt giờ làm tròn từng block 30 phút theo loại xe.'],
  ['Nếu để quên đồ trên xe?', 'Hãy liên hệ Hotline và cung cấp mã chuyến để được hỗ trợ liên hệ tài xế.'],
  ['Làm sao yêu cầu hoàn tiền?', 'Mở chi tiết chuyến của bạn và chọn Yêu cầu hoàn tiền. Yêu cầu sẽ được ghi nhận trong bản mô phỏng; điều kiện thực tế cần được xác nhận với CSKH.'],
  ['Tuyến nào đi cao tốc?', 'Hải Phòng ↔ Hà Nội và Hà Nội ↔ Hạ Long mặc định đi cao tốc. Hải Phòng ↔ Thái Nguyên có thể chọn cao tốc với phụ phí 100.000đ.'],
];

export default function PoliciesPage() {
  return (
    <section className="section cd-policies">
      <div className="wrap split">
        <div>
          <h1>Yên tâm từ trước lúc lên xe.</h1>
          <p className="muted" style={{ marginTop: 16 }}>
            Chính sách áp dụng cho trải nghiệm đặt xe mô phỏng trên trang.
          </p>
        </div>
        <div className="panel">
          <h3>Huỷ chuyến</h3>
          <p style={{ marginTop: 16 }}>
            Miễn phí khi thời điểm huỷ cách giờ khởi hành từ 2 tiếng trở lên.
            Dưới 2 tiếng, vui lòng gọi Hotline để được hỗ trợ.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            <a className="btn secondary" href={`tel:${HOTLINE.replace(/\s/g, '')}`}>Gọi {HOTLINE}</a>
            <a className="btn ghost" href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer">
              Nhắn Zalo {ZALO_PHONE}
            </a>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 48 }}>
        <h2>Câu hỏi thường gặp</h2>
        <div style={{ marginTop: 24 }}>
          {FAQ_ITEMS.map(([q, a]) => (
            <details className="panel" key={q} style={{ marginBottom: 12 }}>
              <summary style={{ fontWeight: 600 }}>{q}</summary>
              <p className="muted" style={{ marginTop: 16 }}>{a}</p>
            </details>
          ))}
        </div>

        <div id="terms" className="panel" style={{ marginTop: 40 }}>
          <h2>Điều khoản và hỗ trợ</h2>
          <p style={{ marginTop: 16 }}>
            Thông tin tuyến, giá và liên hệ trên trang là dữ liệu mẫu mô phỏng.
            Yêu cầu đổi thông tin, hoàn tiền hoặc báo đồ thất lạc cần được hỗ trợ và xác nhận trực tiếp.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
            <a className="btn secondary" href={`tel:${HOTLINE.replace(/\s/g, '')}`}>Gọi {HOTLINE}</a>
            <a className="btn ghost" href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer">
              Nhắn Zalo {ZALO_PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
