import { useActions, useIsAuthenticated, useIsLoding } from './AuthStore';

export const useAuth = () => {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoding();
  const { handleCheckAuth } = useActions();
  handleCheckAuth();

  return { isAuthenticated, isLoading };
};
