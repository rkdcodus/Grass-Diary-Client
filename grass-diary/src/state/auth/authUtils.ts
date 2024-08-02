import { useAuthStore } from './authStore';
import { checkAuth } from '@utils/authUtils';
import { CONSOLE_ERROR } from '@constants/message';

export const useCheckAuth = () => {
  const { setIsAuthenticated, setIsLoading } = useAuthStore(state => state);

  const handleCheckAuth = async () => {
    try {
      const isLoggedIn: boolean = await checkAuth();
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
    } catch (error) {
      console.error(CONSOLE_ERROR.LOGIN.FALSE + error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  return handleCheckAuth;
};
