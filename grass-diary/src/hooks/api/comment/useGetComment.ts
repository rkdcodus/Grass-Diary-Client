import API from '@services/index';
import { useQuery } from '@tanstack/react-query';

export const useGetComment = (diaryId: Id) => {
  return useQuery({
    queryKey: ['comment', diaryId],
    queryFn: async () => {
      const res = await API.get(`/comment/${diaryId}`);
      return res.data;
    },
  });
};
