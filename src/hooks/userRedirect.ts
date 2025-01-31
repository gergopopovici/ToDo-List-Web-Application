import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider';

export function UserRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const { pathname } = location;
    if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
      navigate('/');
    }
  }, [location, navigate, isAuthenticated]);
  return null;
}
