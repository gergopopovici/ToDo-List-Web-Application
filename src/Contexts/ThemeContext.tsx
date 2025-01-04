import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { costumTheme, darkTheme, lightTheme } from '../themes/themes';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
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
    const theme = localStorage.getItem('theme') || 'light';
    setThemeName(theme);
  }, []);

  const toggleTheme = (themeName_: string) => {
    setThemeName(themeName_);
    localStorage.setItem('theme', themeName_);
  };

  const theme = themes[themeName as keyof typeof themes];
  const value = React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
