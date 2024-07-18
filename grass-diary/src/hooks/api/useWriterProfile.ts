import { useQuery } from '@tanstack/react-query';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import { AxiosError } from 'axios';

const fetchUserProfiles = (memberId: number) => {
  return API.get(END_POINT.MEMBER_PROFILE(memberId));
};

export const useWriterProfile = (writerId: number) => {
  return useQuery<IProfile, AxiosError, IProfile, [string, number]>({
    queryKey: ['writer-data', writerId],
    queryFn: async () => {
      const res = await fetchUserProfiles(writerId);
      return res.data;
    },
    enabled: !!writerId,
  });
};
