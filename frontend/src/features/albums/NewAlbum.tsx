import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Navigate } from 'react-router-dom';
import { AlbumMutation } from '../../types';
import { createAlbum } from './albumsThunks';
import { Typography } from '@mui/material';
import AlbumForm from './components/AlbumForm';
import { selectUser } from '../users/usersSlice';

const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (mutation: AlbumMutation) => {
    try {
      await dispatch(createAlbum(mutation));
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New Album
      </Typography>
      <AlbumForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewAlbum;
