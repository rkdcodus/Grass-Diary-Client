import { END_POINT } from '@constants/api';
import { CONSOLE_ERROR } from '@constants/message';
import API from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@state/user/useUser';
import { AxiosError } from 'axios';

export const useReward = () => {
  const memberId = useUser();

  const fetchUseReward = async (): Promise<RewardPointResponse> => {
    const res = await API.get(END_POINT.TOTAL_REWARD(memberId));
    return res.data;
  };

  const {
    data: reward,
    isError,
    error,
  } = useQuery<
    RewardPointResponse,
    AxiosError,
    RewardPointResponse,
    [string, number | undefined]
  >({
    queryKey: ['rewardPoint', memberId],
    queryFn: fetchUseReward,
    initialData: { rewardPoint: 0 },
    enabled: !!memberId,
  });

  if (isError) console.error(CONSOLE_ERROR.REWARD.GET + error.message);

  return { reward };
};
