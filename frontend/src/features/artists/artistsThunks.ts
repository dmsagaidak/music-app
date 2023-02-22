import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../../types';
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
)