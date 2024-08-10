import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

import API from '@services/index';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import CommentSetting from './CommentSetting';
import avatarBg from '@svg/avatarBg.svg';

const useGetComment = (diaryId: Id) => {
  return useQuery({
    queryKey: ['comment', diaryId],
    queryFn: async () => {
      const res = await API.get(`/comment/${diaryId}`);
      return res.data;
    },
  });
};

const usePostComment = (diaryId: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: PostRequest) =>
      API.post(`/comment/${diaryId}`, request),
    onMutate: async request => {
      await queryClient.cancelQueries({ queryKey: ['comment', diaryId] });

      // 업데이트 이전 정보 저장.
      const priviousData = queryClient.getQueryData(['comment', diaryId]);

      queryClient.setQueryData(['comment', diaryId], prev => [
        ...prev,
        request,
      ]);

      return { priviousData };
    },
    onError(error, data, context) {
      queryClient.setQueryData(['comment', diaryId], context.priviousData);
      console.error('댓글 post 실패 ', error);
    },
    onSettled() {
      queryClient.invalidateQueries(['comment', diaryId]);
    },
  });
};

const usePatchComment = (diaryId: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestDto: PatchRequestDto) => {
      return API.patch(`/comment/${requestDto.commentId}`, requestDto.request);
    },
    onSuccess() {
      queryClient.invalidateQueries(['comment', diaryId]);
    },
    onError(error) {
      console.error(error);
    },
  });
};

const Comments = ({ memberId, diaryId, setCommentCount }: CommentsProps) => {
  const [editingId, setEditingId] = useState(0);
  const { data: comments } = useGetComment(diaryId);
  const { mutate: postComment } = usePostComment(diaryId);
  const { mutate: patchComment } = usePatchComment(diaryId);
  const [text, setText] = useState('');

  const commentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const postSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    const request = {
      memberId: memberId,
      diaryId: diaryId,
      content: text,
      parentCommentId: null,
    };
    postComment(request);
  };

  const patchSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    const requestDto = {
      commentId: editingId,
      request: {
        content: text,
      },
    };

    if (editingId) {
      patchComment(requestDto);
      setEditingId(0);
    }
  };

  useEffect(() => {
    if (comments) setCommentCount(comments.length);
  }, [comments]);

  return (
    <>
      {comments?.map((comment: CommentResponse) => {
        return (
          <Comment key={comment.commentId}>
            <CommentTop>
              <WriterWrap>
                <WriterProfile src={avatarBg} />
                <WriterName>{comment.memberId}</WriterName>
              </WriterWrap>
              {comment.memberId ? (
                <CommentSetting
                  diaryId={diaryId}
                  commentId={comment.commentId}
                  setEditingId={setEditingId}
                />
              ) : null}
            </CommentTop>
            {editingId === comment.commentId ? (
              <form>
                <input onChange={commentHandler}></input>
                <button onClick={patchSubmit}>저장</button>
              </form>
            ) : (
              <CommentContent>
                {comment.content || '삭제된 댓글입니다.'}
              </CommentContent>
            )}
          </Comment>
        );
      })}
      <Comment>
        <CommentTop>
          <WriterWrap>
            <WriterProfile src={avatarBg} />
            <WriterName>작성 칸</WriterName>
          </WriterWrap>
        </CommentTop>
        <form>
          <input onChange={commentHandler}></input>
          <button onClick={postSubmit}>저장</button>
        </form>
      </Comment>
    </>
  );
};

export default Comments;

const Comment = styled.div`
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

const CommentContent = styled.div`
  color: ${semantic.light.object.solid.normal};
  ${TYPO.body1}
`;
