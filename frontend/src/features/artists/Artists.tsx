import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists } from './artistsSlice';
import { fetchArtists } from './artistsThunks';
import { Grid } from '@mui/material';
import ArtistsItem from './components/ArtistsItem';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>
        {artists.map(artist => (
          <ArtistsItem
            key={artist._id}
            id={artist._id}
            name={artist.name}
            image={artist.image}
            info={artist.info}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Artists;