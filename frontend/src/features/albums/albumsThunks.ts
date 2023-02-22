import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchAlbumsByArtist = createAsyncThunk<Album[], string>(
  'albums/FetchByArtist',
  async (id) => {
    const response = await axiosApi.get('/albums?artist=' + id);
    return response.data;
  }
);

export const fetchOneAlbum =  createAsyncThunk<Album, string>(
  'albums/FetchOne',
  async (id) => {
    const response = await axiosApi.get<Album | null>('/albums/' + id);
    const album = response.data;

    if(album === null){
      throw new Error('Album not found');
    }

    return album;
  }
)