import { TrackHistory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createTrackHistory, fetchTrackHistory } from './trackHistoryThunks';
import { RootState } from '../../app/store';

interface TrackHistoryState {
  items: TrackHistory[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: TrackHistoryState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

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
    builder.addCase(fetchTrackHistory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTrackHistory.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchTrackHistory.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectTrackHistory = (state: RootState) => state.trackHistory.items;
export const selectTrackHistoryFetchLoading = (state: RootState) => state.trackHistory.fetchLoading;
export const selectTrackHistoryCreateLoading = (state: RootState) => state.trackHistory.createLoading;
