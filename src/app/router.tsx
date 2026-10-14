import { HomePage, FaresPage, PoliciesPage, MyTripsPage, TripDetailPage, DemoAuthPage, NotFoundPage, BookStep, LoginPage, RegisterPage, ForgotPasswordPage, DetailsStep, ConfirmStep, PaymentStep, PaymentResult, MatchingPage } from './RoutePages'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AuthShell as AuthLayout } from '../features/auth/components/AuthShell'
import SiteLayout from '../components/layout/SiteLayout'
import RequireAccount from '../components/common/RequireAccount'
export const router = createBrowserRouter([
  { element: <Suspense fallback={<p role="status">Đang tải…</p>}><AuthLayout /></Suspense>, children: [
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
  ] },
  { element: <Suspense fallback={<p role="status">Đang tải…</p>}><SiteLayout /></Suspense>, children: [
    { path: '/', element: <HomePage /> },
    { path: '/fares', element: <FaresPage /> },
    { path: '/policies', element: <PoliciesPage /> },
    { path: '/demo/login', element: <DemoAuthPage path="/login" /> },
    { path: '/verify-account', element: <DemoAuthPage path="/verify-account" /> },
    { path: '/reset-password', element: <DemoAuthPage path="/reset-password" /> },
    { element: <RequireAccount />, children: [
      { path: '/account', element: <DemoAuthPage path="/account" /> },
      { path: '/book', element: <BookStep /> },
      { path: '/book/details', element: <DetailsStep /> },
      { path: '/book/confirm', element: <ConfirmStep /> },
      { path: '/book/payment', element: <PaymentStep /> },
      { path: '/book/payment-result', element: <PaymentResult /> },
      { path: '/book/matching', element: <MatchingPage /> },
      { path: '/my-trips', element: <MyTripsPage /> },
      { path: '/my-trips/:id', element: <TripDetailPage /> },
    ] },
    { path: '*', element: <NotFoundPage /> },
  ] },
])
