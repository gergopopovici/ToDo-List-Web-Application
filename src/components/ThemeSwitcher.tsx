import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PaletteIcon from '@mui/icons-material/Palette';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeSwitcher() {
  const themeContext = useTheme();
  const { toggleTheme } = themeContext;
  const { t } = useTranslation();

  const themes = ['light', 'dark', 'custom'];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const handleThemeToggle = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setCurrentThemeIndex(nextIndex);
    toggleTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (themes[currentThemeIndex]) {
      case 'light':
        return <LightModeIcon />;
      case 'dark':
        return <DarkModeIcon />;
      case 'custom':
        return <PaletteIcon />;
      default:
        return <LightModeIcon />;
    }
  };

  return (
    <IconButton onClick={handleThemeToggle} title={t(`${themes[currentThemeIndex]}_mode`)}>
      {getIcon()}
    </IconButton>
  );
}

export default ThemeSwitcher;
