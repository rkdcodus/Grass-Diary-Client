import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { memberIdAtom } from '@state/user/userState';
import { useAuthStore } from '@state/auth/authStore';

const useLogout = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const setMemberId = useSetRecoilState(memberIdAtom);

  const clearAuth = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setMemberId(0);

    navigate('/');
  };

  return clearAuth;
};

export default useLogout;
