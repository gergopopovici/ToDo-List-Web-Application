import { Box, Button } from '@mui/material';
import { useTheme } from '../Contexts/ThemeContext';

function ThemeSwitcher() {
  const themeContext = useTheme();
  if (!themeContext) {
    return null;
  }
  const { toggleTheme } = themeContext;
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" onClick={() => toggleTheme('light')}>
        Light
      </Button>
      <Button variant="contained" onClick={() => toggleTheme('dark')}>
        Dark Theme
      </Button>
      <Button variant="contained" onClick={() => toggleTheme('custom')}>
        Custom Theme
      </Button>
    </Box>
  );
}
export default ThemeSwitcher;
