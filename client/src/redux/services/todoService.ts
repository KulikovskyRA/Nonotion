import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from '../../types/types';

export const todoAPI = createApi({
  reducerPath: 'todoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.VITE_URL + 'todo',
    credentials: 'include',
  }),
  tagTypes: ['TodoTag'],

  endpoints: (builder) => ({
    allMyTodos: builder.query<Array<ITodo>, void>({
      query: () => ({ url: '/all' }),
      providesTags: ['TodoTag'],
    }),

    newTodo: builder.mutation({
      query: (innerValue) => ({
        url: '/new',
        method: 'POST',
        body: innerValue,
      }),
      invalidatesTags: ['TodoTag'],
    }),
  }),
});

export const { useAllMyTodosQuery, useNewTodoMutation } = todoAPI;
