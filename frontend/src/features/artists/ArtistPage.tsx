import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneArtist, selectOneArtistFetching } from './artistsSlice';
import { fetchOneArtist } from './artistsThunks';
import { selectAlbums, selectAlbumsFetching } from '../albums/albumsSlice';
import { albumTogglePublished, fetchAlbumsByArtist, removeAlbum } from '../albums/albumsThunks';
import { Grid, Typography } from '@mui/material';
import AlbumsItem from '../albums/components/AlbumsItem';
import noImage from '../../assets/images/noimage.jpg'
import { apiUrl } from '../../constants';
import Progress from '../../components/UI/Progress/Progress';
import { Album } from '../../types';

const ArtistPage = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectOneArtist);
  const albums = useAppSelector(selectAlbums);
  const artistLoading = useAppSelector(selectOneArtistFetching);
  const albumsLoading = useAppSelector(selectAlbumsFetching);


  useEffect(() => {
    void dispatch(fetchOneArtist(id));
    void dispatch(fetchAlbumsByArtist(id));

  }, [dispatch, id]);

  const deleteAlbum = async (albumId: string) => {
    if(window.confirm('Do you really want to delete this album?')){
      await dispatch(removeAlbum(albumId));
      await dispatch(fetchAlbumsByArtist(id));
    }
  };

  const togglePublished = async (album: Album) => {
    album.isPublished ?
    await dispatch(albumTogglePublished({...album, isPublished: false})) :
    await dispatch(albumTogglePublished({...album, isPublished: true}));
    await dispatch(fetchAlbumsByArtist(id));
  };

  let artistPic = noImage;

  if(artist?.image) {
    artistPic = apiUrl + '/' + artist.image;
  }

  return (
    <>
    {artistLoading ? <Progress/> :
      <>
        <Typography component="img" src={artistPic} alt={artist?.name} style={{float: 'right', width: '250px'}}/>
        <Typography variant="h4" sx={{mb: 2}}>{artist?.name}</Typography>
        {artist?.info ? <Typography component="p"><strong>Bio:</strong> {artist.info}</Typography> :
          <Typography component="p"><strong>Bio is unavailable</strong></Typography>}

        <Typography variant="h5" sx={{mt: 1}}>Albums</Typography>
      </>
      }
      <Grid container direction="row" spacing={2}>
        {albumsLoading ? <Progress/> : albums.map(album => (
          <AlbumsItem
          key={album._id}
          album={album}
          onDelete={() => deleteAlbum(album._id)}
          onTogglePublished={() => togglePublished(album)}
          />
        ))}
      </Grid>
    </>
  );
};

export default ArtistPage;