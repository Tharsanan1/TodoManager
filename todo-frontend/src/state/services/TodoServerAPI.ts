import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum Status {
  Todo = "Todo",
  InProgress = "InProgress",
  Done = "Done",
}

export interface Todo {
  taskName : string
  taskDescription: string
  status: Status
  created_at: string
  imageUrl: string
}

export const todoServerApi = createApi({
  reducerPath: 'todoServerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/' }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todo',
      providesTags: ["Todos"]
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
    updateTodoStatus: builder.mutation<{}, { taskName: string; status: Status }>({
      query: ({ taskName, status }) => ({
        url: `todo/${taskName}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ["Todos"]
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoStatusMutation } = todoServerApi;