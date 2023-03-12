import { ObjectId } from 'mongoose';

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

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface TrackHistoryMutation {
  user: string;
  track: string;
  artist: string;
  datetime: string;
}

export interface ApiTrack {
  tracknumber: number;
  title: string;
  album: {
    _id: ObjectId;
    artist: ObjectId;
  };
  duration: string;
}
