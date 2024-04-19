import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '@services/api';
import { questsSlice } from './slices/quests';

export const api = createAPI();

const rootReducer = combineReducers({
  [questsSlice.name]: questsSlice.reducer
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare({
        thunk: {
          extraArgument: api
        }
      })
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']