import { useAuth } from '@state/auth/useAuth';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './NavBar/Header';
import Toast from './Toast/Toast';
import Footer from './NavBar/Footer';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
      <Toast />
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
