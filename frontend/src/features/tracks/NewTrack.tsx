import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectUser } from '../users/usersSlice';
import { TrackMutation } from '../../types';
import { createTrack } from './tracksThunks';
import { Typography } from '@mui/material';
import TrackForm from './components/TrackForm';

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (mutation: TrackMutation) => {
    try{
      await dispatch(createTrack(mutation));
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
      <Typography variant="h4" sx={{mb: 2}}>New track</Typography>
      <TrackForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewTrack;