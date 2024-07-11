import { selector } from 'recoil';
import API from '@services/index';
import { memberIdAtom } from '@recoil/user/userState';
import { END_POINT } from '@constants/api';
import { CONSOLE_ERROR } from '@constants/message';

export const profileSelector = selector<IProfile | undefined>({
  key: 'profileSelector',
  get: async ({ get }) => {
    const memberId = get(memberIdAtom);

    if (!memberId) return;

    try {
      const response = await API.get(END_POINT.MEMBER_PROFILE(memberId));
      return response.data;
    } catch (error) {
      console.error(CONSOLE_ERROR.PROFILE.GET + error);
    }
  },
});
