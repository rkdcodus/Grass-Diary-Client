import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Toast from './Toast';
import Modal from '@components/modal/Modal';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toast />
      <Modal />
      <Footer />
    </>
  );
};

export default Layout;
