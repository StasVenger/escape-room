import { Link, useParams } from 'react-router-dom';
import Wrapper from '../../components/wrapper/wrapper';
import { AppRoute } from '../../constants';
import NotFoundPage from '../not-found-page/not-found-page';

function QuestPage():JSX.Element {
  const { questId } = useParams();

  if (questId === undefined) {
    return <NotFoundPage />;
  }

  return (
    <Wrapper mainClass="decorated-page" extraClass="quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" />
          <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width={1366} height={768} alt="" />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">Маньяк</h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>Ужасы
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width={11} height={14} aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>3–6&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>Средний
            </li>
          </ul>
          <p className="quest-page__description">В&nbsp;комнате с&nbsp;приглушённым светом несколько человек, незнакомых друг с&nbsp;другом, приходят в&nbsp;себя. Никто не&nbsp;помнит, что произошло прошлым вечером. Руки и&nbsp;ноги связаны, но&nbsp;одному из&nbsp;вас получилось освободиться. На&nbsp;стене висит пугающий таймер и&nbsp;запущен отсчёт 60&nbsp;минут. Сможете&nbsp;ли вы&nbsp;разобраться в&nbsp;стрессовой ситуации, помочь другим, разобраться что произошло и&nbsp;выбраться из&nbsp;комнаты?</p>
          <Link className="btn btn--accent btn--cta quest-page__btn" to={`${AppRoute.Quest}/${questId}/booking`}>Забронировать</Link>
        </div>
      </div>
    </Wrapper>
  );
}

export default QuestPage;
