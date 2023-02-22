export interface ArtistMutation {
    name: string;
    image: string | null;
    info: string;
}

export interface AlbumMutation {
    title: string;
    artist: string;
    year: number;
    image: string | null;
}

export interface TrackMutation {
    tracknumber: number;
    title: string;
    album: string;
    duration: string;
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface TrackHistoryMutation {
    user: string;
    track: string;
    datetime: string;
}