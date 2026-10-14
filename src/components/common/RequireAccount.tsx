import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../../hooks/useApp'
export default function RequireAccount() {
  const { user } = useApp()
  const location = useLocation()
  return user ? <Outlet /> : <Navigate to={'/login?returnTo=' + encodeURIComponent(location.pathname + location.search)} replace />
}
