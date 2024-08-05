import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@services/index';
import { END_POINT } from '@constants/api';

export const useCreateDiary = (memberId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      API.post(END_POINT.DIARY(memberId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
    },
  });
};
