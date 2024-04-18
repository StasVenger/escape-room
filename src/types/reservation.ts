import { Location } from './location';
import { QuestInfo } from './quest-info';

export type Reservation = {
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: Location;
  quest: QuestInfo;
}
