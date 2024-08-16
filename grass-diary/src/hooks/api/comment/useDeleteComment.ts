import API from '@services/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteComment = (diaryId: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: Id) => API.patch(`/comment/${commentId}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', diaryId] });
    },
    onError: error => {
      console.error(error);
    },
  });
};
