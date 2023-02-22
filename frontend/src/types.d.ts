export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  info: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  year: number;
  image: string | null;
}