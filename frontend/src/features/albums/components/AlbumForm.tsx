import React, { useEffect, useState } from 'react';
import { AlbumMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtists } from '../../artists/artistsSlice';
import { fetchArtists } from '../../artists/artistsThunks';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { selectAlbumCreating } from '../albumsSlice';

interface Props {
  onSubmit: (mutation: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albumCreating = useAppSelector(selectAlbumCreating);

  const [state, setState] = useState<AlbumMutation>({
    title: '',
    artist: '',
    year: '',
    image: null
  });

  useEffect(() => {
    dispatch(fetchArtists());
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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null
    }));
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
            label="Artist"
            name="artist"
            value={state.artist}
            onChange={inputChangeHandler}
            required
            disabled={albumCreating}
          >
            <MenuItem value={''} disabled>Please, select an artist</MenuItem>
            {artists.map(artist => (
              <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
            disabled={albumCreating}
          />
        </Grid>
        <Grid item xs>
          <TextField
          id="year"
          label="Year"
          onChange={inputChangeHandler}
          name="year"
          required
          disabled={albumCreating}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            name="image"
            label="Image"
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={albumCreating}
          >Create album</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;