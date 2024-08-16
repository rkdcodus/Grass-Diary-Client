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
          <Comment comment={comment} />
        ))}
        <PostInput parentId={null} />
      </CommentContainer>
    </>
  );
};

export default Comments;

const CommentLable = styled.div`
  align-self: stretch;
  color: ${semantic.light.object.transparent.neutral};
  ${TYPO.label3}
`;

const CommentContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-xs, 10px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;
