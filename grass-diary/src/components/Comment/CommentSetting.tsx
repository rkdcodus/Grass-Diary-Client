import { semantic } from '@styles/semantic';

import API from '@services/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import moreVert from '@svg/more_vert.svg';
import editIcon from '@svg/mode_edit.svg';
import deleteIcon from '@svg/delete_forever.svg';
import Menu from '@components/Button/Menu';
import Menus from '@components/Button/Menus';

const useDeleteComment = (diaryId: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: Id) => API.patch(`/comment/${commentId}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', diaryId]);
    },
    onError: error => {
      console.error(error);
    },
  });
};

const CommentSetting = ({
  diaryId,
  commentId,
  setEditingId,
}: CommentSettingProps) => {
  const { mutate: deleteComment } = useDeleteComment(diaryId);
  const editHandler = () => {
    setEditingId(commentId);
  };
  return (
    <Menus icon={moreVert}>
      <Menu
        onClick={editHandler}
        text={'댓글 수정'}
        svg={editIcon}
        topRadius={16}
      />
      <Menu
        onClick={() => deleteComment(commentId)}
        text={'댓글 삭제'}
        svg={deleteIcon}
        color={semantic.light.feedback.solid.negative}
        bottomRadius={16}
      />
    </Menus>
  );
};

export default CommentSetting;
