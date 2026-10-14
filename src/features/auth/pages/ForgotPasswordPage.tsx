import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { getApiErrorMessage } from '../../../lib/axios'
import { Field, FormMessage } from '../components/AuthForm'
import { forgotPasswordSchema, type ForgotPasswordValues } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'
import { AuthHeading } from './shared'

export function ForgotPasswordPage() {
  const [message, setMessage] = useState<{ text: string; tone: 'error' | 'success' } | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) })
  const onSubmit = async (values: ForgotPasswordValues) => {
    setMessage(null)
    try {
      await authService.requestPasswordReset(values)
      setMessage({ text: 'Nếu thông tin phù hợp, bạn sẽ nhận được hướng dẫn qua email.', tone: 'success' })
    } catch (error) { setMessage({ text: getApiErrorMessage(error), tone: 'error' }) }
  }
  return <>
    <AuthHeading eyebrow="TÀI KHOẢN / KHÔI PHỤC" title="Quên mật khẩu?" description={<>Nhập email đã dùng để tạo tài khoản.<br />Chúng tôi sẽ gửi liên kết đặt lại mật khẩu.</>} />
    <form className="forgot-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Email đăng ký" name="email" type="email" placeholder="ban@example.com" autoComplete="email" error={errors.email?.message} registration={register('email')} />
      {message && <FormMessage tone={message.tone}>{message.text}</FormMessage>}
      <button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Đang gửi…' : 'Gửi liên kết đặt lại mật khẩu'}</button>
    </form>
    <p className="form-switch back-link"><Link to={routes.login}>← Quay lại đăng nhập</Link></p>
    <div className="social-help"><strong>Dùng tài khoản Google hoặc Facebook?</strong><span>Bạn có thể tiếp tục đăng nhập bằng<br className="desktop-break" /> Google / Facebook trên trang đăng nhập.</span></div>
  </>
}
