import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { darkTheme, lightTheme, costumTheme } from '../themes/themes';

interface ThemeContextType {
  theme: Theme;
  themeName: string;
  toggleTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
  custom: costumTheme,
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<string>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setThemeName(savedTheme);
  }, []);

  const toggleTheme = (themeName_: string) => {
    setThemeName(themeName_);
    localStorage.setItem('theme', themeName_);
  };

  const theme = themes[themeName as keyof typeof themes];
  const value = React.useMemo(() => ({ theme, themeName, toggleTheme }), [theme, themeName, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default { ThemeProvider, useTheme };
