import React from 'react';
import { Album } from '../../../types';
import { Button, Card, CardContent, CardHeader, CardMedia, Grid, styled, Typography } from '@mui/material';
import noImage from '../../../assets/images/noimage.jpg';
import { apiUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectAlbumDeleting, selectAlbumUpdating } from '../albumsSlice';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '100%',
});

interface Props {
  album: Album;
  onDelete: (id: string) => void;
  onTogglePublished: (album: Album)  => void;
}

const AlbumsItem: React.FC<Props> = ({album, onDelete, onTogglePublished}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const albumDeleting = useAppSelector(selectAlbumDeleting);
  const albumUpdating = useAppSelector(selectAlbumUpdating);

  let cardImage = noImage;

  if (album.image) {
    cardImage = apiUrl + '/' + album.image;
  }

  return (
      <Grid item width={"250px"}>
        <Card style={{textAlign: 'center'}}>
          <CardHeader title={album.title} />
          <Typography component={"div"} style={{width: '200px', marginLeft: "auto", marginRight: "auto"}}>
            <ImageCardMedia image={cardImage} title={album.title}/>
          </Typography>
          <CardContent>
            Issued in {album.year}
            {!album.isPublished && (<Typography component='p' sx={{textAlign: 'center', color: 'red'}}>Unpublished</Typography>)}
            <Button
              onClick={() => navigate('/albums/' + album._id)}
              disabled={albumDeleting === album._id || albumUpdating}
            >See details</Button>
            {user?.role === 'admin' &&
              (<Button
                type='button'
                color='error'
                variant='contained'
                onClick={() => onDelete(album._id)}
                disabled={albumDeleting === album._id || albumUpdating}
            >Remove</Button>)}
            <Typography component='div' style={{marginTop: '5px'}}>
              {user?.role === 'admin' && (
                <Button
                  type="button"
                  color="secondary"
                  variant="contained"
                  onClick={() => onTogglePublished(album)}
                  disabled={albumDeleting === album._id || albumUpdating}
                >{album.isPublished ? 'Unpublish' : 'Publish'}</Button>
              )}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
  );
};

export default AlbumsItem;