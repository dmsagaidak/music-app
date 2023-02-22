import { Track } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTracksByAlbum } from './tracksThunks';
import { RootState } from '../../app/store';

interface TracksState {
  items: Track[];
  fetchLoading: boolean
}

const initialState: TracksState = {
  items: [],
  fetchLoading: false
}

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracksByAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTracksByAlbum.fulfilled, (state, {payload}) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchTracksByAlbum.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksFetching = (state: RootState) => state.tracks.fetchLoading;
