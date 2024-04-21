import { RequestStatus } from '@constants';
import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestByIdAction } from '@store/thunks/quests';
import { Quest } from '@type/quest';

type QuestState = {
  quest: Quest | null;
  status: RequestStatus;
}

const initialState: QuestState = {
  quest: null,
  status: RequestStatus.Idle
};

const questSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchQuestByIdAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchQuestByIdAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.quest = action.payload;
      })
      .addCase(fetchQuestByIdAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  name: 'quest',
  initialState,
  reducers: {},
  selectors: {
    selectQuest: (state: QuestState) => state.quest,
    selectStatus: (state: QuestState) => state.status
  }
});

const questActions = questSlice.actions;
const questSelectors = { ...questSlice.selectors };

export { questActions, questSelectors, questSlice };
