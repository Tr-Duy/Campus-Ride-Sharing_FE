// ── Địa lý ──────────────────────────────────────────────
export type City = string;

// ── Loại dịch vụ ────────────────────────────────────────
export type ServiceType = 'SHARED_RIDE' | 'PRIVATE_CHARTER';
export type VehicleType = '5_SEATER' | '7_SEATER';
export type TripType = 'one_way' | 'round_trip' | 'hourly_8h' | 'hourly_12h';
export type SeatMode = 'one' | 'two' | 'row';

// ── Trạng thái chuyến ───────────────────────────────────
export type BookingStatus =
  | 'matching'
  | 'accepted'
  | 'approaching'
  | 'running'
  | 'completed'
  | 'cancelled'
  | 'payment_failed';

// ── Tuyến đường ─────────────────────────────────────────
export interface Route {
  a: string;
  b: string;
  highway?: boolean;
  optionalHighway?: boolean;
  shared: {
    one?: number[];
    two?: number[];
    row?: number[];
  };
  private: {
    one_way?: number[];
    round_trip?: number[];
  };
}

// ── Tính giá ────────────────────────────────────────────
export interface FareInput {
  pickup_address: string;
  dropoff_address: string;
  service_type: ServiceType;
  vehicle_type: VehicleType;
  seat_count?: number;
  seat_mode?: SeatMode;
  trip_type?: TripType;
  is_highway?: boolean;
  durationHours?: number;
}

export interface FareBreakdown {
  label: string;
  amount: number | null;
}

export interface FareResult {
  supported: boolean;
  message?: string;
  suggestions?: string[];
  route?: Route;
  breakdown: FareBreakdown[];
  base: number | null;
  vehicleSurcharge: number;
  highwaySurcharge: number;
  farPickupSurcharge: number;
  overtimeSurcharge: number;
  total: number | null;
  priceOptions: number[];
  priceRangeLabel: string;
  isContactRequired: boolean;
  notes?: string;
}

// ── Đặt xe ──────────────────────────────────────────────
export interface BookingState {
  pickup_address: string;
  dropoff_address: string;
  departure_time: string;
  service_type: ServiceType;
  vehicle_type: VehicleType;
  seat_count: number;
  seat_mode: SeatMode;
  trip_type: TripType;
  is_highway: boolean;
  customer_name: string;
  phone_number: string;
  note: string;
  durationHours: number;
}

export interface Booking extends BookingState {
  id: string;
  status: BookingStatus;
  estimated_fare: number | null;
  driver?: string;
  plate?: string;
  rating?: number;
  review?: string;
  refund?: string;
}

// ── Tài khoản ───────────────────────────────────────────
export interface User {
  name: string;
  phone: string;
}

// ── Thanh toán ──────────────────────────────────────────
export type PaymentMethod = 'VNPAY';

export interface PaymentPayload {
  booking_id: string;
  payment_method: PaymentMethod;
  amount: number;
}
