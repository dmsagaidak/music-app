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

const AlbumPage = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const album = useAppSelector(selectOneAlbum);
  let tracks = useAppSelector(selectTracks);

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
      <Typography component="img" src={albumImg} alt={album?.title} style={{float: 'right', width: '150px'}}/>
      <Typography variant="h4" sx={{mb: 3}}>{album?.title} </Typography>
      <Typography component={"span"}>by
        <Typography
          component={"a"} href={frontUrl + '/artists/' + album?.artist._id}
          style={{textDecoration: 'none'}}>{album?.artist.name}
        </Typography>
      </Typography>
      <Typography component={"p"} sx={{mt: 2}}>Issued in {album?.year}</Typography>
      <Typography variant={"h5"} sx={{mt: 2, mb: 2}}>Track list</Typography>

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