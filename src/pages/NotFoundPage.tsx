import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return <section className="section wrap"><h1>404 — Không tìm thấy trang</h1><p>Đường dẫn này không tồn tại.</p><Link className="btn primary" to="/">Về trang chủ</Link></section>
}
