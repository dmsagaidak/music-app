import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackHistory, TrackHistoryMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const createTrackHistory = createAsyncThunk<void, { track: string }, {state: RootState}>(
  'trackHistory/create',
  async (track, {getState}) => {
    const user = getState().users.user;

    if(user){
      await axiosApi.post
      ('/track_history', track, {headers: {'Authorization': user.token}});
    }
  }
);

export const fetchTrackHistory = createAsyncThunk<TrackHistory[], void, {state: RootState}>(
  'trackHistory/fetchAll',
  async(_, {getState}) => {
    const user = getState().users.user;

    if(user) {
      const response = await axiosApi.get('/track_history', {headers: {'Authorization': user.token}});
      return response.data;
    }
  }
)