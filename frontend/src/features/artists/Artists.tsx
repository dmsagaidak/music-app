import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists } from './artistsSlice';
import { fetchArtists } from './artistsThunks';
import { Grid } from '@mui/material';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  console.log(artists)

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>

      </Grid>
    </Grid>
  );
};

export default Artists;