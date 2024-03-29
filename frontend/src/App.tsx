import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import ArtistPage from './features/artists/ArtistPage';
import AlbumPage from './features/albums/AlbumPage';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TrackHistory from './features/trackHistory/TrackHistory';
import NewAlbum from './features/albums/NewAlbum';
import NewArtist from './features/artists/NewArtist';
import NewTrack from './features/tracks/NewTrack';

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/artists/:id" element={<ArtistPage />} />
            <Route path="/albums/:id" element={<AlbumPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/track_history" element={<TrackHistory />} />
            <Route path="/albums/new" element={<NewAlbum />} />
            <Route path="/artists/new" element={<NewArtist />} />
            <Route path="/tracks/new" element={<NewTrack />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
