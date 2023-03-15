import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunks';
import { apiUrl } from '../../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  let userImg;

  if (user.image && user.googleId) {
    userImg = user.image;
  } else {
    userImg = apiUrl + '/' + user.image;
  }

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        <Typography
          component="img"
          src={userImg}
          alt={user.displayName}
          style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '15px' }}
        />{' '}
        Hello, {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={() => navigate('/track_history')}>My track history</MenuItem>
        <MenuItem onClick={() => navigate('/artists/new')}>Add new artist</MenuItem>
        <MenuItem onClick={() => navigate('/albums/new')}>Add new album</MenuItem>
        <MenuItem onClick={() => navigate('/tracks/new')}>Add new track</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
