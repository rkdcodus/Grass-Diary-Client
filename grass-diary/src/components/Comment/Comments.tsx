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
    <CommentContainer>
      {comments?.map((comment: CommentResponse) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
      <PostInput parentId={null} />
    </CommentContainer>
  );
};

export default Comments;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-xs, 0.625rem);
  align-self: stretch;
`;
