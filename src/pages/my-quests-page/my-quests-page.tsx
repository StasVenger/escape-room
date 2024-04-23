import { useEffect } from 'react';
import { RequestStatus } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { bookingSelectors } from '@store/slices/booking';
import { fetchReservationAction } from '@store/thunks/booking';
import HelmetComponent from '@components/helmet-component/helmet-component';
import Loader from '@components/loader/loader';
import MyQuestsListEmpty from '@components/my-quests-list-empty/my-quests-list-empty';
import MyQuestsList from '@components/my-quests-list/my-quests-list';
import Wrapper from '@components/wrapper/wrapper';

function MyQuestsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector(bookingSelectors.selectReservations);
  const reservationStatus = useAppSelector(bookingSelectors.selectReservationStatus);

  useEffect(() => {
    dispatch(fetchReservationAction());
  }, [dispatch]);

  if (reservationStatus === RequestStatus.Loading) {
    return <Loader />;
  }

  return (
    <Wrapper mainClass="page-content" extraClass="decorated-page">
      <HelmetComponent title="Бронирование квеста - Escape Room" />
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x" />
          <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width={1366} height={1959} alt="" />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
        </div>
        {reservations.length > 0 ?
          <MyQuestsList reservations={reservations} /> :
          <MyQuestsListEmpty />}
      </div>
    </Wrapper>
  );
}

export default MyQuestsPage;
