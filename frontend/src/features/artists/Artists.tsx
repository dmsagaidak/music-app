import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectArtistsFetching } from './artistsSlice';
import { artistTogglePublished, fetchArtists, removeArtist } from './artistsThunks';
import { Grid } from '@mui/material';
import ArtistsItem from './components/ArtistsItem';
import Progress from '../../components/UI/Progress/Progress';
import { Artist } from '../../types';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const artistsFetching = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const deleteArtist = async (id: string) => {
    if(window.confirm('Do you really want to delete this artist?')){
      await dispatch(removeArtist(id));
      await dispatch(fetchArtists());
    }
  };

  const togglePublished = async (artist: Artist) => {
    artist.isPublished ?
    await dispatch(artistTogglePublished({...artist, isPublished: true})) :
    await dispatch(artistTogglePublished({...artist, isPublished: false}))
    await dispatch(fetchArtists());
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>
        {artistsFetching ? <Progress/> : artists.map(artist => (
          <ArtistsItem
            key={artist._id}
            artist={artist}
            onDelete={() => deleteArtist(artist._id)}
            onTogglePublished={() => togglePublished(artist)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Artists;