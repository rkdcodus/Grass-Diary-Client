import { END_POINT } from '@constants/api';
import API from '@services/index';
import { useQuery } from '@tanstack/react-query';

export const useGetComment = (diaryId: Id) => {
  return useQuery({
    queryKey: ['comment', diaryId],
    queryFn: async () => {
      const res = await API.get(END_POINT.COMMENT(diaryId));
      return res.data;
    },
  });
};
