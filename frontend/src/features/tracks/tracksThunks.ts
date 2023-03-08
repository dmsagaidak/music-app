import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track, TrackMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracksByAlbum = createAsyncThunk<Track[], string>(
  'tracks/fetchByAlbum',
  async (id) => {
    const response = await axiosApi.get('/tracks?album=' + id);
    return response.data;
  }
);

export const createTrack = createAsyncThunk<void, TrackMutation>(
  'tracks/create',
  async (trackMutation) => {
    await axiosApi.post('/tracks', trackMutation);
  }
);

export const removeTrack = createAsyncThunk<void, string>(
  'tracks/remove',
  async(id) => {
    await axiosApi.delete('/tracks/' + id);
  }
)