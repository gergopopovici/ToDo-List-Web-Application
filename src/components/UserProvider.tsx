import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { getUserById } from '../services/UserService';
import { ResponseUserDTO } from '../models/User';
import { Navbar } from './Navbar';
import { useAuth } from '../Contexts/AuthProvider';

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
  const userId = getCookieValue('userId');
  const {
    data: user,
    isError,
    error,
  } = useQuery<ResponseUserDTO>(['user', userId], () => getUserById(userId as string), {
    enabled: !!userId,
  });

  const handleSignOut = () => {
    logout();
  };

  const userContextValue = React.useMemo(() => ({ user }), [user]);

  if (isError) {
    console.error('Error fetching user:', error);
    return <div>Error loading user data. Please try again.</div>;
  }

  return (
    <UserContext.Provider value={userContextValue}>
      <Navbar username={isAuthenticated && user ? user.username : ''} onSignOut={handleSignOut} />
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
