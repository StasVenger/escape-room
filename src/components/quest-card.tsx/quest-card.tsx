import { AppRoute, dificultyLevels } from '@constants';
import { Quest } from '@type/quest';
import { Link } from 'react-router-dom';

type TQuestCard = {
  quest: Quest;
}

function QuestCard({ quest }: TQuestCard): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={quest.previewImgWebp} />
          <img src={quest.previewImg} width={344} height={232} alt={quest.title} />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${AppRoute.Quest}/${quest.id}`}>{quest.title}</Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>{`${quest.peopleMinMax[0]}-${quest.peopleMinMax[1]} чел`}
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>{dificultyLevels[quest.level as keyof typeof dificultyLevels]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCard;
