// features/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  allergies: '',
  emergencyContact: '',
  language: 'en',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { updateProfile, setLanguage, setAuthenticated, logout,setUser } = userSlice.actions;

export default userSlice.reducer;