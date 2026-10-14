import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '../components/layout/AuthLayout'
import { ForgotPasswordPage, LoginPage, RegisterPage } from '../features/auth/pages'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" replace /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '*', element: <Navigate to="/login" replace /> },
    ],
  },
])
