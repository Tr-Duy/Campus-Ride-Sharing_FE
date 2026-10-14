import type { Route } from '../types';

export const BRAND_NAME = 'Cung Đường';
export const HOTLINE = '1900 636 636';
export const ZALO_PHONE = '0901 234 567';

export const CITIES: string[] = [
  'Hải Phòng',
  'Hà Nội',
  'Bắc Ninh',
  'Bắc Giang',
  'Hạ Long',
  'Thái Nguyên',
  'Hải Dương',
];

export const FAR_AREAS: string[] = [
  'Lập Lễ',
  'Tam Hưng',
  'Minh Đức',
  'Lưu Kiếm',
  'Đồ Sơn',
  'KCN Nam Đình Vũ',
  'Kiến Thụy',
  'Tiên Lãng',
  'Cát Hải',
  'Phà Đồng Bài',
];

export const TRIP_TYPE_LABELS: Record<string, string> = {
  one_way: 'Một chiều',
  round_trip: 'Hai chiều',
  hourly_8h: 'Thuê theo thời gian 8 tiếng',
  hourly_12h: 'Thuê theo thời gian 12 tiếng',
};

export const VEHICLE_LABELS: Record<string, string> = {
  '5_SEATER': 'Xe 5 chỗ',
  '7_SEATER': 'Xe 7 chỗ',
};

/** Alias cho compatibility */
export const VEHICLES = VEHICLE_LABELS;

export const STATUS_LABELS: Record<string, string> = {
  matching: 'Đang tìm tài xế',
  accepted: 'Tài xế đã nhận',
  approaching: 'Đang đến đón',
  running: 'Đang chạy',
  completed: 'Hoàn thành',
  cancelled: 'Đã huỷ',
  payment_failed: 'Thanh toán thất bại',
};

export const ROUTES: Route[] = [
  {
    a: 'Hải Phòng',
    b: 'Bắc Ninh',
    shared: { one: [450000, 600000], two: [700000], row: [800000] },
    private: { one_way: [900000, 1100000, 1300000, 1500000], round_trip: [1600000, 1800000] },
  },
  {
    a: 'Hải Phòng',
    b: 'Bắc Giang',
    shared: { one: [450000, 600000], two: [700000], row: [800000] },
    private: { one_way: [900000, 1100000, 1300000, 1500000], round_trip: [1600000, 1800000] },
  },
  {
    a: 'Hải Phòng',
    b: 'Hà Nội',
    highway: true,
    shared: { one: [400000, 600000], two: [700000], row: [800000] },
    private: { one_way: [900000], round_trip: [1600000] },
  },
  {
    a: 'Hà Nội',
    b: 'Hạ Long',
    highway: true,
    shared: { one: [450000], two: [800000] },
    private: { one_way: [1100000], round_trip: [1900000] },
  },
  {
    a: 'Hải Phòng',
    b: 'Thái Nguyên',
    optionalHighway: true,
    shared: { one: [600000], two: [1000000], row: [1200000] },
    private: { one_way: [1500000], round_trip: [1500000] },
  },
  {
    a: 'Hải Phòng',
    b: 'Hải Dương',
    shared: { one: [250000, 300000] },
    private: { one_way: [450000] },
  },
  {
    a: 'Bắc Ninh',
    b: 'Hải Dương',
    shared: { one: [250000, 300000] },
    private: { one_way: [450000] },
  },
];

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1545158535-c3f7168c28b6?auto=format&fit=crop&w=1200&q=80',
  shared: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80',
  privateCar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
};
