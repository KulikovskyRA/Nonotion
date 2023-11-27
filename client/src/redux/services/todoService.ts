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

    updateTodoStatus: builder.mutation({
      query: (updateData) => ({
        url: '/',
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['TodoTag'],
    }),

    updateTodoInner: builder.mutation({
      query: (updateData) => ({
        url: '/inner',
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['TodoTag'],
    }),

    deleteTodo: builder.mutation({
      query: (deleteData) => ({
        url: '/',
        method: 'DELETE',
        body: deleteData,
      }),
      invalidatesTags: ['TodoTag'],
    }),
  }),
});

export const {
  useAllMyTodosQuery,
  useNewTodoMutation,
  useUpdateTodoStatusMutation,
  useDeleteTodoMutation,
  useUpdateTodoInnerMutation,
} = todoAPI;
