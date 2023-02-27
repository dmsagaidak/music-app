import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {  useParams } from 'react-router-dom';
import { fetchOneAlbum } from './albumsThunks';
import { selectOneAlbum, selectOneAlbumFetching } from './albumsSlice';
import { fetchTracksByAlbum } from '../tracks/tracksThunks';
import { selectTracks, selectTracksFetching } from '../tracks/tracksSlice';
import { Typography } from '@mui/material';
import noImage from '../../assets/images/noimage.jpg';
import { apiUrl, frontUrl } from '../../constants';
import Progress from '../../components/UI/Progress/Progress';
import TrackItem from '../tracks/components/TrackItem';

const AlbumPage = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const album = useAppSelector(selectOneAlbum);
  const tracks = useAppSelector(selectTracks);
  const albumLoading = useAppSelector(selectOneAlbumFetching);
  const tracksLoading = useAppSelector(selectTracksFetching);


  useEffect(() => {
    void dispatch(fetchOneAlbum(id));
    void dispatch(fetchTracksByAlbum(id));
  }, [dispatch, id]);

  let albumImg = noImage;

  if(album?.image){
    albumImg = apiUrl + '/' + album.image;
  }

  return (
    <>
      {albumLoading ? <Progress/> :
        <>
          <Typography component="img" src={albumImg} alt={album?.title} style={{float: 'right', width: '150px'}}/>
          <Typography variant="h4" sx={{mb: 3}}>{album?.title} </Typography>
          <Typography component={"span"}>by
            <Typography
              component={"a"} href={frontUrl + '/artists/' + album?.artist._id}
              style={{textDecoration: 'none'}}> {album?.artist.name}
            </Typography>
          </Typography>
          <Typography component={"p"} sx={{mt: 2}}>Issued in {album?.year}</Typography>
          <Typography variant={"h5"} sx={{mt: 2, mb: 2}}>Track list</Typography>
        </>
      }

      {tracksLoading ? <Progress/> : tracks.map(track => (
        <TrackItem
        key={track._id}
        track={track}
        />
      ))}
    </>
  );
};

export default AlbumPage;