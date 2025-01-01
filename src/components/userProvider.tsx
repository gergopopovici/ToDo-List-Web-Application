import React from 'react';
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

  if (isError) {
    console.error('Error fetching user:', error);
    return <div>Error loading user data. Please try again.</div>;
  }

  return (
    <div>
      {isAuthenticated && user ? <Navbar username={user.username} onSignOut={handleSignOut} /> : null}
      {children}
    </div>
  );
}

export default UserProvider;
