import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI } from './authService';
import { todoAPI } from './todoServise';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [todoAPI.reducerPath]: todoAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
