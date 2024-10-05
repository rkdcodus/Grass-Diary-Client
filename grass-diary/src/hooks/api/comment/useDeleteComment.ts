import { END_POINT } from '@constants/api';
import { useError } from '@hooks/useError';
import API from '@services/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteComment = (diaryId: Id) => {
  const queryClient = useQueryClient();
  const { renderErrorPage } = useError();
  return useMutation({
    mutationFn: (commentId: Id) =>
      API.patch(END_POINT.comment_delete(commentId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', diaryId] });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error(error);
      renderErrorPage(error);
    },
  });
};
