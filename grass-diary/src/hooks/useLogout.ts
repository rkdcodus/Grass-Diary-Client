import { useNavigate } from 'react-router-dom';
import { useActions } from '@state/auth/AuthStore';
import { useSetMemberId } from '@state/user/UserStore';

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useActions();
  const setMemberId = useSetMemberId();

  const clearAuth = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setMemberId(0);

    navigate('/');
  };

  return clearAuth;
};

export default useLogout;
