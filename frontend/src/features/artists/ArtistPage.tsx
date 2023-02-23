import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneArtist } from './artistsSlice';
import { fetchOneArtist } from './artistsThunks';
import { selectAlbums } from '../albums/albumsSlice';
import { fetchAlbumsByArtist } from '../albums/albumsThunks';
import { Grid, Typography } from '@mui/material';
import AlbumsItem from '../albums/components/AlbumsItem';
import noImage from '../../assets/images/noimage.jpg'
import { apiUrl } from '../../constants';

const ArtistPage = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectOneArtist);
  let albums = useAppSelector(selectAlbums);


  useEffect(() => {
    void dispatch(fetchOneArtist(id));
    void dispatch(fetchAlbumsByArtist(id));

  }, [dispatch, id]);

  let artistPic = noImage;

  if(artist?.image) {
    artistPic = apiUrl + '/' + artist.image;
  }

  return (
    <>
      <Typography component="img" src={artistPic} alt={artist?.name} style={{float: 'right', width: '250px'}}/>
      <Typography variant="h4" sx={{mb: 2}}>{artist?.name}</Typography>
      {artist?.info ? <Typography component="p"><strong>Bio:</strong> {artist.info}</Typography> :
        <Typography component="p"><strong>Bio is unavailable</strong></Typography>}

      <Typography variant="h5" sx={{mt: 1}}>Albums</Typography>
      <Grid container direction="row" spacing={2}>
        {albums.map(album => (
          <AlbumsItem
          key={album._id}
          id={album._id}
          title={album.title}
          artist={album.artist}
          year={album.year}
          image={album.image}
          />
        ))}
      </Grid>
    </>
  );
};

export default ArtistPage;