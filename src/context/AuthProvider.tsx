import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface AuthContextType {
  isAuthenticated: boolean;
  logedIn: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const checkAuth = () => {
      const userId = document.cookie.split('; ').find((row) => row.startsWith('userId='));
      setIsAuthenticated(!!userId);
      setLoading(false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const logedIn = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    document.cookie = 'userId=; Max-Age=0; path=/';
  };

  const value = React.useMemo(() => ({ isAuthenticated, logedIn, logout }), [isAuthenticated]);

  if (loading) return <div>{t('loading')}</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
