import MyQuestCard from '@components/my-quest-card/my-quest-card';
import { Reservation } from '@type/reservation';

type TMyQuestsListProps = {
  reservations: Reservation[];
}

function MyQuestsList({ reservations }: TMyQuestsListProps): JSX.Element {
  return (
    <div className="cards-grid">
      {reservations.map((reservation) => <MyQuestCard key={reservation.id} reservation={reservation} />)}
    </div>
  );
}

export default MyQuestsList;
