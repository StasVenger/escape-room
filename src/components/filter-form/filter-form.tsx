import { QUEST_LEVELS_FILTERS, QUEST_TYPES_FILTERS } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { questsActions, questsSelectors } from '@store/slices/quests';

function FilterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeQuestType = useAppSelector(questsSelectors.selectQuestType);
  const activeQuestDifficultyLevel = useAppSelector(questsSelectors.selectDifficultLevel);

  const handleQuestTypeChange = (questType: string) => {
    dispatch(questsActions.setQuestType(questType));
  };

  const handleQuestDifficultyChange = (questDifficulty: string) => {
    dispatch(questsActions.setDifficultLevel(questDifficulty));
  };

  return (
    <form className="filter" action="#" method="get">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          {QUEST_TYPES_FILTERS.map((filter) => (
            <li className="filter__item" key={filter.id}>
              <input
                type="radio"
                name="type"
                id={filter.id}
                onChange={() => handleQuestTypeChange(filter.id)}
                checked={activeQuestType === filter.id}
              />
              <label className="filter__label" htmlFor={filter.id}>
                <svg className="filter__icon" width={filter.width} height={filter.height} aria-hidden="true">
                  <use xlinkHref={`#${filter.icon}`} />
                </svg><span className="filter__label-text">{filter.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          {QUEST_LEVELS_FILTERS.map((filter) => (
            <li className="filter__item" key={filter.id}>
              <input
                type="radio"
                name="level"
                id={filter.id}
                onChange={() => handleQuestDifficultyChange(filter.id)}
                checked={activeQuestDifficultyLevel === filter.id}
              />
              <label className="filter__label" htmlFor={filter.id}><span className="filter__label-text">{filter.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}

export default FilterForm;
