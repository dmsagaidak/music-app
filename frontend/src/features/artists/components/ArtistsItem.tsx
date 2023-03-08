import React from 'react';
import { Button, Card, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import noImage from '../../../assets/images/noimage.jpg'
import { apiUrl } from '../../../constants';
import {useNavigate } from 'react-router-dom';
import { Artist } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectArtistDeleting } from '../artistsSlice';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  artist: Artist;
  onDelete: (id: string) => void;
}

const ArtistsItem: React.FC<Props> = ({artist, onDelete}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const artistDeleting = useAppSelector(selectArtistDeleting);

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
          <Button
            onClick={() => navigate('/artists/' + artist._id)}
            disabled={artistDeleting === artist._id}
          >See more</Button>
          {user?.role === 'admin' && (
            <Button
              type="button"
              color='error'
              variant='contained'
              onClick={() => onDelete(artist._id)}
              disabled={artistDeleting === artist._id}
            >Remove</Button>
          )}
        </CardContent>
      </Card>

    </Grid>
  );
};

export default ArtistsItem;