import React from 'react';
import { Artist } from '../../../types';

interface Props {
  id: string;
  title: string;
  artist: Artist;
  year: number;
  image: string | null;
}

const AlbumsItem: React.FC<Props> = ({id, title,artist,year,image}) => {
  return (
    <>
      Album {title} will be here
    </>
  );
};

export default AlbumsItem;