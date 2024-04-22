import { RequestStatus } from '@constants';
import { createSlice } from '@reduxjs/toolkit';
import { bookingQuestAction, deleteReservationAction, fetchBookingInfoAction, fetchReservationAction } from '@store/thunks/booking';
import { BookingInfo } from '@type/booking-info';
import { Reservation } from '@type/reservation';

type BookingState = {
  reservations: Reservation[];
  reservationStatus: RequestStatus;
  bookingInfo: BookingInfo | null;
  bookingInfoStatus: RequestStatus;
}

const initialState: BookingState = {
  reservations: [],
  reservationStatus: RequestStatus.Idle,
  bookingInfo: null,
  bookingInfoStatus: RequestStatus.Idle,
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
        state.bookingInfoStatus = RequestStatus.Success;
        state.bookingInfo = action.payload;
      })
      .addCase(fetchBookingInfoAction.rejected, (state) => {
        state.bookingInfoStatus = RequestStatus.Failed;
      })
      .addCase(bookingQuestAction.pending, (state) => {
        state.bookingInfoStatus = RequestStatus.Loading;
      })
      .addCase(bookingQuestAction.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
        state.bookingInfoStatus = RequestStatus.Success;
      })
      .addCase(bookingQuestAction.rejected, (state) => {
        state.bookingInfoStatus = RequestStatus.Failed;
      }),
  initialState,
  name: 'booking',
  reducers: {},
  selectors: {}
});

const bookingActions = bookingSlice.actions;
const bookingSelectors = { ...bookingSlice.selectors };

export { bookingActions, bookingSelectors, bookingSlice };

