import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Toast from '../common/Toast'
import FloatingSupport from '../common/FloatingSupport'
import { usePageMetadata } from '../../hooks/usePageMetadata'
export default function SiteLayout() {
  usePageMetadata()
  return <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <p className="demo-notice" role="note">Bản demo: giá cước, chuyến xe và thanh toán được mô phỏng; không tạo đơn đặt xe thật.</p>
    <main style={{ flex: 1 }}><Outlet /></main><Footer /><Toast />
    <FloatingSupport />
  </div>
}
