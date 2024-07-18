import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { memberIdAtom } from '@recoil/user/userState';
import { isAuthenticatedAtom } from '@recoil/auth/authState';

const useLogout = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
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
