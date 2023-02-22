import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchAlbumsByArtist = createAsyncThunk<Album[], string>(
  'albums/FetchByArtist',
  async (id) => {
    const response = await axiosApi.get('/albums?artist=' + id);
    return response.data;
  }
)