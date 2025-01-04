import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import sessionReducer from './sessionSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    session: sessionReducer,
  },
});
