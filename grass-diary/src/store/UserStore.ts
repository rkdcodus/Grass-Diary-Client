import { END_POINT } from '@constants/api';
import API from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { useAuth } from './AuthStore';
import { useEffect } from 'react';

interface UserState {
  memberId: Id;
  fetchMemberId: () => void;
}

const fetchAxios = async () => {
  const res = await API.get(END_POINT.MEMBER_INFO);
  return res.data.memberId;
};

const useUserStore = create<UserState>(set => ({
  memberId: 0,
  fetchMemberId: () => {
    const { isAuthenticated } = useAuth();
    const { data } = useQuery<number, Error, number, string[]>({
      queryKey: ['memberId'],
      queryFn: fetchAxios,
      enabled: !!isAuthenticated,
    });

    if (data) set({ memberId: data });
    if (!isAuthenticated) set({ memberId: 0 });
  },
}));

export const useMemberId = () => useUserStore(state => state.memberId);
export const useFetchMemberId = () =>
  useUserStore(state => state.fetchMemberId);

export const useUser = () => {
  const fetchMemberId = useFetchMemberId();
  const memberId = useMemberId();
  useEffect(() => {
    fetchMemberId();
  }, [fetchMemberId]);

  if (memberId) return memberId;
  return 0;
};
