import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { getApiErrorMessage } from '../../../lib/axios'
import { AuthHeading } from './shared'
import { FormMessage, PasswordField, ProviderButtons, Field } from '../components/AuthForm'
import { loginSchema, type LoginValues } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'

export function LoginPage() {
  const [message, setMessage] = useState<{ text: string; tone: 'error' | 'info' } | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })
  const onSubmit = async (values: LoginValues) => {
    setMessage(null)
    try {
      await authService.login(values)
      setMessage({ text: 'Máy chủ đã xác nhận đăng nhập.', tone: 'info' })
    } catch (error) { setMessage({ text: getApiErrorMessage(error), tone: 'error' }) }
  }
  return <>
    <AuthHeading eyebrow="TÀI KHOẢN / ĐĂNG NHẬP" title="Chào mừng trở lại" description="Đăng nhập để tiếp tục chuyến đi của bạn." />
    <ProviderButtons onUnavailable={() => setMessage({ text: 'Đăng nhập Google/Facebook chưa được cấu hình.', tone: 'info' })} />
    <div className="form-divider"><span>hoặc dùng email</span></div>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Email hoặc số điện thoại" name="identifier" placeholder="ban@example.com" autoComplete="username" error={errors.identifier?.message} registration={register('identifier')} />
      <PasswordField label="Mật khẩu" name="password" placeholder="Nhập mật khẩu" autoComplete="current-password" error={errors.password?.message} registration={register('password')} />
      <div className="login-options"><label className="checkbox-label"><input type="checkbox" /> <span>Ghi nhớ đăng nhập</span></label><Link to={routes.forgotPassword}>Quên mật khẩu?</Link></div>
      {message && <FormMessage tone={message.tone}>{message.text}</FormMessage>}
      <button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Đang gửi…' : 'Đăng nhập'}</button>
    </form>
    <p className="form-switch">Chưa có tài khoản? <Link to={routes.register}>Đăng ký</Link></p>
  </>
}
