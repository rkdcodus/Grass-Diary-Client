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

const fetchAxios = async () => {
  const res = await API.get(END_POINT.member_info);
  return res.data.memberId;
};

export const useUser = () => {
  const { isAuthenticated } = useAuth();
  const memberId = useMemberId();
  const setMemberId = useSetMemberId();
  const { modal } = useModal();

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
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  if (isError) {
    const manualLogout = localStorage.getItem('manualLogout');
    if (manualLogout === null) {
      const setting = {
        title: MODAL.authentication_error.title,
        content:
          `${error.response?.data.description}\n` + '다시 로그인 해주세요',
      };

      const button1 = {
        active: true,
        text: MODAL.confirm,
        color: semantic.light.accent.solid.hero,
        interaction: INTERACTION.accent.subtle(),
        clickHandler: () => (window.location.href = '/'),
      };

      localStorage.removeItem('accessToken');
      modal(setting, button1);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) setMemberId(0);
    else if (isError) setMemberId(0);
    else if (isSuccess) setMemberId(data);
  }, [isAuthenticated, isError, isSuccess]);

  return memberId;
};
