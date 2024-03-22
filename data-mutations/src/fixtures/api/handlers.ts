import { http, HttpResponse } from 'msw';

import { createUserProfile } from 'fixtures/user';
import { UserProfile } from 'types/user.ts';

let profile = createUserProfile();
let isLoggedIn = false;

type LoginRequest = {
  email: string;
  password: string;
}

// default handlers
export const handlers = {
  profile: http.get('*/api/user/profile', () => (
    isLoggedIn ? HttpResponse.json(profile) : new HttpResponse(null, { status: 401 })
  )),
  putProfile: http.put<never, UserProfile>('*/api/user/profile', async ({ request }) => {
    if (!isLoggedIn) {
       return new HttpResponse(null, { status: 401 });
    }

    const updates = await request.json();

    profile = {
      ...profile,
      ...updates
    };

    return HttpResponse.json(profile);
  }),
  postLogin: http.post<never, LoginRequest>('*/api/user/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (email && password) {
      profile.email = email;

      isLoggedIn = true;

      return HttpResponse.json(true);
    }

    return new HttpResponse(null, { status: 400 });
  })
};