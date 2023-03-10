import React, { useEffect, useState } from 'react';
import { TrackMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAlbums } from '../../albums/albumsSlice';
import { selectTrackCreating } from '../tracksSlice';
import { fetchAlbums } from '../../albums/albumsThunks';
import { Button, Grid, MenuItem, TextField } from '@mui/material';

interface Props {
  onSubmit: (mutation: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const trackCreating = useAppSelector(selectTrackCreating);

  const [state, setState] = useState<TrackMutation>({
    tracknumber: '',
    title: '',
    album: '',
    duration: '',
    video: ''
  });

  useEffect(() => {
    void dispatch(fetchAlbums());
    console.log(albums)
  }, [dispatch]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction={'column'} spacing={2}>
        <Grid item xs>
          <TextField
            select
            label="Album"
            name="album"
            value={state.album}
            onChange={inputChangeHandler}
            required
            disabled={trackCreating}
          >
            <MenuItem value={''} disabled>Please, select an album</MenuItem>
            {albums.map(album => (
              <MenuItem key={album._id} value={album._id}>{album.title}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="tracknumber"
            label="Track number"
            value={state.tracknumber}
            onChange={inputChangeHandler}
            name='tracknumber'
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name='title'
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="duration"
            label="Duration"
            value={state.duration}
            onChange={inputChangeHandler}
            name='duration'
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="video"
            label="Video"
            value={state.video}
            onChange={inputChangeHandler}
            name='video'
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={trackCreating || state.album === '' || isNaN(parseInt(state.tracknumber)) ||
              parseInt(state.tracknumber) < 1 || state.title === '' || state.duration === ''}
          >Create track</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;