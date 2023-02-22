import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbumsByArtist } from './albumsThunks';
import { RootState } from '../../app/store';

interface AlbumsState {
  items: Album[];
  fetchLoading: boolean;
}

const initialState: AlbumsState = {
  items: [],
  fetchLoading: false
}

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsByArtist.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbumsByArtist.fulfilled, (state, {payload}) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchAlbumsByArtist.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;