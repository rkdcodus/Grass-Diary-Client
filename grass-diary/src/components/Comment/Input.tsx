import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

import { useEffect, useState } from 'react';

import { useParamsId } from '@hooks/useParamsId';
import { useUser } from '@state/user/useUser';
import { useProfile } from '@state/profile/useProfile';
import { usePostComment } from '@hooks/api/comment/usePostcomment';
import { usePatchComment } from '@hooks/api/comment/usePatchComment';
import { useCommentActions } from '@state/comment/CommentStore';
import { ReactComponent as ReplySvg } from '@svg/subdirectory_arrow_right.svg';

type CommentInputProps = {
  submit: (e) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isReply: boolean;
  isPatch: boolean;
};

type PostInputProps = {
  parentId: Id | null;
};

type PatchInputProps = {
  commentId: Id;
  isReply: boolean;
  content: string;
};

const CommentInput = ({
  submit,
  text,
  setText,
  isReply,
  isPatch,
}: CommentInputProps) => {
  const { profileImageURL, nickname } = useProfile();
  const { resetEditId } = useCommentActions();
  const [focus, setFocus] = useState(false);
  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const commentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const cancle = () => {
    resetEditId();
  };

  return (
    <InputComment $focus={focus}>
      <CommentTop>
        {isReply && <ReplyIcon />}
        <WriterWrap>
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
          placeholder="댓글을 입력해주세요"
        ></Input>
        {isPatch && (
          <SubmitBtn type="button" onClick={cancle}>
            취소
          </SubmitBtn>
        )}
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
  const [text, setText] = useState('');

  const submit = e => {
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
      },
    });
  };
  return (
    <CommentInput
      submit={submit}
      text={text}
      setText={setText}
      isReply={parentId ? true : false}
      isPatch={false}
    />
  );
};

const PatchInput = ({ commentId, isReply, content }: PatchInputProps) => {
  const [text, setText] = useState('');
  const diaryId = useParamsId();
  const { mutate: patchComment } = usePatchComment(diaryId);
  const { resetEditId } = useCommentActions();

  const submit = e => {
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
      isPatch={true}
    />
  );
};

export { PostInput, PatchInput };

const ReplyIcon = styled(ReplySvg)`
  display: flex;
  padding: var(--gap-5xs, 2px);
  align-items: center;
  gap: var(--gap-empty, 0px);
  margin-right: -4px;
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

const InputComment = styled.div<{ $focus: boolean }>`
  display: flex;
  padding: var(--gap-sm, 12px) var(--gap-md, 16px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-md, 16px);
  align-self: stretch;

  border-radius: var(--radius-sm, 12px);
  opacity: var(--opacity-visible, 1);
  border: var(--stroke-thin, 1px) solid
    ${props =>
      props.$focus
        ? semantic.light.accent.solid.hero
        : semantic.light.border.transparent.normal};

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
  gap: var(--gap-empty, 0px);
  flex: 1 0 0;

  border: none;
  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${semantic.light.object.transparent.assistive};
  }
  &:-ms-input-placeholder {
    color: ${semantic.light.object.transparent.assistive};
  }

  // ${TYPO.body1}
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;

  caret-color: ${semantic.light.accent.solid.normal};
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
