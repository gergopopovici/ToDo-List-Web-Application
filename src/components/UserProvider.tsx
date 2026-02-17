import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { getUserById } from '../services/UserService';
import { ResponseUserDTO } from '../models/User';
import { Navbar } from './Navbar';
import { useAuth } from '../context/AuthProvider';

const getCookieValue = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

interface UserContextType {
  user: ResponseUserDTO | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

function UserProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const userId = localStorage.getItem('userId') || getCookieValue('userId');

  const {
    data: user,
    isError,
    error,
    isLoading,
  } = useQuery<ResponseUserDTO>(['user', userId], () => getUserById(userId as string), {
    enabled: !!userId,
    retry: false,
  });

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    logout();
  };

  const userContextValue = React.useMemo(() => ({ user }), [user]);

  if (isLoading && !!userId) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Loading User Profile...</div>;
  }

  if (isError) {
    console.error('Error fetching user:', error);
    localStorage.removeItem('userId');
    return <div>Error loading user data. Please try again.</div>;
  }

  return (
    <UserContext.Provider value={userContextValue}>
      <Navbar
        username={isAuthenticated && user ? user.username : ''}
        admin={isAuthenticated && user ? user.admin : false}
        onSignOut={handleSignOut}
      />
      {children}
    </UserContext.Provider>
  );
}
