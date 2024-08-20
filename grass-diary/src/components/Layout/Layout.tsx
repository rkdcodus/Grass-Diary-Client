import Footer from '@components/NavBar/Footer';
import Header from '@components/NavBar/Header';
import Toast from '@components/Toast/Toast';
import { Outlet } from 'react-router-dom';

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
