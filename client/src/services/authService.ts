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

    login: builder.mutation({
      query: (values) => ({
        url: `auth/login`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['AuthTag'],
    }),

    newAcc: builder.mutation({
      query: (values) => ({
        url: `auth/new`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['AuthTag'],
    }),
  }),
});

export const {
  useCheckAuthQuery,
  useLogoutMutation,
  useLoginMutation,
  useNewAccMutation,
} = authAPI;
