import React, { useState } from 'react';
import { Box, Button, Card, Grid, IconButton, Modal, Typography } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Track } from '../../../types';
import { createTrackHistory } from '../../trackHistory/trackHistoryThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectTrackHistoryCreateLoading } from '../../trackHistory/trackHistorySlice';
import ReactPlayer from 'react-player'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { selectTrackDeleting, selectTrackUpdating } from '../tracksSlice';

interface Props {
  track: Track;
  onDelete: (id: string) => void;
  onTogglePublished: (track: Track) => void;
}

const TrackItem: React.FC<Props> = ({onDelete, track, onTogglePublished}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const trackHistoryCreating = useAppSelector(selectTrackHistoryCreateLoading);
  const trackDeleting = useAppSelector(selectTrackDeleting);
  const trackUpdating = useAppSelector(selectTrackUpdating);

  const [open, setOpen] = useState(false);

  const sendTrackHistory = async (trackId: string) => {
    if(user){
      await dispatch(createTrackHistory({track: trackId}));
    }
  };


  const playVideo = async (trackId: string) => {
    await sendTrackHistory(trackId);
    setOpen(true);
  };


  return (
    <>
      <Card sx={{mb: 1}} key={track._id}>
        <Grid container
              direction="row"
              justifyContent="space-around"
              alignItems="center">
          <Typography component="span" style={{paddingLeft: '9px', paddingRight: '9px', width: '15px'}}>{track.tracknumber}</Typography>
          {user? (<Typography component={'div'} width={'100px'}>
            <IconButton
              type="button"
              disabled={trackHistoryCreating || trackDeleting === track._id || trackUpdating}
              onClick={() => sendTrackHistory(track._id)}
            ><PlayCircleFilledIcon width={"10px"} height={"10px"}/>
            </IconButton>
            {track.video ? (<IconButton
              type="button"
              onClick={() => playVideo(track._id)}
              disabled={trackHistoryCreating || trackDeleting === track._id || trackUpdating}
            >
              <YouTubeIcon/>
            </IconButton>) : (<Typography component={'div'} width={'40px'}></Typography>)
            }
          </Typography>) : (<Typography component={'div'} width={'100px'}></Typography>)}
          <Typography component={"span"} width={"550px"}>
            {track.title}
          </Typography>
          <Typography component={"span"}>
            {track.duration}
          </Typography>
          {user?.role === 'admin' && (
            <>
              <Button
                type="button"
                color='error'
                variant='contained'
                onClick={() => onDelete(track._id)}
                disabled={trackUpdating || trackDeleting === track._id || trackHistoryCreating}
              >Remove</Button>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => onTogglePublished(track)}
                disabled={trackUpdating || trackDeleting === track._id || trackHistoryCreating}
              >{track.isPublished ? 'Unpublish' : 'Publish'}</Button>
          </>
          )}
        </Grid>
        {!track.isPublished && <Typography component='span' width='100px' color='red' textAlign='center'>Unpublished</Typography>}
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box position={'absolute'} top={'30%'} left={'30%'}>
          <ReactPlayer  url={track.video!} />
        </Box>
      </Modal>
    </>
  );
};

export default TrackItem;