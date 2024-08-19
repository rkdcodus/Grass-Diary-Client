import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { useParamsId } from '@hooks/useParamsId';
import { useGetComment } from '@hooks/api/comment/useGetComment';
import { PostInput } from './Input';
import Comment from './Comment';

const Comments = () => {
  const diaryId = useParamsId();
  const { data: comments } = useGetComment(diaryId);

  return (
    <>
      <CommentLable>{`댓글 ${comments?.length}`}</CommentLable>
      <CommentContainer>
        {comments?.map((comment: CommentResponse) => (
          <Comment key={comment.commentId} comment={comment} />
        ))}
        <PostInput parentId={null} />
      </CommentContainer>
    </>
  );
};

export default Comments;

const CommentLable = styled.div`
  ${TYPO.label3}
  align-self: stretch;
  color: ${semantic.light.object.transparent.neutral};
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-xs, 10px);
  align-self: stretch;
`;
