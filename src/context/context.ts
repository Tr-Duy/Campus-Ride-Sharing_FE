import { createContext } from 'react';
import type { User, Booking, BookingState, BookingStatus } from '../types';

export interface AppState {
  user: User | null;
  booking: BookingState;
  bookings: Booking[];
  currentId: string | null;
  toast: string;
  toastKey: number;
}

export interface AppContextValue extends AppState {
  setUser: (user: User | null) => void;
  setBooking: (partial: Partial<BookingState>) => void;
  setBookings: (bookings: Booking[]) => void;
  setCurrentId: (id: string | null) => void;
  showToast: (msg: string) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateBookingRefund: (id: string, refund: string) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);
