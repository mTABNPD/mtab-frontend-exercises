import { UnknownAction, ThunkAction } from '@reduxjs/toolkit';

import { createStore } from './createStore';

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { activity: ActivityState, users: UsersState, ...etc }
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;
export type ThunkAPIConfig = {
  state: RootState;
  dispatch: AppDispatch;
};
