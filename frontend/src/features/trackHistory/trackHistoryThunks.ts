import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackHistoryMutation } from '../../types';
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
)