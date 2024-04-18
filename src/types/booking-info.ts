import { Location } from './location';
import { Slots } from './slots';

export type BookingInfo = {
  id: string;
  location: Location;
  slots: Slots;
}
