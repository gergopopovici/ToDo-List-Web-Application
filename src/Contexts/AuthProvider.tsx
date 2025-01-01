import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  logedIn: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log(document.cookie);
    const userId = document.cookie.split('; ').find((row) => row.startsWith('userId='));
    console.log(userId);
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

  const logedIn = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    document.cookie = 'userId=; Max-Age=0; path=/';
  };

  const value = React.useMemo(() => ({ isAuthenticated, logedIn, logout }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
