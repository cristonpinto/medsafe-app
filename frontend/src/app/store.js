// app/store.js

import { configureStore } from '@reduxjs/toolkit';
import medicationReducer from '../features/medicationSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    medications: medicationReducer,
    user: userReducer,
  },
});