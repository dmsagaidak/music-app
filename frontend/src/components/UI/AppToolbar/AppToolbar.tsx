import React from 'react';
import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2, background: '#000'}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">Music App</Link>
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );

};



export default AppToolbar;