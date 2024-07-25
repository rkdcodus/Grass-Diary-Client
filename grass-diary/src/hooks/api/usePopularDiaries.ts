import API from '@services/index';
import { END_POINT } from '@constants/api';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const fetchPopularDiary = () => {
  return API.get(END_POINT.SHARE_POPULAR);
};

export const usePopularDiaries = () => {
  return useQuery<Feed[], AxiosError, Feed[], [string]>({
    queryKey: ['top10'],
    queryFn: async () => {
      const res = await fetchPopularDiary();
      return res.data;
    },
  });
};
