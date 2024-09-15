import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import { useSnackBar } from '@state/toast/useSnackBar';

export const useCreateDiary = (memberId: number) => {
  const { snackBar } = useSnackBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: DiaryRequest) =>
      API.post(END_POINT.diary(memberId), request),
    onSuccess: () => {
      snackBar(
        '일기를 작성해서 10 리워드를 받았어요.',
        '10 리워드',
        '리워드 내역 보기',
        '/rewardpage',
      );
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
    },
  });
};
