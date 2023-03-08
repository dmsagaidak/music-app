import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createArtist, fetchArtists, fetchOneArtist, removeArtist } from './artistsThunks';
import { RootState } from '../../app/store';

interface ArtistsState {
  items: Artist[];
  oneItem: Artist | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
}

const initialState: ArtistsState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  deleteLoading: false,
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
    builder.addCase(createArtist.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createArtist.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(removeArtist.pending, (state, {meta: {arg: artistId}}) => {
      state.deleteLoading = artistId;
    });
    builder.addCase(removeArtist.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(removeArtist.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectOneArtist = (state: RootState) => state.artists.oneItem;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
export const selectOneArtistFetching = (state: RootState) => state.artists.fetchOneLoading;
export const selectArtistCreating = (state: RootState) => state.artists.createLoading;
export const selectArtistDeleting = (state: RootState) => state.artists.deleteLoading;