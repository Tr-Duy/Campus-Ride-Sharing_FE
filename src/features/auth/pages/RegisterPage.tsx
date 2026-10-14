import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { getApiErrorMessage } from '../../../lib/axios'
import { Field, FormMessage, PasswordField, ProviderButtons } from '../components/AuthForm'
import { registerSchema, type RegisterValues } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'
import { AuthHeading } from './shared'

export function RegisterPage() {
  const [message, setMessage] = useState<{ text: string; tone: 'error' | 'info' } | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) })
  const onSubmit = async (values: RegisterValues) => {
    setMessage(null)
    try {
      await authService.register(values)
      setMessage({ text: 'Máy chủ đã xác nhận yêu cầu đăng ký. Bạn có thể đăng nhập khi tài khoản sẵn sàng.', tone: 'info' })
    } catch (error) { setMessage({ text: getApiErrorMessage(error), tone: 'error' }) }
  }
  return <>
    <AuthHeading eyebrow="TÀI KHOẢN / ĐĂNG KÝ" title="Bắt đầu hành trình" description="Tạo tài khoản để đặt và quản lý chuyến xe." />
    <ProviderButtons onUnavailable={() => setMessage({ text: 'Đăng ký Google/Facebook chưa được cấu hình.', tone: 'info' })} />
    <div className="form-divider"><span>hoặc dùng email</span></div>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Họ và tên" name="fullName" placeholder="Nhập họ và tên" autoComplete="name" error={errors.fullName?.message} registration={register('fullName')} />
      <Field label="Email" name="email" type="email" placeholder="ban@example.com" autoComplete="email" error={errors.email?.message} registration={register('email')} />
      <PasswordField label="Mật khẩu" name="password" placeholder="Tối thiểu 8 ký tự" autoComplete="new-password" hint="Tối thiểu 8 ký tự, gồm chữ và số." error={errors.password?.message} registration={register('password')} />
      <label className="checkbox-label terms-label"><input type="checkbox" {...register('acceptedTerms')} /> <span>Tôi đồng ý Điều khoản &amp; Chính sách bảo mật</span></label>
      {errors.acceptedTerms && <p className="field-error" role="alert">{errors.acceptedTerms.message}</p>}
      {message && <FormMessage tone={message.tone}>{message.text}</FormMessage>}
      <button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Đang gửi…' : 'Tạo tài khoản'}</button>
    </form>
    <p className="form-switch">Đã có tài khoản? <Link to={routes.login}>Đăng nhập</Link></p>
  </>
}
