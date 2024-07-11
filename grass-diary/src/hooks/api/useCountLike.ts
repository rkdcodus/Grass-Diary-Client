import API from '@services/index';
import { END_POINT } from '@constants/api';
import { useMutation } from '@tanstack/react-query';
import { CONSOLE_ERROR } from '@constants/message';

type Props = {
  diaryId: string;
  memberId: number;
};

const postLikeApi = ({ diaryId, memberId }: Props) => {
  return API.post(END_POINT.LIKE(diaryId, memberId));
};

const deleteLikeApi = ({ diaryId, memberId }: Props) => {
  return API.delete(END_POINT.LIKE(diaryId, memberId));
};

export const useCountLike = ({ diaryId, memberId }: Props) => {
  const { mutate: postLike, isSuccess: postSuccess } = useMutation({
    mutationFn: () => {
      return postLikeApi({ diaryId, memberId });
    },
    onError: error => {
      console.error(CONSOLE_ERROR.LIKE.POST + error);
    },
  });

  const { mutate: deleteLike, isSuccess: deleteSuccess } = useMutation({
    mutationFn: () => {
      return deleteLikeApi({ diaryId, memberId });
    },
    onError: error => {
      console.error(CONSOLE_ERROR.LIKE.DELETE + error);
    },
  });

  return { postLike, deleteLike, postSuccess, deleteSuccess };
};
