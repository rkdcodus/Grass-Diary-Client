import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toast, Modal, SnackBar } from '@components/index';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/index';

const Layout = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Header />
      <Outlet />
      <Toast />
      <Modal />
      <SnackBar />
      <Footer />
    </ErrorBoundary>
  );
};

export default Layout;
