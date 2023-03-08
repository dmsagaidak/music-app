import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectUser } from '../users/usersSlice';
import { ArtistMutation } from '../../types';
import { createArtist } from './artistsThunks';
import { Typography } from '@mui/material';
import ArtistForm from './components/ArtistForm';

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (mutation: ArtistMutation) => {
    try{
      await dispatch(createArtist(mutation));
      navigate('/');
    }catch (e) {
      console.log(e);
    }
  }

  if(!user){
    return <Navigate to={'/login'}/>
  }

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>New Album</Typography>
      <ArtistForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewArtist;