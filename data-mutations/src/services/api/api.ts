import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PROFILE_URL } from 'consts/api';
import { UserProfile } from 'types/user';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PROFILE'],
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => PROFILE_URL,
      providesTags: () => [{ type: 'PROFILE' }]
    }),
    mutateProfile: builder.mutation<UserProfile, UserProfile>({
      query: (profile) => ({
        url: PROFILE_URL,
        method: 'PUT',
        body: profile
      }),
      invalidatesTags: () => [{ type: 'PROFILE' }]
    })
  })
});

export const { useGetProfileQuery, useMutateProfileMutation } = api;