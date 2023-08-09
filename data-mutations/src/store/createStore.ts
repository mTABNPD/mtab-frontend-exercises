import { configureStore, Middleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from 'services/api';

type CreateStoreOptions = {
  preloadedState?: any;
  extraMiddleware?: Middleware[];
};

export function createStore(options: CreateStoreOptions = {}) {
  const { preloadedState, extraMiddleware = [] } = options;

  const store = configureStore({
    preloadedState,
    middleware: (defaultMiddleware) => defaultMiddleware()
      .concat(api.middleware)
      .concat(extraMiddleware),
    reducer: {
      [api.reducerPath]: api.reducer
    }
  });

  setupListeners(store.dispatch);

  return store;
}
