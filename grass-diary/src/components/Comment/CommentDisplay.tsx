import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { useRef } from 'react';
import { useWriterProfile } from '@hooks/api/useWriterProfile';
import { useCommentActions } from '@state/comment/CommentStore';
import { ReactComponent as ReplySvg } from '@svg/subdirectory_arrow_right.svg';
import CommentSetting from './CommentSetting';

const CommentDisplay = ({ comment, parentId }: CommentDisplayProps) => {
  const setting = useRef<HTMLDivElement>(null);
  const { data: writer } = useWriterProfile(comment.memberId);
  const { setReplyId } = useCommentActions();

  const reply = e => {
    if (setting.current) {
      if (setting.current.contains(e.target as HTMLElement)) return;
    }
    setReplyId(parentId);
  };

  return comment.deleted ? (
    <CommentWrap>
      {comment.depth ? <ReplyIcon /> : null}
      <CommentContent $deleted={comment.deleted}>
        삭제된 댓글입니다
      </CommentContent>
    </CommentWrap>
  ) : (
    <CommentWrap onClick={reply}>
      <CommentTop>
        {comment.depth ? <ReplyIcon /> : null}
        <WriterWrap>
          <WriterProfile src={writer?.profileImageURL} />
          <WriterName>{writer?.nickname}</WriterName>
        </WriterWrap>
        <div ref={setting}>
          <CommentSetting commentId={comment.commentId} />
        </div>
      </CommentTop>
      <CommentContent $deleted={comment.deleted}>
        {comment.content}
      </CommentContent>
    </CommentWrap>
  );
};

export default CommentDisplay;

const CommentWrap = styled.div`
  display: flex;
  padding: var(--gap-sm, 12px) var(--gap-md, 16px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-sm, 12px);
  align-self: stretch;

  border-radius: var(--radius-sm, 12px);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.assistive};
  opacity: var(--opacity-visible, 1);
`;

const CommentTop = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-md, 16px);
  align-self: stretch;
  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const WriterWrap = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-2xs, 8px);
  flex: 1 0 0;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const WriterProfile = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: var(--radius-empty, 24px);
  opacity: var(--opacity-visible, 1);
  background: url(<path-to-image>) lightgray 4.876px 7.661px / 63.924% 48.417%
      no-repeat,
    ${semantic.light.fill.transparent.alternative};
  objectfit: cover;
`;

const WriterName = styled.p`
  color: ${semantic.light.object.solid.normal};
  ${TYPO.label2}
`;

const CommentContent = styled.div<{ $deleted?: boolean }>`
  color: ${props =>
    props.$deleted
      ? semantic.light.object.transparent.alternative
      : semantic.light.object.solid.normal};
  ${TYPO.body1}
`;

const ReplyIcon = styled(ReplySvg)`
  display: flex;
  padding: var(--gap-5xs, 2px);
  align-items: center;
  gap: var(--gap-empty, 0px);
  margin-right: -4px;
`;
