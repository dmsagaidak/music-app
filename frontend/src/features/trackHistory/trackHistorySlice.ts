import { TrackHistory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createTrackHistory } from './trackHistoryThunks';

interface TrackHistoryState {
  items: TrackHistory[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: TrackHistoryState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
}

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTrackHistory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTrackHistory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTrackHistory.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;