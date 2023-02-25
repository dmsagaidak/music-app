import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import ArtistPage from './features/artists/ArtistPage';
import AlbumPage from './features/albums/AlbumPage';
import Register from './features/users/Register';
import Login from './features/users/Login';

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path='/' element={<Artists/>}/>
            <Route path='/artists/:id' element={<ArtistPage/>}/>
            <Route path='/albums/:id' element={<AlbumPage/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path="*" element={<h1>Not found!</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
