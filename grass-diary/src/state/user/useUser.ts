import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import API from '@services/index';
import { memberIdAtom } from './userState';
import { useAuth } from '@state/auth/useAuth';
import { END_POINT } from '@constants/api';

interface IUseUserReturn {
  memberId: Id;
}

const useUser = (): IUseUserReturn => {
  const setMemberId = useSetRecoilState<number>(memberIdAtom);
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuth();

  const { data: memberId = 0, isSuccess } = useQuery<
    number,
    Error,
    number,
    string[]
  >({
    queryKey: ['memberId'],
    queryFn: () =>
      API.get(END_POINT.MEMBER_INFO).then(({ data }) => data.memberId),
    enabled: !!isAuthenticated,
  });

  useEffect(() => {
    if (isSuccess && memberId !== undefined) setMemberId(memberId);
    if (!isAuthenticated) setMemberId(0);
  }, [isSuccess, memberId, isAuthenticated, setMemberId]);

  return { memberId };
};

export default useUser;
