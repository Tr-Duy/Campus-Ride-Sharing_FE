
export default function StepGuideSection() {
  return (
    <section className="section">
        <div className="wrap">
          <h2>Lên xe chỉ trong ba bước.</h2>
          <div className="steps" style={{ marginTop: 40 }}>
            {[
              ['01', 'Chọn tuyến', 'Nhập điểm đón, điểm trả và giờ đi.'],
              ['02', 'Kiểm tra giá', 'Xem loại xe, phụ phí và tạm tính.'],
              ['03', 'Theo dõi chuyến', 'Xác nhận đặt xe và xem trạng thái điều phối mô phỏng.'],
            ].map(([num, title, desc]) => (
              <div key={num}>
                <span className="step-num">{num}</span>
                <h3>{title}</h3>
                <p className="muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
