import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(
  handlers.profile,
  handlers.putProfile
);