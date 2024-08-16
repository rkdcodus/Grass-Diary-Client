import API from '@services/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostComment = (diaryId: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: PostRequest) =>
      API.post(`/comment/${diaryId}`, request),
    onMutate: async request => {
      await queryClient.cancelQueries({ queryKey: ['comment', diaryId] });

      // 업데이트 이전 정보 저장.
      const priviousData = queryClient.getQueryData(['comment', diaryId]);
      const newRequest = {
        commentId: 999,
        memberId: request.memberId,
        content: request.content,
        deleted: false,
        createdDate: null,
        createdAt: null,
        depth: 0,
        childComments: [],
      };

      queryClient.setQueryData(
        ['comment', diaryId],
        (prev: CommentResponse[]) => [...prev, newRequest],
      );

      return { priviousData };
    },
    onError(error, data, context) {
      if (context) {
        queryClient.setQueryData(['comment', diaryId], context.priviousData);
      }
      console.error('댓글 post 실패 ', error);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['comment', diaryId] });
    },
  });
};
