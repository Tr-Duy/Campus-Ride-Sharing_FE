import axios from 'axios'
import { env } from '../config/env'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10_000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    if (error.response?.data?.message) return error.response.data.message
    if (error.response) return 'Yêu cầu chưa thể thực hiện. Vui lòng thử lại.'
    return 'Không thể kết nối máy chủ. Vui lòng thử lại sau.'
  }
  return 'Đã có lỗi xảy ra. Vui lòng thử lại.'
}
