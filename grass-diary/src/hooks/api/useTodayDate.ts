import { END_POINT } from '@constants/api';
import API from '@services/index';
import { useQuery } from '@tanstack/react-query';

const fetchAxios = () => {
  return API.get(END_POINT.TODAY_DATE);
};

export const useTodayDate = () => {
  return useQuery<TodayInfo>({
    queryKey: ['todayDate'],
    queryFn: async () => {
      const res = await fetchAxios();
      return res.data;
    },
  });
};
