import Loader from '@components/loader/loader';
import Map from '@components/map/map';
import Wrapper from '@components/wrapper/wrapper';
import { AppRoute, RequestStatus } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import { bookingSelectors } from '@store/slices/booking';
import { questSelectors } from '@store/slices/quest';
import { bookingQuestAction, fetchBookingInfoAction } from '@store/thunks/booking';
import { fetchQuestByIdAction } from '@store/thunks/quests';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

type TBookingForm = {
  date: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
}

function BookingPage(): JSX.Element {
  const { questId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const questInfo = useAppSelector(questSelectors.selectQuest);
  const bookingInfo = useAppSelector(bookingSelectors.selectBookingInfo);
  const selectedBooking = useAppSelector(bookingSelectors.selectSelectedBookingInfo);
  const questRequestStatus = useAppSelector(questSelectors.selectStatus);
  const bookingRequestStatus = useAppSelector(bookingSelectors.selectBookingStatus);
  const { register, handleSubmit, formState: { errors } } = useForm<TBookingForm>();

  useEffect(() => {
    dispatch(fetchQuestByIdAction(questId as string));
    dispatch(fetchBookingInfoAction(questId as string));
  }, [dispatch, questId]);

  if (questRequestStatus === RequestStatus.Loading) {
    return <Loader />;
  }

  if (questRequestStatus === RequestStatus.Failed || !questInfo || !selectedBooking) {
    return <NotFoundPage />;
  }

  const onSubmit = (data: TBookingForm) => {
    dispatch(bookingQuestAction({
      questId: questId as string,
      body: {
        date: data.date.split('-')[0],
        time: data.date.split('-')[1],
        contactPerson: data.contactPerson,
        phone: data.phone,
        withChildren: data.withChildren,
        peopleCount: Number(data.peopleCount),
        placeId: selectedBooking.id
      }
    }));

    if(bookingRequestStatus === RequestStatus.Success) {
      return navigate(AppRoute.MyQuests);
    }
  };

  return (
    <Wrapper mainClass="page-content" extraClass="decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="/img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x" />
          <img src="/img/content/maniac/maniac-bg-size-m.jpg" srcSet="/img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt="" />
        </picture>
      </div>
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">{questInfo?.title}</p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <Map latitude={selectedBooking.location.coords[0]} longitude={selectedBooking.location.coords[1]} locations={bookingInfo}/>
            <p className="booking-map__address">Вы&nbsp;выбрали: {selectedBooking?.location.address}</p>
          </div>
        </div>
        <form
          className="booking-form"
          action="https://echo.htmlacademy.ru/"
          method="post"
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(onSubmit)(evt);
          }}
        >
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Сегодня</legend>
              <div className="booking-form__date-inner-wrapper">
                {selectedBooking?.slots.today.map((slot) => (
                  <label className="custom-radio booking-form__date" key={slot.time}>
                    <input
                      type="radio"
                      id={`today${slot.time}`}
                      required
                      defaultValue={`today-${slot.time}`}
                      disabled={!slot.isAvailable}
                      {...register('date')}
                    />
                    <span className="custom-radio__label">{slot.time}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Завтра</legend>
              <div className="booking-form__date-inner-wrapper">
                {selectedBooking?.slots.tomorrow.map((slot) => (
                  <label className="custom-radio booking-form__date" key={slot.time}>
                    <input
                      type="radio"
                      id={`tomorrow${slot.time}`}
                      required
                      defaultValue={`tomorrow-${slot.time}`}
                      disabled={!slot.isAvailable}
                      {...register('date')}
                    />
                    <span className="custom-radio__label">{slot.time}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </fieldset>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">Ваше имя</label>
              <input
                type="text"
                id="name"
                placeholder="Имя"
                {...register('contactPerson', {
                  required: 'Поле обязательно для заполнения',
                  minLength: {
                    value: 1,
                    message: 'Имя должно содержать минимум 1 символ',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Имя не должно превышать 15 символов',
                  },
                  pattern: {
                    value: /^[А-Яа-яЁёA-Za-z' ]+$/,
                    message: 'Недопустимые символы в имени',
                  }
                })}
              />
              {errors.contactPerson && <span role="alert">{errors.contactPerson.message}</span>}
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
              <input
                type="tel"
                id="tel"
                placeholder="Телефон"
                {...register('phone', {
                  required: 'Поле обязательно для заполнения',
                  pattern: {
                    value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    message: 'Номер телефона должен быть в формате +7 (000) 000-00-00',
                  },
                })}
              />
              {errors.phone && <span role="alert">{errors.phone.message}</span>}
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">Количество участников</label>
              <input
                type="number"
                id="person"
                placeholder="Количество участников"
                {...register('peopleCount', {
                  required: 'Поле обязятельно для заполнения',
                  validate: (value) => {
                    const peopleMinMax = questInfo.peopleMinMax;
                    return (value < peopleMinMax[0] || value > peopleMinMax[1])
                      ? `Количество участников должно быть между ${peopleMinMax[0]} и ${peopleMinMax[1]}`
                      : true;
                  }
                })}
              />
              {errors.peopleCount && <span role="alert">{errors.peopleCount.message}</span>}
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input type="checkbox" id="children" defaultChecked {...register('withChildren')}/>
              <span className="custom-checkbox__icon">
                <svg width={20} height={17} aria-hidden="true">
                  <use xlinkHref="#icon-tick" />
                </svg>
              </span>
              <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
            </label>
          </fieldset>
          <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
            <span className="custom-checkbox__icon">
              <svg width={20} height={17} aria-hidden="true">
                <use xlinkHref="#icon-tick" />
              </svg>
            </span>
            <span className="custom-checkbox__label">Я&nbsp;согласен с
              <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
            </span>
          </label>
        </form>
      </div>
    </Wrapper>
  );
}

export default BookingPage;
