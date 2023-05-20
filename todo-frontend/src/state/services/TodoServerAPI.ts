import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export enum Status {
  Todo = "Todo",
  InProgress = "InProgress",
  Done = "Done",
}

export interface Todo {
  _id: string
  name : string
  description: string
  status: Status
  createdAt: string
  imageUrl: string
}

export const todoServerApi = createApi({
  reducerPath: 'todoServerApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8081/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.token
      console.log("token:" + token )
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todo',
      providesTags: ["Todos"],
    }),
    createTodo: builder.mutation<{}, FormData>({
      query: (data) => {
        return {
          url: 'todo',
          method: 'POST',
          body: data,
          
        };
      },
    }),
    updateTodoStatus: builder.mutation<{}, { id: string; status: Status }>({
      query: ({ id, status }) => ({
        url: `todo/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ["Todos"]
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoStatusMutation } = todoServerApi;