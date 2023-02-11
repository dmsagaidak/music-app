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