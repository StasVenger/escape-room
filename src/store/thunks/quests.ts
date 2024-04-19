import { ApiRoute } from '@constants';
import { createAppAsyncThunk } from '@hooks/index';
import { Quest } from '@type/quest';

export const fetchQuestsAction = createAppAsyncThunk<Quest[], undefined>(
  'data/fetchQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Quest[]>(`${ApiRoute.Quests}`);
    return data;
  }
);

export const fetchQuestByIdAction = createAppAsyncThunk<Quest, string>(
  'data/fetchQuestById',
  async (questId, { extra: api }) => {
    const { data } = await api.get<Quest>(`${ApiRoute.Quests}/${questId}`);
    return data;
  }
);
