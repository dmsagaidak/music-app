import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackHistory } from '../../types';
import axiosApi from '../../axiosApi';

export const createTrackHistory = createAsyncThunk<void, { track: string }>(
  'trackHistory/create',
  async (track) => {
      await axiosApi.post
      ('/track_history', track);
  }
);

export const fetchTrackHistory = createAsyncThunk<TrackHistory[]>(
  'trackHistory/fetchAll',
  async() => {
      const response = await axiosApi.get('/track_history');
      return response.data;
  }
);