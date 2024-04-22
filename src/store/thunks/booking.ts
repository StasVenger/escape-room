import { AppRoute } from '@constants';
import { createAppAsyncThunk } from '@hooks/index';
import { BookingInfo } from '@type/booking-info';
import { Reservation } from '@type/reservation';

type BookingProps = {
  body: {
    date: string;
    time: string;
    contactPerson: string;
    phone: string;
    withChildren: boolean;
    peopleCount: number;
    placeId: string;
  };
  questId: string;
}

export const fetchReservationAction = createAppAsyncThunk<Reservation[], undefined>(
  'data/fetchReservation',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Reservation[]>(`${AppRoute.Quest}/reservation`);
    return data;
  }
);

export const deleteReservationAction = createAppAsyncThunk<void, string>(
  'data/deleteReservation',
  async (reservationId, { extra: api }) => {
    await api.delete(`${AppRoute.Quest}/reservation/${reservationId}`);
  }
);

export const fetchBookingInfoAction = createAppAsyncThunk<BookingInfo, string>(
  'data/fetchBookingInfo',
  async (questId, { extra: api }) => {
    const { data } = await api.get<BookingInfo>(`${AppRoute.Quest}/${questId}/booking`);
    return data;
  }
);

export const bookingQuestAction = createAppAsyncThunk<Reservation, BookingProps>(
  'data/bookingQuest',
  async({ questId, body }, { extra: api }) => {
    const { data } = await api.post<Reservation>(`${AppRoute.Quest}/${questId}/booking`, body);
    return data;
  }
);
