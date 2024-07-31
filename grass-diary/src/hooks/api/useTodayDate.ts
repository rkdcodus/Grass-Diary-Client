import { END_POINT } from '@constants/api';
import { CONSOLE_ERROR } from '@constants/message';
import API from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const fetchAxios = async (): Promise<TodayInfo> => {
  const res = await API.get(END_POINT.TODAY_DATE);

  return res.data;
};

export const useTodayDate = () => {
  const {
    data: date,
    isError,
    error,
  } = useQuery<TodayInfo, AxiosError, TodayInfo, [string]>({
    queryKey: ['todayDate'],
    queryFn: fetchAxios,
  });

  if (isError) console.error(CONSOLE_ERROR.DATE.GET + error.message);

  return { date };
};
