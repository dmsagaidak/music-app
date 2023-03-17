import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchAlbums = createAsyncThunk<Album[]>('albums/fetchAll', async () => {
  const response = await axiosApi.get('/albums');
  return response.data;
});

export const fetchAlbumsByArtist = createAsyncThunk<Album[], string>('albums/FetchByArtist', async (id) => {
  const response = await axiosApi.get('/albums?artist=' + id);
  return response.data;
});

export const fetchOneAlbum = createAsyncThunk<Album, string>('albums/FetchOne', async (id) => {
  const response = await axiosApi.get<Album | null>('/albums/' + id);
  const album = response.data;

  if (album === null) {
    throw new Error('Album not found');
  }

  return album;
});

export const createAlbum = createAsyncThunk<void, AlbumMutation>('albums/create', async (albumMutation) => {
  const formData = new FormData();
  const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
  keys.forEach((key) => {
    const value = albumMutation[key];
    if (value !== null) {
      formData.append(key, value.toString());
    }
  });
  await axiosApi.post('/albums', formData);
});

export const removeAlbum = createAsyncThunk<void, string>('albums/remove', async (id) => {
  await axiosApi.delete('/albums/' + id);
});

export const albumTogglePublished = createAsyncThunk<void, Album>('albums/togglePublished', async (album) => {
  await axiosApi.patch('/albums/' + album._id + '/togglePublished', album);
});
