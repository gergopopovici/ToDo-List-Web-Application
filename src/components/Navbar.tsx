import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  username: string;
  onSignOut: () => void;
}

function Navbar({ username, onSignOut }: NavbarProps) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome {username}
        </Typography>
        <IconButton color="inherit" onClick={handleSignOut}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export { Navbar };
