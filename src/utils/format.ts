/** Format số tiền VND */
export const money = (n: number): string =>
  new Intl.NumberFormat('vi-VN').format(n) + 'đ';

/** Format ngày giờ hiển thị tiếng Việt */
export const dateView = (value: string): string =>
  new Date(value).toLocaleString('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

/** Chuyển ISO string về format datetime-local input */
export const dateLocal = (value: string): string => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return (
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-` +
    `${String(d.getDate()).padStart(2, '0')}T` +
    `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  );
};

/** Kiểm tra số điện thoại Việt Nam */
export const validPhone = (s: string): boolean =>
  /^0\d{9}$/.test(String(s).trim());

/** Đánh giá độ mạnh mật khẩu */
export const passwordStrength = (s: string): string => {
  if (!s) return 'chưa nhập';
  const score = [
    s.length >= 8,
    /[A-Z]/.test(s),
    /[a-z]/.test(s),
    /\d/.test(s),
    /[^A-Za-z0-9]/.test(s),
  ].filter(Boolean).length;
  if (score < 3) return 'yếu';
  if (score < 5) return 'trung bình';
  return 'mạnh';
};
