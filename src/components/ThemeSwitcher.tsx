import { IconButton } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon, Palette as PaletteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

function ThemeSwitcher() {
  const { themeName, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const handleThemeToggle = () => {
    const themes = ['light', 'dark', 'custom'];
    const nextIndex = (themes.indexOf(themeName) + 1) % themes.length;
    toggleTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (themeName) {
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
    <IconButton onClick={handleThemeToggle} title={t(`${themeName}_mode`)}>
      {getIcon()}
    </IconButton>
  );
}

export default ThemeSwitcher;
