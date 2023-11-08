import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL,
    credentials: 'include',
  }),
  tagTypes: ['AuthTag'],

  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => `auth/`,
      providesTags: ['AuthTag'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: 'GET',
      }),
      invalidatesTags: ['AuthTag'],
    }),
  }),
});

export const { useCheckAuthQuery, useLogoutMutation } = authAPI;
