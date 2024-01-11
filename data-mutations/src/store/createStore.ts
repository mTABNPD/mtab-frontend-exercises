import { configureStore, Middleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from 'services/api';

type CreateStoreOptions = {
  extraMiddleware?: Middleware[];
};

export function createStore(options: CreateStoreOptions = {}) {
  const { extraMiddleware = [] } = options;

  const store = configureStore({
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
