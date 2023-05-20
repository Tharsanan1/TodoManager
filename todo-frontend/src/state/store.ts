import { configureStore } from '@reduxjs/toolkit';
import { todoServerApi } from './services/TodoServerAPI';
import tokenReducer from './reducers/tokenReducer';

export const store = configureStore({
  reducer: {
    [todoServerApi.reducerPath]: todoServerApi.reducer,
    token : tokenReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoServerApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;