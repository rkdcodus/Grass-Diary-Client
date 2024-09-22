import { END_POINT } from '@constants/api';
import API from '@services/index';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useError } from '@hooks/useError';

export const usePostComment = (diaryId: Id) => {
  const queryClient = useQueryClient();
  const { renderErrorPage } = useError();

  return useMutation({
    mutationFn: async (request: PostRequest) =>
      API.post(END_POINT.comment(diaryId), request),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['comment', diaryId] });
    },
    onError(error: AxiosError<ApiErrorResponse>) {
      console.error(error);
      renderErrorPage(error);
    },
  });
};
