import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { useEffect, useRef, useState } from 'react';
import { useWriterProfile } from '@hooks/api/useWriterProfile';
import { useCommentActions } from '@state/comment/CommentStore';
import { ReactComponent as ReplyIcon } from '@svg/subdirectory_arrow_right.svg';
import CommentSetting from './CommentSetting';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { useUser } from '@state/user/useUser';
import { COMMENT } from '@constants/message';

const CommentDisplay = ({ comment, parentId }: CommentDisplayProps) => {
  const { data: writer } = useWriterProfile(comment.memberId);
  const memberId = useUser();
  const { setReplyId } = useCommentActions();
  const { date } = useTodayDate();
  const setting = useRef<HTMLDivElement>(null);
  const [isToday, setIsToday] = useState(false);

  const reply = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (setting.current) {
      if (setting.current.contains(e.target as HTMLElement)) return;
    }
    setReplyId(parentId);
  };

  useEffect(() => {
    if (date && comment.createdDate) {
      if (
        +comment.createdDate.slice(0, 2) === date.year % 100 &&
        +comment.createdDate.slice(4, 6) === date.month &&
        +comment.createdDate.slice(8, 10) === date.date
      ) {
        setIsToday(true);
      }
    }
  }, [date, comment.createdDate]);

  return comment.deleted ? (
    <CommentWrap $isMe={memberId === comment.memberId}>
      <WriterWrap>
        {comment.depth ? <ReplyIcon /> : null}
        <CommentContent $deleted={comment.deleted}>
          {COMMENT.deleted}
        </CommentContent>
      </WriterWrap>
    </CommentWrap>
  ) : (
    <CommentWrap onClick={reply} $isMe={memberId === comment.memberId}>
      <CommentTop>
        <WriterWrap>
          {comment.depth ? <ReplyIcon /> : null}
          <WriterProfile src={writer?.profileImageURL} />
          <WriterName $isMe={memberId === comment.memberId}>
            {writer?.nickname}
          </WriterName>
          <CreateTime>
            {isToday
              ? comment.createdAt
              : comment.createdDate
              ? `20${comment.createdDate}`
              : ''}
          </CreateTime>
        </WriterWrap>
        <div ref={setting}>
          <CommentSetting
            commentId={comment.commentId}
            writerId={comment.memberId}
          />
        </div>
      </CommentTop>
      <CommentContent
        $deleted={comment.deleted}
        $isReply={comment.depth ? true : false}
      >
        {comment.content}
      </CommentContent>
    </CommentWrap>
  );
};

export default CommentDisplay;

const CommentWrap = styled.div<{ $isMe: boolean }>`
  display: flex;
  padding: var(--gap-sm, 0.75rem) var(--gap-md, 1rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-sm, 0.75rem);
  align-self: stretch;

  border-radius: var(--radius-sm, 0.75rem);
  border: ${props =>
    props.$isMe
      ? 'none'
      : `var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.assistive}`};

  background: ${props =>
    props.$isMe ? semantic.light.fill.transparent.assistive : 'none'};
`;

const CommentTop = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-md, 1rem);
  align-self: stretch;
`;

const WriterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
  flex: 1 0 0;
`;

const WriterProfile = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: var(--radius-empty, 1.5rem);
  object-fit: cover;
  background: ${semantic.light.fill.transparent.alternative};
`;

const WriterName = styled.p<{ $isMe: boolean }>`
  ${TYPO.label2}
  color: ${props =>
    props.$isMe
      ? semantic.light.accent.solid.hero
      : semantic.light.object.solid.normal};
`;

const CreateTime = styled.p`
  ${TYPO.caption1}
  color: ${semantic.light.object.transparent.assistive};
`;

const CommentContent = styled.div<{ $deleted?: boolean; $isReply?: boolean }>`
  ${TYPO.body1}
  ${props => props.$isReply && `padding-left: var(--gap-2xl, 2rem);`}
  color: ${props =>
    props.$deleted
      ? semantic.light.object.transparent.alternative
      : semantic.light.object.solid.normal};
`;
