import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTrackHistory } from './trackHistoryThunks';
import { selectTrackHistory } from './trackHistorySlice';
import { fetchOneArtist } from '../artists/artistsThunks';
import { Card, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);

  useEffect(() => {
    void dispatch(fetchTrackHistory());
  }, [dispatch]);

  console.log(trackHistory);
  return (
    <Grid container direction="column" spacing={2}>
      <Typography component={'h1'} variant={'h4'} sx={{m: 2}}>I listened to...</Typography>
      {trackHistory.map(item => (
        <Card sx={{m: 1}}>
          <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center">
            <Typography component={'span'} style={{paddingLeft: '10px', width: '200px'}}>{item.track.title}</Typography>
            <Typography component={'span'} width={'200px'}>by {item.artist.name}</Typography>
            <Typography component={'span'}>at {dayjs(item.datetime).format('DD.MM.YYYY HH:mm')}</Typography>
          </Grid>
        </Card>
      ))}
    </Grid>
  );
};

export default TrackHistory;