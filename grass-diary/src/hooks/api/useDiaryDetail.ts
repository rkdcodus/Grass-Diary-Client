import { useQuery } from '@tanstack/react-query';
import { useWriterProfile } from './useWriterProfile';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import { AxiosError } from 'axios';

const fetchDiaryDetails = (id: Id) => {
  return API.get(END_POINT.DIARY(id));
};

export const useDiaryDetail = (diaryId: Id) => {
  const {
    data: detail,
    isLoading,
    isError,
    error,
  } = useQuery<IDiaryDetail, AxiosError, IDiaryDetail, [string, Id]>({
    queryKey: ['get-diaryDetail', diaryId],
    queryFn: async () => {
      const res = await fetchDiaryDetails(diaryId);
      return res.data;
    },
    retry: 1,
  });

  const writerId = detail?.memberId;
  const { data: writer } = useWriterProfile(writerId!);

  return { detail, writer, isLoading, isError, error };
};
