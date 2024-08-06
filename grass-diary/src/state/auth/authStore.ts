import create from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  isLoading: true,
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
  setIsLoading: isLoading => set({ isLoading }),
}));
