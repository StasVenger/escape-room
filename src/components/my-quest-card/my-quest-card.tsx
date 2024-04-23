import { AppRoute, DIFFICULTY_LEVELS } from '@constants';
import { Reservation } from '@type/reservation';
import { Link } from 'react-router-dom';

type TMyQuestCardProps = {
  reservation: Reservation;
}

function MyQuestCard({ reservation }: TMyQuestCardProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={reservation.quest.previewImgWebp} />
          <img src={reservation.quest.previewImg} srcSet={reservation.quest.previewImg} width={344} height={232} alt={reservation.quest.title} />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${AppRoute.Quest}/${reservation.quest.id}`}>{reservation.quest.title}</Link>
          <span className="quest-card__info">[сегодня,&nbsp;17:00. наб. реки Карповки&nbsp;5, лит&nbsp;П<br />м. Петроградская]</span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>{`${reservation.quest.peopleMinMax[0]}-${reservation.quest.peopleMinMax[1]} чел`}
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>{DIFFICULTY_LEVELS[reservation.quest.level as keyof typeof DIFFICULTY_LEVELS]}
          </li>
        </ul>
        <button className="btn btn--accent btn--secondary quest-card__btn" type="button">Отменить</button>
      </div>
    </div>
  );
}

export default MyQuestCard;
