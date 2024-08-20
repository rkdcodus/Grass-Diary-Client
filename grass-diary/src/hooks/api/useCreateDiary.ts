import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@services/index';
import { END_POINT } from '@constants/api';

export const useCreateDiary = (memberId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: DiaryRequest) =>
      API.post(END_POINT.diary(memberId), request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
    },
  });
};
