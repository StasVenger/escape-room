import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute, DIFFICULTY_LEVELS, QUEST_TYPES, RequestStatus } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { questSelectors } from '@store/slices/quest';
import { fetchQuestByIdAction } from '@store/thunks/quests';
import Wrapper from '@components/wrapper/wrapper';
import Loader from '@components/loader/loader';
import HelmetComponent from '@components/helmet-component/helmet-component';
import NotFoundPage from '../not-found-page/not-found-page';

function QuestPage(): JSX.Element {
  const { questId } = useParams();
  const dispatch = useAppDispatch();
  const questInfo = useAppSelector(questSelectors.selectQuest);
  const questRequestStatus = useAppSelector(questSelectors.selectStatus);

  useEffect(() => {
    dispatch(fetchQuestByIdAction(questId as string));
  }, [dispatch, questId]);

  if (questRequestStatus === RequestStatus.Loading) {
    return <Loader />;
  }

  if (questRequestStatus === RequestStatus.Failed || !questInfo || !questId) {
    return <NotFoundPage />;
  }

  return (
    <Wrapper mainClass="decorated-page" extraClass="quest-page">
      <HelmetComponent title="Квест - Escape Room" />
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={questInfo?.coverImgWebp} />
          <img src={questInfo?.coverImg} srcSet={questInfo?.coverImg} width={1366} height={768} alt="" />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{questInfo?.title}</h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>{QUEST_TYPES[questInfo?.type as keyof typeof QUEST_TYPES]}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width={11} height={14} aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>{`${questInfo?.peopleMinMax[0]}-${questInfo?.peopleMinMax[1]} чел` ?? ''}
            </li>
            <li className="tags__item">
              <svg width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>{DIFFICULTY_LEVELS[questInfo?.level as keyof typeof DIFFICULTY_LEVELS]}
            </li>
          </ul>
          <p className="quest-page__description">{questInfo?.description}</p>
          <Link className="btn btn--accent btn--cta quest-page__btn" to={`${AppRoute.Quest}/${questId}/booking`}>Забронировать</Link>
        </div>
      </div>
    </Wrapper>
  );
}

export default QuestPage;
