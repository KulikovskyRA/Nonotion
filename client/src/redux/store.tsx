import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI } from './services/authService';
import { todoAPI } from './services/todoService';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [todoAPI.reducerPath]: todoAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(todoAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
