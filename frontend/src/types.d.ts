export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  info: string;
  isPublished: boolean;
}

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  year: number;
  image: string | null;
  isPublished: boolean;
}

export interface Track {
  _id: string;
  tracknumber: number;
  title: string;
  album: Album;
  duration: string;
  video: string | null;
  isPublished: boolean;
}


export interface ArtistMutation {
  name: string;
  image: string | null;
  info: string;
  isPublished: boolean;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  year: number;
  image: string | null;
  isPublished: boolean;
}

export interface TrackMutation {
  tracknumber: number;
  title: string;
  album: string;
  duration: string;
  isPublished: boolean;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory {
  _id: string;
  user: string;
  track: Track;
  artist: Artist;
  datetime: string;
}
