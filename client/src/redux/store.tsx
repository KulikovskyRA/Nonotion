import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import authSlice from './authSlice';
import { authAPI } from './authService';

const rootReducer = combineReducers({
  // authSlice: authSlice,
  [authAPI.reducerPath]: authAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
