import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@constants';
import { fetchQuestsAction } from '@store/thunks/quests';
import { Quest } from '@type/quest';

type QuestsState = {
  questType: string;
  difficultLevel: string;
  quests: Quest[];
  status: RequestStatus;
}

const initialState: QuestsState = {
  questType: 'all',
  difficultLevel: 'any',
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
  name: 'quests',
  initialState,
  reducers: {
    setQuestType: (state: QuestsState, action: PayloadAction<string>) => {
      state.questType = action.payload;
    },
    setDifficultLevel: (state: QuestsState, action: PayloadAction<string>) => {
      state.difficultLevel = action.payload;
    }
  },
  selectors: {
    selectQuestType: (state: QuestsState) => state.questType,
    selectDifficultLevel: (state: QuestsState) => state.difficultLevel,
    selectQuests: (state: QuestsState) => state.quests,
    selectStatus: (state: QuestsState) => state.status,
  }
});

const questsActions = questsSlice.actions;
const questsSelectors = {
  ...questsSlice.selectors,
  selectQuestByTypeAndDifficulty: createSelector(
    questsSlice.selectors.selectQuests,
    questsSlice.selectors.selectQuestType,
    questsSlice.selectors.selectDifficultLevel,
    (allQuests, questType, difficultLevel) => {
      const filter = allQuests?.filter((quest) => (questType === 'all' || quest.type === questType) &&
        (difficultLevel === 'any' || quest.level === difficultLevel));
      return filter;
    }
  )
};

export { questsActions, questsSelectors, questsSlice };
