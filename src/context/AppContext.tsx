import React, { useState, useCallback, useRef } from 'react';
import type { User, Booking, BookingState, BookingStatus } from '../types';
import { MOCK_BOOKINGS } from '../mocks/bookings';
import { AppContext } from './context';

const DEFAULT_BOOKING: BookingState = {
  pickup_address: 'Hải Phòng',
  dropoff_address: 'Hà Nội',
  departure_time: '',
  service_type: 'SHARED_RIDE',
  vehicle_type: '5_SEATER',
  seat_count: 1,
  seat_mode: 'one',
  trip_type: 'one_way',
  is_highway: true,
  customer_name: '',
  phone_number: '',
  note: '',
  durationHours: 8,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [booking, setBookingState] = useState<BookingState>(DEFAULT_BOOKING);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS.map((booking) => ({ ...booking })));
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [returnTo, setReturnTo] = useState('/book');
  const [toast, setToast] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setBooking = useCallback((partial: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...partial }));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setToastKey((k) => k + 1);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(''), 4500);
  }, []);

  const updateBookingStatus = useCallback((id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
  }, []);

  const updateBookingRefund = useCallback((id: string, refund: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, refund } : b)),
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        booking,
        bookings,
        currentId,
        returnTo,
        toast,
        toastKey,
        setUser,
        setBooking,
        setBookings,
        setCurrentId,
        setReturnTo,
        showToast,
        updateBookingStatus,
        updateBookingRefund,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
