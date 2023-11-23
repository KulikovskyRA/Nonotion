import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoAPI = createApi({
  reducerPath: 'todoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.VITE_URL + 'todo/',
    credentials: 'include',
  }),
  tagTypes: ['TodoTag'],
  endpoints: (builder) => ({
    allMyTodos: builder.query({
      query: () => 'all',
      providesTags: ['TodoTag'],
    }),
  }),
});

export const { useAllMyTodosQuery } = todoAPI;
