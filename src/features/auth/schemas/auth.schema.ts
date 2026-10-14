import { z } from 'zod'

const emailSchema = z.string().trim().min(1, 'Vui lòng nhập email.').email('Email chưa đúng định dạng.')

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, 'Vui lòng nhập email hoặc số điện thoại.').refine(
    (value) => !value.includes('@') || z.email().safeParse(value).success,
    'Email chưa đúng định dạng.',
  ),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu.'),
})

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Vui lòng nhập họ và tên.'),
  email: emailSchema,
  password: z.string().min(8, 'Mật khẩu cần tối thiểu 8 ký tự.').regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Mật khẩu cần có cả chữ và số.'),
  acceptedTerms: z.boolean().refine(Boolean, 'Vui lòng đồng ý Điều khoản & Chính sách bảo mật.'),
})

export const forgotPasswordSchema = z.object({ email: emailSchema })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
