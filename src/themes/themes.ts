import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '& .MuiInputBase-input': {
            color: 'inherit',
          },
          '& .MuiInputLabel-root': {
            color: 'inherit',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'primary.main',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'inherit',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: '#115293',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A0A0A0',
    },
    primary: {
      main: '#607D8B',
    },
    secondary: {
      main: '#455A64',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1E1E1E',
            borderColor: '#607D8B',
            '& fieldset': {
              borderColor: '#607D8B',
            },
            '&:hover fieldset': {
              borderColor: '#90A4AE',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#607D8B',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#A0A0A0',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#E0E0E0',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#E0E0E0',
          backgroundColor: '#607D8B',
          '&:hover': {
            backgroundColor: '#455A64',
          },
        },
      },
    },
  },
});

export const costumTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e53935',
    },
    secondary: {
      main: '#b71c1c',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '& .MuiInputBase-input': {
            color: 'inherit',
          },
          '& .MuiInputLabel-root': {
            color: 'inherit',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'primary.main',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'inherit',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: '#e53935',
          '&:hover': {
            backgroundColor: '#b71c1c',
          },
        },
      },
    },
  },
});
