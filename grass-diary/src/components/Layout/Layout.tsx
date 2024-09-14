import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toast, Modal } from '@components/index';

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
