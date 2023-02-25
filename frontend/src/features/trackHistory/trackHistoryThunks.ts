import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackHistory, TrackHistoryMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const createTrackHistory = createAsyncThunk<void, TrackHistoryMutation, {state: RootState}>(
  'trackHistory/create',
  async (trackHistoryMutation, {getState}) => {
    const user = getState().users.user;

    if(user){
      await axiosApi.post<TrackHistoryMutation>
      ('/track_history', trackHistoryMutation, {headers: {'Authorization': user.token}});
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