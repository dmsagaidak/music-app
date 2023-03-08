import { Track } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createTrack, fetchTracksByAlbum, removeTrack } from './tracksThunks';
import { RootState } from '../../app/store';

interface TracksState {
  items: Track[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
}

const initialState: TracksState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
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
    builder.addCase(createTrack.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTrack.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(removeTrack.pending, (state, {meta: {arg: trackId}}) => {
      state.deleteLoading = trackId;
    });
    builder.addCase(removeTrack.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(removeTrack.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksFetching = (state: RootState) => state.tracks.fetchLoading;
export const selectTrackCreating = (state: RootState) => state.tracks.createLoading;
export const selectTrackDeleting = (state: RootState) => state.tracks.deleteLoading;
