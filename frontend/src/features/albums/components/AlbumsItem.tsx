import React from 'react';
import { Artist } from '../../../types';
import { Card, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import noImage from '../../../assets/images/noimage.jpg';
import { apiUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '100%',
});

interface Props {
  id: string;
  title: string;
  artist: Artist;
  year: number;
  image: string | null;
}

const AlbumsItem: React.FC<Props> = ({id, title,artist,year,image}) => {
  const navigate = useNavigate();

  let cardImage = noImage;

  if (image) {
    cardImage = apiUrl + '/' + image;
  }

  return (
    <Grid item>
      <Card onClick={() => navigate('/albums/' + id)}>
        <CardHeader title={title}/>
        <div style={{width: '300px'}}>
          <ImageCardMedia image={cardImage} title={title}/>
        </div>
        <CardContent>
          Issued in {year}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AlbumsItem;