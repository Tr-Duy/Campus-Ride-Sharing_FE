import type { FareInput, FareResult, FareBreakdown } from '../types';
import { CITIES, FAR_AREAS, ROUTES } from './constants';
import { money } from './format';

/** Tìm tên thành phố trong chuỗi địa chỉ */
export const cityOf = (s: string): string =>
  CITIES.find((c) =>
    String(s || '').toLocaleLowerCase('vi-VN').includes(c.toLocaleLowerCase('vi-VN')),
  ) ?? '';

/** Tìm tuyến đường theo điểm đón và điểm trả */
export const getRoute = (a: string, b: string) =>
  ROUTES.find(
    (r) =>
      (r.a === cityOf(a) && r.b === cityOf(b)) ||
      (r.b === cityOf(a) && r.a === cityOf(b)),
  );

/** Kiểm tra vùng đón xa */
export const isFar = (s: string): boolean =>
  FAR_AREAS.some((v) =>
    String(s || '').toLocaleLowerCase('vi-VN').includes(v.toLocaleLowerCase('vi-VN')),
  ) || /nam đình vũ/i.test(s || '');

/** Tính giá cước */
export function calculateFare(input: FareInput): FareResult {
  const route = getRoute(input.pickup_address, input.dropoff_address);

  if (!route) {
    return {
      supported: false,
      message: 'Tuyến chưa được hỗ trợ',
      suggestions: ROUTES.map((r) => `${r.a} ↔ ${r.b}`),
      breakdown: [],
      base: null,
      vehicleSurcharge: 0,
      highwaySurcharge: 0,
      farPickupSurcharge: 0,
      overtimeSurcharge: 0,
      total: null,
      priceOptions: [],
      priceRangeLabel: '',
      isContactRequired: false,
    };
  }

  const shared = input.service_type === 'SHARED_RIDE';
  const max = input.vehicle_type === '7_SEATER' ? 6 : 4;
  const seat = Number(input.seat_count) || 1;
  const seatKey: 'one' | 'two' | 'row' =
    input.seat_mode === 'row' || seat >= max
      ? 'row'
      : seat === 2
        ? 'two'
        : 'one';
  const trip = input.trip_type || 'one_way';

  const options: number[] = shared
    ? (route.shared[seatKey] ?? [])
    : trip.startsWith('hourly')
      ? []
      : (route.private[trip as keyof typeof route.private] ?? []);

  if (!trip.startsWith('hourly') && !options.length) {
    return {
      supported: false,
      message: 'Lựa chọn này chưa có giá trên tuyến đã chọn',
      suggestions: [`${route.a} ↔ ${route.b}`],
      breakdown: [],
      base: null,
      vehicleSurcharge: 0,
      highwaySurcharge: 0,
      farPickupSurcharge: 0,
      overtimeSurcharge: 0,
      total: null,
      priceOptions: [],
      priceRangeLabel: '',
      isContactRequired: false,
    };
  }

  const contact = !shared && trip.startsWith('hourly');
  const base = options[0] ?? null;
  const vehicle = !shared && input.vehicle_type === '7_SEATER' ? 100000 : 0;
  const highway = route.optionalHighway && Boolean(input.is_highway) ? 100000 : 0;
  const far = isFar(input.pickup_address) ? (shared ? 50000 : 100000) : 0;
  const included = trip === 'hourly_8h' ? 8 : trip === 'hourly_12h' ? 12 : 0;
  const overtime = included
    ? Math.ceil(Math.max(0, (Number(input.durationHours) || included) - included) * 2) *
      (0.5 * (input.vehicle_type === '7_SEATER' ? 150000 : 100000))
    : 0;

  const extras = vehicle + highway + far + overtime;
  const breakdown: FareBreakdown[] = [
    { label: 'Giá gốc', amount: base },
    { label: 'Phụ phí xe 7 chỗ', amount: vehicle },
    { label: 'Phụ phí cao tốc', amount: highway },
    { label: 'Phụ phí vùng đón xa', amount: far },
    { label: 'Phụ phí vượt giờ', amount: overtime },
  ];

  const priceRangeLabel = contact
    ? 'Liên hệ để báo giá'
    : options.length > 1
      ? `Từ ${money(Math.min(...options) + extras)} đến ${money(Math.max(...options) + extras)}`
      : `Từ ${money((base ?? 0) + extras)}`;

  return {
    supported: true,
    route,
    breakdown,
    base,
    vehicleSurcharge: vehicle,
    highwaySurcharge: highway,
    farPickupSurcharge: far,
    overtimeSurcharge: overtime,
    total: base === null ? null : base + extras,
    priceOptions: options,
    priceRangeLabel,
    isContactRequired: contact,
    notes: 'Giá cuối cùng do hệ thống xác nhận khi điều phối',
  };
}
