import { Quest } from '@type/quest';
import QuestCard from '@components/quest-card.tsx/quest-card';

type TQuestsList = {
  quests: Quest[];
}

function QuestsList({ quests }: TQuestsList): JSX.Element {
  return (
    <div className="cards-grid">
      {quests.map((quest) => <QuestCard key={quest.id} quest={quest} />)}
    </div>
  );
}

export default QuestsList;
