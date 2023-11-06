import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: (name: string) => `auth/`,
    }),
  }),
});

export const { useCheckAuthQuery } = authAPI;
