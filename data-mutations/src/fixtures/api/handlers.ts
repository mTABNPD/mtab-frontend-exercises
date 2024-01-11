import { http, HttpResponse } from 'msw';

import { createUserProfile } from 'fixtures/user';
import { UserProfile } from 'types/user.ts';

let profile = createUserProfile();

// default handlers
export const handlers = {
  profile: http.get('*/api/user/profile', () => (
    HttpResponse.json(profile)
  )),
  putProfile: http.put<never, UserProfile>('*/api/user/profile', async ({ request }) => {
    const updates = await request.json();

    profile = {
      ...profile,
      ...updates
    };

    return HttpResponse.json(profile);
  })
};