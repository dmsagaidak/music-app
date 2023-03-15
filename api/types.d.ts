import { ObjectId } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  image: string | null;
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
