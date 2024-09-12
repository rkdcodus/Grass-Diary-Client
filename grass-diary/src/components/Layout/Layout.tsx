import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Toast from './Toast';
import Modal from '@components/modal/Modal';
import SnackBar from './SnackBar';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toast />
      <Modal />
      <SnackBar />
      <Footer />
    </>
  );
};

export default Layout;
