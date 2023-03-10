import React from 'react';
import { Button, Card, CardContent, CardHeader, CardMedia, Grid, styled, Typography } from '@mui/material';
import noImage from '../../../assets/images/noimage.jpg'
import { apiUrl } from '../../../constants';
import {useNavigate } from 'react-router-dom';
import { Artist } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectArtistDeleting, selectArtistUpdating } from '../artistsSlice';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  artist: Artist;
  onDelete: (id: string) => void;
  onTogglePublished: (artist: Artist) => void;
}

const ArtistsItem: React.FC<Props> = ({artist, onDelete, onTogglePublished}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const artistDeleting = useAppSelector(selectArtistDeleting);
  const artistUpdating = useAppSelector(selectArtistUpdating);

  let cardImage = noImage;

  if (artist.image) {
    cardImage = apiUrl + '/' + artist.image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader title={artist.name}/>
        <ImageCardMedia image={cardImage} title={artist.name}/>
        <CardContent>
          {!artist.isPublished && (<Typography component='p' sx={{textAlign: 'center', color: 'red'}}>Unpublished</Typography>)}
          <Typography component='div' textAlign="center">
            <Button
              onClick={() => navigate('/artists/' + artist._id)}
              disabled={artistDeleting === artist._id || artistUpdating}
            >See more</Button>
          </Typography>
          <Typography component='div' textAlign='center'>
            {user?.role === 'admin' && (
              <>
                <Button
                  type="button"
                  color='error'
                  variant='contained'
                  onClick={() => onDelete(artist._id)}
                  disabled={artistDeleting === artist._id || artistUpdating}
                >Remove</Button>
                <Button
                  type="button"
                  color="secondary"
                  variant="contained"
                  style={{marginLeft: '5px'}}
                  onClick={() => onTogglePublished(artist)}
                  disabled={artistDeleting === artist._id || artistUpdating}
                >{artist.isPublished ? 'Unpublish': 'Publish'}</Button>
              </>
            )}
          </Typography>
        </CardContent>
      </Card>

    </Grid>
  );
};

export default ArtistsItem;