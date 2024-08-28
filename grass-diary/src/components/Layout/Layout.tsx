import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Toast from './Toast';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toast />
      <Footer />
    </>
  );
};

export default Layout;
