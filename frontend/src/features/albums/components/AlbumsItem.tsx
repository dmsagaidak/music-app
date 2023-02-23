import React from 'react';
import { Artist } from '../../../types';
import { Button, Card, CardContent, CardHeader, CardMedia, Grid, styled, Typography } from '@mui/material';
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
      <Grid item width={"250px"}>
        <Card style={{textAlign: 'center'}}>
          <CardHeader title={title} />
          <Typography component={"div"} style={{width: '200px', marginLeft: "auto", marginRight: "auto"}}>
            <ImageCardMedia image={cardImage} title={title}/>
          </Typography>
          <CardContent>
            Issued in {year}
            <Button onClick={() => navigate('/albums/' + id)}>See details</Button>
          </CardContent>
        </Card>
      </Grid>
  );
};

export default AlbumsItem;