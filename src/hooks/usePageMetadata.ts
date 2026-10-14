import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pages: Record<string, string> = {
  '/': 'Đặt xe liên tỉnh',
  '/fares': 'Giá cước tham khảo',
  '/policies': 'Chính sách và câu hỏi thường gặp',
  '/login': 'Đăng nhập',
  '/register': 'Đăng ký',
  '/forgot-password': 'Quên mật khẩu',
}

export function usePageMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const title = pages[pathname] ?? (pathname.startsWith('/book') ? 'Đặt xe demo' : 'Tài khoản và chuyến xe demo')
    document.title = `${title} | Cung Đường`
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = `${title} — giao diện Cung Đường. Giá cước và đặt xe đang được mô phỏng.`
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.append(robots)
    }
    // The merged app is a demo until API and legal content are approved.
    robots.content = 'noindex, nofollow'
  }, [pathname])
}
