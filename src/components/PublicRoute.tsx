import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider';

function PublicRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/toDos" /> : <Outlet />;
}

export default PublicRoute;
