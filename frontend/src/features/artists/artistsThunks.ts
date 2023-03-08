import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, ArtistMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get('/artists');
    return response.data;
  }
);

export const fetchOneArtist = createAsyncThunk<Artist, string>(
  'artists/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Artist | null>('/artists/' + id);
    const artist = response.data;

    if(artist === null) {
      throw new Error('Artist not found')
    }

    return artist;
  }
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/create',
  async (artistMutation) => {
    const formData = new FormData();
    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
    keys.forEach(key => {
      const value = artistMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/artists', formData);
  }
);

export const removeArtist = createAsyncThunk<void, string>(
  'artists/remove',
  async (id) => {
    await axiosApi.delete('/artists/' + id);
  }
)