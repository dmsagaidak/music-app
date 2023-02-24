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

export interface Track {
  _id: string;
  tracknumber: number;
  title: string;
  album: Album;
  duration: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}