import { AnyAction, configureStore, Selector, ThunkAction } from '@reduxjs/toolkit';

import postsReducer, { name as postsReducerName } from 'reducers/posts';

export function createStore() {
  return configureStore({
    reducer: {
      [postsReducerName]: postsReducer
    }
  });
}

export const store = createStore();
export type AppSelector<ReturnType> = Selector<RootState, ReturnType>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { activity: ActivityState, users: UsersState, ...etc }
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
  >;