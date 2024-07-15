import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import API from '@services/index';
import { memberIdAtom } from './userState';
import { useAuth } from '@recoil/auth/useAuth';
import { END_POINT } from '@constants/api';
import { CONSOLE_ERROR } from '@constants/message';

interface IUseUserReturn {
  memberId: number | null;
}

const useUser = (): IUseUserReturn => {
  const setMemberId = useSetRecoilState<number | null>(memberIdAtom);
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuth();

  const { data: memberId, isSuccess } = useQuery<
    number,
    Error,
    number,
    string[]
  >({
    queryKey: ['memberId'],
    queryFn: () =>
      API.get(END_POINT.MEMBER_INFO).then(({ data }) => data.memberId),
    enabled: !!isAuthenticated,
    onError: error => console.error(CONSOLE_ERROR.MEMBER.GET + error),
  });

  useEffect(() => {
    if (isSuccess && memberId !== undefined) setMemberId(memberId);
    if (!isAuthenticated) setMemberId(null);
  }, [isSuccess, memberId, isAuthenticated, setMemberId]);

  return { memberId };
};

export default useUser;
