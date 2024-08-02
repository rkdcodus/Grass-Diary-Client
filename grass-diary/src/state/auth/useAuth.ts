import { useEffect } from 'react';
import { useAuthStore } from './authStore';
import { useCheckAuth } from './authUtils';

interface IUseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = (): IUseAuthReturn => {
  const { isAuthenticated, isLoading } = useAuthStore(state => state);
  const handleCheckAuth = useCheckAuth();

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  return { isAuthenticated, isLoading };
};
