import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { fetchOneAlbum } from './albumsThunks';
import { selectOneAlbum } from './albumsSlice';
import { fetchTracksByAlbum } from '../tracks/tracksThunks';
import { selectTracks } from '../tracks/tracksSlice';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Card, Grid, Typography } from '@mui/material';
import noImage from '../../assets/images/noimage.jpg';
import { apiUrl, frontUrl } from '../../constants';

const _ = require('lodash');

const AlbumPage = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const album = useAppSelector(selectOneAlbum);
  let tracks = useAppSelector(selectTracks);
  tracks = _.sortBy(tracks, ['tracknumber']);

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
      <img src={albumImg} alt={album?.title} style={{float: 'right', width: '150px'}}/>
      <h3 style={{marginBottom: '0'}}>{album?.title}</h3>
      <span>by <a href={frontUrl + '/artists/' + album?.artist._id} style={{textDecoration: 'none'}}>{album?.artist.name}</a></span>
      <p>Issued in {album?.year}</p>
      <h4>Track list</h4>
      {tracks.map(track => (
        <Card sx={{mb: 1}} key={track._id}>
          <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center">
              <Typography component="span" style={{paddingLeft: '9px', paddingRight: '9px', width: '15px'}}>{track.tracknumber}</Typography>
                <PlayCircleFilledIcon width={"10px"} height={"10px"}/>
              <Typography component={"span"} width={"550px"}>
                {track.title}
              </Typography>
              <Typography component={"span"}>
                {track.duration}
              </Typography>
          </Grid>
        </Card>
      ))}
    </>
  );
};

export default AlbumPage;