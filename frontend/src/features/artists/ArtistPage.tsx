import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneArtist } from './artistsSlice';
import { fetchOneArtist } from './artistsThunks';
import { selectAlbums } from '../albums/albumsSlice';
import { fetchAlbumsByArtist } from '../albums/albumsThunks';
import { Grid } from '@mui/material';
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
      <img src={artistPic} alt={artist?.name} style={{float: 'right', width: '250px'}}/>
      <h3>{artist?.name}</h3>
      {artist?.info ? (
        <div><strong>Bio: </strong>{artist.info}</div>
      ): (<div><strong>Bio is unavailable</strong></div>)}
      <h4>Albums</h4>
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