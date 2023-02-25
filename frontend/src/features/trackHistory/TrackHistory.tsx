import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTrackHistory } from './trackHistoryThunks';
import { selectTrackHistory } from './trackHistorySlice';
import { Card, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { selectUser } from '../users/usersSlice';
import { Navigate } from 'react-router-dom';
import { frontUrl } from '../../constants';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    void dispatch(fetchTrackHistory());
  }, [dispatch]);

  if(!user){
    return <Navigate to={'/login'}/>
  }

  return (
    <Grid container direction="column" spacing={2}>
      {trackHistory.length ? (<Typography component={'h1'} variant={'h4'} sx={{m: 2}}>I listened to...</Typography>) :
        (<>
            <Typography component={'h1'} variant={'h4'} sx={{m: 2}}>
              My track history is empty
            </Typography>
            <Typography component={'a'} href={frontUrl} sx={{ml: 2}} style={{textDecoration: 'none'}}>It's time to listen to some music</Typography>
         </>
        )}

      {trackHistory.map(item => (
        <Card
          key={item._id}
          sx={{m: 1}}>
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