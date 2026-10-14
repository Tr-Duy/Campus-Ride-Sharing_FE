import { apiClient } from '../../../lib/axios'
import type { ApiMessageResponse, ForgotPasswordRequest, LoginRequest, RegisterRequest } from '../types/auth.types'

// These routes are placeholders until the backend contract is confirmed.
export const authApi = {
  login: (data: LoginRequest) => apiClient.post<ApiMessageResponse>('/auth/login', data),
  register: (data: RegisterRequest) => apiClient.post<ApiMessageResponse>('/auth/register', data),
  requestPasswordReset: (data: ForgotPasswordRequest) =>
    apiClient.post<ApiMessageResponse>('/auth/forgot-password', data),
}
