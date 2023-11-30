import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const folderAPI = createApi({
  reducerPath: 'folderAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.VITE_URL,
    credentials: 'include',
  }),
  tagTypes: ['FolderTag', 'ArticleTag'],

  endpoints: (builder) => ({
    allFolders: builder.query({
      query: () => ({ url: 'folder/all' }),
      providesTags: ['FolderTag'],
    }),

    newFolder: builder.mutation({
      query: (props) => ({
        url: 'folder/new',
        method: 'POST',
        body: props,
      }),
      invalidatesTags: ['FolderTag'],
    }),
  }),
});

export const { useAllFoldersQuery, useNewFolderMutation } = folderAPI;
