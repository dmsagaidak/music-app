import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracksByAlbum = createAsyncThunk<Track[], string>(
  'tracks/fetchByAlbum',
  async (id) => {
    const response = await axiosApi.get('/tracks?album=' + id);
    return response.data;
  }
)