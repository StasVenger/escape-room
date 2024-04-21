import FilterForm from '@components/filter-form/filter-form';
import Loader from '@components/loader/loader';
import QuestListEmpty from '@components/quest-list-empty/quest-list-empty';
import QuestsList from '@components/quests-list/quests-list';
import Wrapper from '@components/wrapper/wrapper';
import { RequestStatus } from '@constants';
import { useAppSelector } from '@hooks/index';
import { questsSelectors } from '@store/slices/quests';

function MainPage(): JSX.Element {
  const selectedQuests = useAppSelector(questsSelectors.selectQuestByTypeAndDifficulty);
  const questsRequestStatus = useAppSelector(questsSelectors.selectStatus);

  if (questsRequestStatus === RequestStatus.Loading) {
    return <Loader />;
  }

  return (
    <Wrapper mainClass="page-content" isLogoLink={false}>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
        </div>
        <div className="page-content__item">
          <FilterForm />
        </div>
        {selectedQuests.length > 0 ?
          <>
            <h2 className="title visually-hidden">Выберите квест</h2>
            <QuestsList quests={selectedQuests} />
          </> :
          <QuestListEmpty />}
      </div>
    </Wrapper>
  );
}

export default MainPage;
