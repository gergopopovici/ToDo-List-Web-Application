import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
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

  const handleSignOut = () => {
    onSignOut();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
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
