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

const getTokenExpirationDate = (token: string) => {
  try {
    const decode = jwtDecode(token);
    if (!decode.exp) return;
    // JWT의 exp는 초 단위의 UNIX 타임스탬프이므로 이를 밀리초 단위로 변환한다.
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
  const { isAuthenticated } = useAuth();
  const memberId = useMemberId();
  const setMemberId = useSetMemberId();
  const { modal } = useModal();
  const isNetworkOffline = useNetwork();
  const accessToken = localStorage.getItem('accessToken');

  const { data, isSuccess, isError, error, refetch } = useQuery<
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

  if (isError) {
    const manualLogout = localStorage.getItem('manualLogout');

    if (manualLogout === null) {
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
    }
  }

  useEffect(() => {
    if (!isAuthenticated) setMemberId(0);
    else if (isError) setMemberId(0);
    else if (isSuccess) setMemberId(data);
  }, [isAuthenticated, isError, isSuccess]);

  useEffect(() => {
    if (accessToken) {
      const expirationDate = getTokenExpirationDate(accessToken);
      if (expirationDate) {
        const expireInterval = setInterval(() => {
          if (hasExpired(expirationDate)) {
            clearInterval(expireInterval);
            refetch();
          }
        }, 5000);
      }
    }
  }, [accessToken]);

  return memberId;
};
