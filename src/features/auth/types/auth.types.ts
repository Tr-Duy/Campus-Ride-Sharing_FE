export interface LoginRequest {
  identifier: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  acceptedTerms: boolean
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ApiMessageResponse {
  message?: string
}
