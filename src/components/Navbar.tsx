import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { ExitToApp as ExitToAppIcon, Home as HomeIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  username: string;
  onSignOut: () => void;
}

function Navbar({ username, onSignOut }: NavbarProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === '/toDos';
  const isLoginPage = location.pathname === '/login';

  const handleSignOut = () => {
    onSignOut();
    navigate('/login');
  };

  const handleFrontPage = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {!isHomePage && !isLoginPage && (
          <IconButton color="inherit" onClick={handleFrontPage} sx={{ mr: 2 }}>
            <HomeIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('welcome')} {username || ''}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </Box>
        {username && (
          <IconButton color="inherit" onClick={handleSignOut}>
            <ExitToAppIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
