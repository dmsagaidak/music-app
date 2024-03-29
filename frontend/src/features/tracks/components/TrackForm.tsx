import React, { useEffect, useState } from 'react';
import { TrackMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAlbums } from '../../albums/albumsSlice';
import { selectTrackCreating } from '../tracksSlice';
import { fetchAlbums } from '../../albums/albumsThunks';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSubmit: (mutation: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const trackCreating = useAppSelector(selectTrackCreating);
  const navigate = useNavigate();

  const [state, setState] = useState<TrackMutation>({
    tracknumber: 0,
    title: '',
    album: '',
    duration: '',
    video: '',
  });

  useEffect(() => {
    void dispatch(fetchAlbums());
  }, [dispatch]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    navigate('/albums/' + state.album);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
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
            <MenuItem value={''} disabled>
              Please, select an album
            </MenuItem>
            {albums.map((album) => (
              <MenuItem key={album._id} value={album._id}>
                {album.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            type="number"
            id="tracknumber"
            label="Track number"
            value={state.tracknumber}
            onChange={inputChangeHandler}
            name="tracknumber"
            InputProps={{ inputProps: { min: 1 } }}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField id="title" label="Title" value={state.title} onChange={inputChangeHandler} name="title" required />
        </Grid>
        <Grid item xs>
          <TextField
            id="duration"
            label="Duration"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField id="video" label="Video" value={state.video} onChange={inputChangeHandler} name="video" />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained" disabled={trackCreating}>
            Create track
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;
