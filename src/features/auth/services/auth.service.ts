import { authApi } from '../api/auth.api'
import type { ForgotPasswordRequest, LoginRequest, RegisterRequest } from '../types/auth.types'

export const authService = {
  login: (data: LoginRequest) => authApi.login(data),
  register: (data: RegisterRequest) => authApi.register(data),
  requestPasswordReset: (data: ForgotPasswordRequest) => authApi.requestPasswordReset(data),
}
