import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cityOf, getRoute } from '../../../utils/fare';
import { useApp } from '../../../hooks/useApp';

export function useBookingSearch() {
  const navigate = useNavigate();
  const { setBooking, user, showToast } = useApp();
  const [quickError, setQuickError] = useState('');


  const handleQuickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pickup = fd.get('pickup_address') as string;
    const dropoff = fd.get('dropoff_address') as string;
    const departure_time = fd.get('departure_time') as string;
    const service_type = fd.get('service_type') as 'SHARED_RIDE' | 'PRIVATE_CHARTER';

    if (!pickup || !dropoff) { setQuickError('Vui lòng chọn điểm đón và điểm trả'); return; }
    if (cityOf(pickup) === cityOf(dropoff)) { setQuickError('Điểm đi và điểm đến phải khác nhau'); return; }
    if (!departure_time || new Date(departure_time).getTime() <= Date.now()) { setQuickError('Vui lòng chọn ngày giờ khởi hành trong tương lai'); return; }
    if (!getRoute(pickup, dropoff)) { setQuickError('Tuyến chưa được hỗ trợ. Vui lòng chọn một tuyến trong bảng giá'); return; }

    const route = getRoute(pickup, dropoff);
    setBooking({ pickup_address: pickup, dropoff_address: dropoff, departure_time, service_type, is_highway: !!route?.highway });
    if (user) {
      navigate('/book/details');
    } else {
      navigate('/fares');
      showToast('Đã lưu lựa chọn tuyến trong phiên. Đăng nhập để tiếp tục đặt xe.');
    }
  };

  return { quickError, handleQuickSubmit };
}
