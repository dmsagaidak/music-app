import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { fetchOneAlbum } from './albumsThunks';
import { selectOneAlbum } from './albumsSlice';
import { fetchTracksByAlbum } from '../tracks/tracksThunks';
import { selectTracks } from '../tracks/tracksSlice';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
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



  return (
    <>
      <h3>{album?.title}</h3>
      <span>by {album?.artist.name}</span>
      <p>Issued in {album?.year}</p>
      <h4>Tracklist</h4>
      {tracks.map(track => (
        <div key={track._id}>{track.tracknumber} <PlayCircleFilledIcon/> {track.title}{track.duration}</div>
      ))}
    </>
  );
};

export default AlbumPage;