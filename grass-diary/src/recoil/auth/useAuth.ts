import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { isAuthenticatedAtom, isLoadingAtom } from './authState';
import { checkAuthSelector } from './authSelector';
import { useEffect } from 'react';
import { CONSOLE_ERROR } from '@constants/message';

interface IUseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = (): IUseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState<boolean>(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingAtom);

  const checkAuthLoadable = useRecoilValueLoadable<boolean>(checkAuthSelector);

  useEffect(() => {
    switch (checkAuthLoadable.state) {
      case 'hasValue':
        setIsAuthenticated(checkAuthLoadable.contents);
        setIsLoading(false);
        break;
      case 'loading':
        setIsLoading(true);
        break;
      case 'hasError':
        setIsLoading(false);
        console.error(CONSOLE_ERROR.LOGIN.FAIL);
        break;
    }
  }, [checkAuthLoadable.state]);

  return { isAuthenticated, isLoading };
};
