import { RequestStatus } from '@constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { bookingQuestAction, deleteReservationAction, fetchBookingInfoAction, fetchReservationAction } from '@store/thunks/booking';
import { BookingInfo } from '@type/booking-info';
import { Reservation } from '@type/reservation';

type BookingState = {
  reservations: Reservation[];
  reservationStatus: RequestStatus;
  bookingInfo: BookingInfo[];
  bookingInfoStatus: RequestStatus;
  bookingAddRequestStatus: RequestStatus;
  selectedBookingInfo: BookingInfo | null;
}

const initialState: BookingState = {
  reservations: [],
  reservationStatus: RequestStatus.Idle,
  bookingInfo: [],
  bookingInfoStatus: RequestStatus.Idle,
  bookingAddRequestStatus: RequestStatus.Idle,
  selectedBookingInfo: null,
};

const bookingSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchReservationAction.pending, (state) => {
        state.reservationStatus = RequestStatus.Loading;
      })
      .addCase(fetchReservationAction.fulfilled, (state, action) => {
        state.reservationStatus = RequestStatus.Success;
        state.reservations = action.payload;
      })
      .addCase(fetchReservationAction.rejected, (state) => {
        state.reservationStatus = RequestStatus.Failed;
      })
      .addCase(deleteReservationAction.pending, (state) => {
        state.reservationStatus = RequestStatus.Loading;
      })
      .addCase(fetchBookingInfoAction.pending, (state) => {
        state.bookingInfoStatus = RequestStatus.Loading;
      })
      .addCase(fetchBookingInfoAction.fulfilled, (state, action) => {
        state.bookingInfo = action.payload;
        state.selectedBookingInfo = action.payload[0];
        state.bookingInfoStatus = RequestStatus.Success;
      })
      .addCase(fetchBookingInfoAction.rejected, (state) => {
        state.bookingInfoStatus = RequestStatus.Failed;
      })
      .addCase(bookingQuestAction.pending, (state) => {
        state.bookingAddRequestStatus = RequestStatus.Loading;
      })
      .addCase(bookingQuestAction.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
        state.bookingAddRequestStatus = RequestStatus.Success;
      })
      .addCase(bookingQuestAction.rejected, (state) => {
        state.bookingAddRequestStatus = RequestStatus.Failed;
      })
      .addCase(deleteReservationAction.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter((reservation) => reservation.id !== action.payload);
        state.reservationStatus = RequestStatus.Success;
      }),
  initialState,
  name: 'booking',
  reducers: {
    setSelectedBookingInfo: (state: BookingState, action: PayloadAction<string>) => {
      state.selectedBookingInfo = state.bookingInfo.find((bookingInfo) => bookingInfo.id === action.payload) || null;
    }
  },
  selectors: {
    selectReservations: (state: BookingState) => state.reservations,
    selectReservationStatus: (state: BookingState) => state.reservationStatus,
    selectBookingInfo: (state: BookingState) => state.bookingInfo,
    selectBookingStatus: (state: BookingState) => state.bookingInfoStatus,
    selectSelectedBookingInfo: (state: BookingState) => state.selectedBookingInfo,
    selectBookingAddStatus: (state: BookingState) => state.bookingAddRequestStatus,
  }
});

const bookingActions = bookingSlice.actions;
const bookingSelectors = { ...bookingSlice.selectors };

export { bookingActions, bookingSelectors, bookingSlice };

