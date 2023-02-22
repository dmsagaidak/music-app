import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists, fetchOneArtist } from './artistsThunks';
import { RootState } from '../../app/store';

interface ArtistsState {
  items: Artist[];
  oneItem: Artist | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, {payload}) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneArtist.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneArtist.fulfilled, (state, {payload}) => {
      state.fetchOneLoading = false;
      state.oneItem = payload;
    });
    builder.addCase(fetchOneArtist.rejected, (state) => {
      state.fetchOneLoading = false
    });
  }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectOneArtist = (state: RootState) => state.artists.oneItem;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
export const selectOneArtistFetching = (state: RootState) => state.artists.fetchOneLoading;