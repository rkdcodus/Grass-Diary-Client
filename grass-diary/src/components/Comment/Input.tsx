import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { useEffect, useState } from 'react';

import { useParamsId } from '@hooks/useParamsId';
import { useUser } from '@state/user/useUser';
import { useProfile } from '@state/profile/useProfile';
import { useCommentActions } from '@state/comment/CommentStore';
import { usePostComment } from '@hooks/api/comment/usePostComment';
import { usePatchComment } from '@hooks/api/comment/usePatchComment';
import { ReactComponent as ReplyIcon } from '@svg/subdirectory_arrow_right.svg';
import { COMMENT } from '@constants/message';

const CommentInput = ({
  submit,
  text,
  setText,
  isReply,
  isCancelBtn,
  isPatch,
}: CommentInputProps) => {
  const { profileImageURL, nickname } = useProfile();
  const { resetEditId, resetReplyId } = useCommentActions();
  const [focus, setFocus] = useState(false);

  // focus 될 때
  const onFocus = () => setFocus(true);

  // focus 해지될 때
  const onBlur = () => setFocus(false);

  const commentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const cancel = () => {
    if (isPatch) resetEditId();
    else resetReplyId();
  };

  return (
    <InputComment $focus={focus} $isReply={isReply}>
      <CommentTop>
        <WriterWrap>
          {isReply && <ReplyIcon />}
          <WriterProfile src={profileImageURL} />
          <WriterName>{nickname}</WriterName>
        </WriterWrap>
      </CommentTop>
      <InputWrap>
        <Input
          value={text}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={commentHandler}
          placeholder={COMMENT.PLACEHOLDER}
        />
        {isCancelBtn && <CancelBtn onClick={cancel}>취소</CancelBtn>}
        <SubmitBtn type="button" onClick={submit} disabled={text === ''}>
          등록
        </SubmitBtn>
      </InputWrap>
    </InputComment>
  );
};

// parentId가 null이라면 댓글, 아니라면 대댓글
const PostInput = ({ parentId }: PostInputProps) => {
  const diaryId = useParamsId();
  const memberId = useUser();
  const { mutate: postComment } = usePostComment(diaryId);
  const { resetReplyId } = useCommentActions();
  const [text, setText] = useState('');

  const submit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (text === '') return;
    const request = {
      memberId: memberId,
      diaryId: diaryId,
      content: text,
      parentCommentId: parentId,
    };

    postComment(request, {
      onSuccess() {
        setText('');
        resetReplyId();
      },
    });
  };
  return (
    <CommentInput
      submit={submit}
      text={text}
      setText={setText}
      isReply={parentId ? true : false}
      isCancelBtn={parentId ? true : false}
      isPatch={false}
    />
  );
};

const PatchInput = ({ commentId, isReply, content }: PatchInputProps) => {
  const [text, setText] = useState('');
  const diaryId = useParamsId();
  const { mutate: patchComment } = usePatchComment(diaryId);
  const { resetEditId } = useCommentActions();

  const submit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (text === '') return;
    const request = {
      commentId: commentId,
      content: {
        content: text,
      },
    };

    if (commentId) {
      patchComment(request, {
        onSuccess() {
          resetEditId();
        },
      });
    }
  };

  useEffect(() => {
    setText(content);
  }, [content]);

  return (
    <CommentInput
      submit={submit}
      text={text}
      setText={setText}
      isReply={isReply}
      isCancelBtn={true}
      isPatch={true}
    />
  );
};

export { PostInput, PatchInput };

const CommentTop = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-md, 16px);
  align-self: stretch;
`;

const WriterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 8px);
  flex: 1 0 0;
`;

const WriterProfile = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: var(--radius-empty, 24px);
  object-fit: cover;
`;

const WriterName = styled.p`
  ${TYPO.label2}
  color: ${semantic.light.object.solid.normal};
`;

const InputComment = styled.div<{ $focus: boolean; $isReply: boolean }>`
  display: flex;
  padding: var(--gap-sm, 12px) var(--gap-md, 16px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-md, 16px);
  align-self: stretch;

  border-radius: var(--radius-sm, 12px);
  border: var(--stroke-thin, 1px) solid
    ${props =>
      props.$focus
        ? semantic.light.accent.solid.hero
        : semantic.light.border.transparent.normal};
  ${props =>
    props.$isReply &&
    `box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.06), 0px 3px 6px 0px rgba(0, 0, 0, 0.11);`}

  &:hover {
    background: rgba(59, 59, 59, 0.05);
  }
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-md, 16px);
  align-self: stretch;
`;

const Input = styled.input`
  display: flex;
  padding: var(--gap-empty, 0px) var(--gap-4xs, 4px);
  align-items: center;
  flex: 1 0 0;

  border: none;
  ${TYPO.body1}
  caret-color: ${semantic.light.accent.solid.normal};

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${semantic.light.object.transparent.assistive};
  }
  &:-ms-input-placeholder {
    color: ${semantic.light.object.transparent.assistive};
  }
`;

const CancelBtn = styled.div`
  cursor: pointer;
  padding: var(--gap-4xs, 4px) var(--gap-2xs, 8px);
  gap: var(--gap-2xs, 8px);
  text-align: center;

  ${TYPO.label1}
  color: ${semantic.light.object.transparent.alternative};
`;

const SubmitBtn = styled.button`
  display: flex;
  padding: var(--gap-4xs, 4px) var(--gap-2xs, 8px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 8px);
  text-align: center;

  ${TYPO.label1}
  color: ${semantic.light.accent.solid.normal};

  &:disabled {
    color: ${semantic.light.object.transparent.disabled};
  }
`;
