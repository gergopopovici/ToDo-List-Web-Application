import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { ExitToApp as ExitToAppIcon, Home as HomeIcon } from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  username: string;
  admin: boolean;
  onSignOut: () => void;
}

function Navbar({ username, admin, onSignOut }: NavbarProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === '/toDos';
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  const handleSignOut = () => {
    onSignOut();
    navigate('/login');
  };

  const handleFrontPage = () => {
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ height: '64px', width: '100%' }}>
      <Toolbar>
        {!isHomePage && !isLoginPage && !isRegisterPage && (
          <IconButton color="inherit" onClick={handleFrontPage} sx={{ mr: 2 }} title={t('home')}>
            <HomeIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('welcome')} {username || ''}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {admin && (
            <Button component={Link} to="/users" color="inherit" sx={{ textTransform: 'none' }}>
              {t('users')}
            </Button>
          )}
          <ThemeSwitcher />
          <LanguageSwitcher />
          {username && (
            <IconButton color="inherit" onClick={handleSignOut} title={t('signout')}>
              <ExitToAppIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
