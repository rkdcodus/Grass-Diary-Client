import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import CommentDisplay from './CommentDisplay';
import { PatchInput, PostInput } from './Input';
import {
  useCommentActions,
  useCommentEditId,
  useCommentReplyId,
} from '@state/comment/CommentStore';

const ChildCommentList = ({ childs, parentId }: CommentListProps) => {
  const editId = useCommentEditId();
  return (
    <>
      {childs?.length
        ? childs.map((child: CommentResponse) => {
            return editId === child.commentId ? (
              // 대댓글 patch input
              <PatchInput
                commentId={child.commentId}
                isReply={true}
                content={child.content}
              />
            ) : (
              <CommentDisplay comment={child} parentId={parentId} />
            );
          })
        : null}
    </>
  );
};

const Comment = ({ comment }: CommentProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const editId = useCommentEditId();
  const replyId = useCommentReplyId();
  const { resetReplyId } = useCommentActions();

  useEffect(() => {
    const closeInput = (event: MouseEvent) => {
      if (replyId && inputRef.current && commentRef.current) {
        if (
          !inputRef.current.contains(event.target as HTMLElement) &&
          !commentRef.current.contains(event.target as HTMLElement)
        )
          resetReplyId();
      }
    };

    if (replyId) {
      document.addEventListener('click', closeInput);
    }
    return () => document.removeEventListener('click', closeInput);
  }, [replyId]);

  return (
    <CommentContainer ref={commentRef}>
      {editId === comment.commentId ? (
        // 댓글 patch input
        <PatchInput
          commentId={comment.commentId}
          isReply={false}
          content={comment.content}
        />
      ) : (
        <CommentDisplay comment={comment} parentId={comment.commentId} />
      )}
      <ChildCommentList
        childs={comment.childComments}
        parentId={comment.commentId}
      />
      {replyId === comment.commentId && (
        // 대댓글 post input
        <CommentContainer ref={inputRef}>
          <PostInput parentId={comment.commentId} />
        </CommentContainer>
      )}
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-xs, 10px);
  align-self: stretch;
`;
