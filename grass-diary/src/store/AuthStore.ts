import { CONSOLE_ERROR } from '@constants/message';
import { checkAuth } from '@utils/authUtils';
import { useEffect } from 'react';
import { create } from 'zustand';

interface Actions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  handleCheckAuth: () => Promise<void>;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: Actions;
}

const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  isLoading: true,
  actions: {
    setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
    setIsLoading: isLoading => set({ isLoading }),
    handleCheckAuth: async () => {
      try {
        const isLoggedIn: boolean = await checkAuth();
        console.log('isLoggedIn', isLoggedIn);
        set({ isAuthenticated: isLoggedIn });
        set({ isLoading: false });
      } catch (error) {
        console.error(CONSOLE_ERROR.LOGIN.FALSE + error);
        set({ isAuthenticated: false });
        set({ isLoading: false });
      }
    },
  },
}));

export const useIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);
export const useIsLoding = () => useAuthStore(state => state.isLoading);
export const useActions = () => useAuthStore(state => state.actions);
export const useAuth = () => {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoding();
  const { handleCheckAuth } = useActions();

  useEffect(() => {
    handleCheckAuth();
    console.log(isAuthenticated, isLoading);
  }, [handleCheckAuth]);

  return { isAuthenticated, isLoading };
};
