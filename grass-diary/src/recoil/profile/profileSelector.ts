import { selector } from 'recoil';
import API from '@services/index';
import { memberIdAtom } from '@recoil/user/userState';
import END_POINT from '@constants/api';

export const profileSelector = selector<IProfile | undefined>({
  key: 'profileSelector',
  get: async ({ get }) => {
    const memberId = get(memberIdAtom);

    if (!memberId) return;

    try {
      const response = await API.get(END_POINT.MEMBER_PROFILE(memberId));
      return response.data;
    } catch (error) {
      console.error(`사용자 프로필을 조회할 수 없습니다. ${error}`);
    }
  },
});
