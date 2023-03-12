import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  albumTogglePublished,
  createAlbum,
  fetchAlbums,
  fetchAlbumsByArtist,
  fetchOneAlbum,
  removeAlbum,
} from './albumsThunks';
import { RootState } from '../../app/store';

interface AlbumsState {
  items: Album[];
  oneItem: Album | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
  updateLoading: boolean;
}

const initialState: AlbumsState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsByArtist.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbumsByArtist.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchAlbumsByArtist.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneAlbum.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneAlbum.fulfilled, (state, { payload }) => {
      state.fetchOneLoading = false;
      state.oneItem = payload;
    });
    builder.addCase(fetchOneAlbum.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(createAlbum.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(removeAlbum.pending, (state, { meta: { arg: albumId } }) => {
      state.deleteLoading = albumId;
    });
    builder.addCase(albumTogglePublished.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(albumTogglePublished.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(albumTogglePublished.rejected, (state) => {
      state.updateLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;
export const selectOneAlbum = (state: RootState) => state.albums.oneItem;
export const selectOneAlbumFetching = (state: RootState) => state.albums.fetchOneLoading;
export const selectAlbumCreating = (state: RootState) => state.albums.createLoading;
export const selectAlbumDeleting = (state: RootState) => state.albums.deleteLoading;
export const selectAlbumUpdating = (state: RootState) => state.albums.updateLoading;
