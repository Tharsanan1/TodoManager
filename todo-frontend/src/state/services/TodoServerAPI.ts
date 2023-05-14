import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum Status {
  Todo = "Todo",
  InProgress = "InProgress",
  Done = "Done",
}

export interface Todo {
  taskName : String
  taskDescription: String
  status: Status
  created_at: String
  imageUrl: String
}

export const todoServerApi = createApi({
  reducerPath: 'todoServerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todo',
    }),
  }),
});

export const { useGetTodosQuery } = todoServerApi;