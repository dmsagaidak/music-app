import React from 'react';
import { Button, Card, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import noImage from '../../../assets/images/noimage.jpg'
import { apiUrl } from '../../../constants';
import {useNavigate } from 'react-router-dom';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  name: string;
  image: string | null;
  info: string;
}

const ArtistsItem: React.FC<Props> = ({id, name,image,info}) => {
  const navigate = useNavigate();
  let cardImage = noImage;

  if (image) {
    cardImage = apiUrl + '/' + image;
  }


  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader title={name}/>
        <ImageCardMedia image={cardImage} title={name}/>
        <CardContent>
          <Button onClick={() => navigate('/artists/' + id)}>See more</Button>
        </CardContent>
      </Card>

    </Grid>
  );
};

export default ArtistsItem;