export default function Stepper({ active }: { active: number }) {
  const steps = ['Tuyến đường', 'Chi tiết', 'Xác nhận', 'Thanh toán', 'Kết quả'];
  return (
    <nav className="stepper" aria-label="Tiến trình đặt xe">
      {steps.map((t, i) => (
        <span key={t} className={i === active ? 'active' : ''} aria-current={i === active ? 'step' : undefined}>
          {i + 1}. {t}
        </span>
      ))}
    </nav>
  );
}
