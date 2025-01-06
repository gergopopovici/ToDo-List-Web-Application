import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../Contexts/ThemeContext';

function ThemeSwitcher() {
  const themeContext = useTheme();
  const { toggleTheme } = themeContext;
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" onClick={() => toggleTheme('light')}>
        {t('light_mode')}
      </Button>
      <Button variant="contained" onClick={() => toggleTheme('dark')}>
        {t('dark_mode')}
      </Button>
      <Button variant="contained" onClick={() => toggleTheme('custom')}>
        {t('custom_mode')}
      </Button>
    </Box>
  );
}
export default ThemeSwitcher;
