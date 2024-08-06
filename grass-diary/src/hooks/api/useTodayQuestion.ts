import { useQuery } from '@tanstack/react-query';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import { AxiosError } from 'axios';
import { CONSOLE_ERROR } from '@constants/message';

const fetchTodayQuestion = async (): Promise<TodayQuestion> => {
  const res = await API.get(END_POINT.TODAY_QUESTION);
  return res.data;
};

export const useTodayQuestion = () => {
  const {
    data: question,
    isError,
    error,
  } = useQuery<TodayQuestion, AxiosError, TodayQuestion, [string]>({
    queryKey: ['todayQuestion'],
    queryFn: fetchTodayQuestion,
  });

  if (isError) console.error(CONSOLE_ERROR.QUESTION.GET + error.message);

  return { question };
};
