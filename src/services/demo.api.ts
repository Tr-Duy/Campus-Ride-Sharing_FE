import type { Booking, User, PaymentPayload } from '../types';
import { MOCK_BOOKINGS } from '../mocks/bookings';

const delay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 500));

/** [MOCK] Service layer – API để trống, dùng mock data */
export const demoApiService = {
  /** [MOCK] Đăng nhập */
  async login(identity: string, _password: string): Promise<User> {
    await delay();
    if (!identity) throw new Error('Vui lòng nhập thông tin đăng nhập');
    return {
      name: identity.includes('@') ? 'Khách hàng' : identity,
      phone: '0912345678',
    };
  },

  /** [MOCK] Tạo chuyến đặt xe */
  async createBooking(payload: Omit<Booking, 'id' | 'status'>): Promise<Booking> {
    await delay();
    const id = 'CD-' + String(Date.now()).slice(-8);
    const row: Booking = {
      ...payload,
      id,
      status: 'matching',
      driver: 'Anh Minh',
      plate: '15A-123.45',
    };
    MOCK_BOOKINGS.unshift(row);
    return row;
  },

  /** [MOCK] Lấy danh sách chuyến */
  async listBookings(): Promise<Booking[]> {
    await delay();
    return [...MOCK_BOOKINGS];
  },

  /** [MOCK] Lấy chi tiết chuyến */
  async getBooking(id: string): Promise<Booking | undefined> {
    await delay();
    return MOCK_BOOKINGS.find((x) => x.id === id);
  },

  /** [MOCK] Huỷ chuyến */
  async cancelBooking(id: string): Promise<void> {
    await delay();
    const row = MOCK_BOOKINGS.find((x) => x.id === id);
    if (row) row.status = 'cancelled';
  },

  /** [MOCK] Thanh toán */
  async payment(payload: PaymentPayload): Promise<void> {
    await delay();
    if (!payload.booking_id || !payload.amount)
      throw new Error('Không thể khởi tạo thanh toán cho chuyến này');
  },

  /** [MOCK] Đăng ký */
  async register(): Promise<void> {
    await delay();
  },

  /** [MOCK] Xác thực OTP */
  async verifyOtp(): Promise<void> {
    await delay();
  },
};
