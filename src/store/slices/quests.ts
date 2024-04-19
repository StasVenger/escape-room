import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@constants';
import { fetchQuestsAction } from '@store/thunks/quests';
import { Quest } from '@type/quest';

type QuestsState = {
  quests: Quest[];
  status: RequestStatus;
}

const initialState: QuestsState = {
  quests: [],
  status: RequestStatus.Idle,
};

const questsSlice = createSlice({
  extraReducers: (builder) => builder
    .addCase(fetchQuestsAction.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
    .addCase(fetchQuestsAction.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.quests = action.payload;
    })
    .addCase(fetchQuestsAction.rejected, (state) => {
      state.status = RequestStatus.Failed;
    }),
  name: '',
  initialState,
  reducers: {},
  selectors: {
    selectQuests: (state: QuestsState) => state.quests,
    selectStatus: (state: QuestsState) => state.status,
  }
});

const questsActions = questsSlice.actions;
const questsSelectors = { ...questsSlice.selectors };

export { questsActions, questsSelectors, questsSlice };
