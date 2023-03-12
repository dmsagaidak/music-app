import React, { useState } from 'react';
import { ArtistMutation } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectArtistCreating } from '../artistsSlice';
import { Button, Grid, TextField } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';

interface Props {
  onSubmit: (mutation: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
  const artistCreating = useAppSelector(selectArtistCreating);

  const [state, setState] = useState<ArtistMutation>({
    name: '',
    image: null,
    info: '',
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction={'column'} spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
            disabled={artistCreating}
          />
        </Grid>
        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
        </Grid>
        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="info"
            label="Information about artist"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
            disabled={artistCreating}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained" disabled={artistCreating || state.name === ''}>
            Create artist
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;
