import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import { useLanguage } from '../Contexts/LanguageContext';

function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const handleChange = (event: SelectChangeEvent<string>) => {
    changeLanguage(event.target.value as string);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Select value={language} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Language' }}>
        <MenuItem value="en">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ReactCountryFlag countryCode="GB" style={{ marginRight: '8px' }} svg />
          </Box>
        </MenuItem>
        <MenuItem value="hu">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ReactCountryFlag countryCode="HU" style={{ marginRight: '8px' }} svg />
          </Box>
        </MenuItem>
        <MenuItem value="ro">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ReactCountryFlag countryCode="RO" style={{ marginRight: '8px' }} svg />
          </Box>
        </MenuItem>
      </Select>
    </Box>
  );
}

export default LanguageSwitcher;
