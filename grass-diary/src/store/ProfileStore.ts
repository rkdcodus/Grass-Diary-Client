import { create } from 'zustand';
import { useUser } from './UserStore';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import { useQuery } from '@tanstack/react-query';
import { CONSOLE_ERROR } from '@constants/message';
import exp from 'constants';
import { useEffect } from 'react';

interface Actions {
  setProfileImageURL: (profileImageURL: string) => void;
  setNickName: (nickName: string) => void;
  setProfileIntro: (profileIntro: string) => void;
  fetchProfile: () => void;
}

interface ProfileState extends IProfile {
  actions: Actions;
}

const fetchAxios = async (memberId: Id) => {
  const res = await API.get(END_POINT.MEMBER_PROFILE(memberId));
  return res.data;
};

const useProfileStore = create<ProfileState>(set => ({
  profileImageURL: '',
  nickname: '',
  profileIntro: '',
  actions: {
    setProfileImageURL: profileImageURL => set({ profileImageURL }),
    setNickName: nickname => set({ nickname }),
    setProfileIntro: profileIntro => set({ profileIntro }),
    fetchProfile: () => {
      const memberId = useUser();

      if (!memberId) return;

      const { data, isError, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => fetchAxios(memberId),
      });

      if (isError) console.error(CONSOLE_ERROR.PROFILE.GET + error);
      if (data) {
        set({ profileImageURL: data.profileImageURL });
        set({ nickname: data.nickname });
        set({ profileIntro: data.profileIntro });
      }
    },
  },
}));
export const useProfileImageURL = () =>
  useProfileStore(state => state.profileImageURL);
export const useNickname = () => useProfileStore(state => state.nickname);
export const useProfileIntro = () =>
  useProfileStore(state => state.profileIntro);
export const useProfileActions = () => useProfileStore(state => state.actions);

export const useProfile = () => {
  const profileImageURL = useProfileImageURL();
  const nickname = useNickname();
  const profileIntro = useProfileIntro();
  const { fetchProfile } = useProfileActions();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profileImageURL, nickname, profileIntro };
};
