import { rest } from 'msw';

import { createUserProfile } from 'fixtures/user';

const profile = createUserProfile();

// default handlers
export const handlers = {
  profile: rest.get('*/api/user/profile', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json(profile)
    )
  )),
  putProfile: rest.put('*/api/user/profile', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json(profile)
    )
  ))
};