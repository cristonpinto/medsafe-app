import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addMedication = createAsyncThunk(
  'medications/add',
  async (medicationData) => {
    const response = await axios.post('http://localhost:5000/api/medications', medicationData);
    return response.data;
  }
);

const medicationSlice = createSlice({
  name: 'medications',
  initialState: { medications: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMedication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMedication.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.medications.push(action.payload.medication);
      })
      .addCase(addMedication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default medicationSlice.reducer;