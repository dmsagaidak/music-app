import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterMutation, RegisterResponse, User } from '../../types';
import axiosApi from '../../axiosApi';

export const register = createAsyncThunk<User, RegisterMutation>(
  'users/register',
  async (registerMutation: RegisterMutation) => {
    const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
    return response.data.user;
  }
)