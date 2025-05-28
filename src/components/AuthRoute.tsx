import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';

const AuthRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoute;