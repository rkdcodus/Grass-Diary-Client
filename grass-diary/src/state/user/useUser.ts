import { useAuth } from '../auth/useAuth';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import API from '@services/index';
import { END_POINT } from '@constants/api';
import { AxiosError } from 'axios';
import { useMemberId, useSetMemberId } from './UserStore';
import { MODAL } from '@constants/message';
import { semantic } from '@styles/semantic';
import { INTERACTION } from '@styles/interaction';
import { useModal } from '@state/modal/useModal';
import { useNetwork } from '@hooks/useNetwork';
import { jwtDecode } from 'jwt-decode';
import { useAuthActions } from '@state/auth/authStore';

const getTokenExpirationDate = (token: string) => {
  try {
    const decode = jwtDecode(token);
    if (!decode.exp) return;
    const date = new Date(0);
    date.setUTCSeconds(decode.exp);
    return date;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const hasExpired = (expirationDate: Date) => {
  if (!expirationDate) return false;
  const currentDate = new Date();
  const timeDiff = expirationDate.getTime() - currentDate.getTime();
  return timeDiff <= 0 ? true : false;
};

const fetchAxios = async () => {
  const res = await API.get(END_POINT.member_info);
  return res.data.memberId;
};

export const useUser = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { isAuthenticated } = useAuth();
  const { setIsAuthenticated } = useAuthActions();
  const memberId = useMemberId();
  const setMemberId = useSetMemberId();
  const { modal } = useModal();
  const isNetworkOffline = useNetwork();

  const { data, isSuccess, isError, error } = useQuery<
    number,
    AxiosError<ApiErrorResponse>,
    number,
    string[]
  >({
    queryKey: ['memberId'],
    queryFn: fetchAxios,
    enabled: !!isAuthenticated,
    retry: 1,
  });

  useEffect(() => {
    if (isSuccess) setMemberId(data);
    if (!isAuthenticated) setMemberId(0);
    if (isError) {
      const logout = localStorage.getItem('logout');
      if (logout === null) {
        const content = isNetworkOffline
          ? MODAL.network_error.content
          : error.response
          ? error.response?.data.description + '\n다시 로그인 해주세요'
          : '다시 로그인 해주세요';

        const setting = {
          title: isNetworkOffline
            ? MODAL.network_error.title
            : MODAL.authentication_error.title,
          content: content,
        };

        const button1 = {
          active: true,
          text: MODAL.confirm,
          color: semantic.light.accent.solid.hero,
          interaction: INTERACTION.accent.subtle(),
          clickHandler: () => (window.location.href = '/'),
        };

        modal(setting, button1);
        setMemberId(0);
      }
    }
  }, [isAuthenticated, isError, isSuccess]);

  // 로그인 만료 타이머
  useEffect(() => {
    let expireInterval: NodeJS.Timeout;

    if (accessToken) {
      const expirationDate = getTokenExpirationDate(accessToken);

      if (expirationDate) {
        expireInterval = setInterval(() => {
          if (hasExpired(expirationDate)) {
            const setting = {
              title: MODAL.authentication_error.title,
              content: MODAL.authentication_error.content,
            };

            const button1 = {
              active: true,
              text: MODAL.confirm,
              color: semantic.light.accent.solid.hero,
              interaction: INTERACTION.accent.subtle(),
              clickHandler: () => (window.location.href = '/'),
            };

            localStorage.removeItem('accessToken');
            localStorage.setItem('logout', 'true');
            setIsAuthenticated(false);
            setMemberId(0);
            clearInterval(expireInterval);
            modal(setting, button1);
          }
        }, 60000);
      }
    }
    return () => {
      if (expireInterval) clearInterval(expireInterval);
    };
  }, [accessToken]);

  return memberId;
};
