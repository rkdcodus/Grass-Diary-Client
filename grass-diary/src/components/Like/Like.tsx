import stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import { useCountLike } from '@hooks/api/useCountLike';
import { useUser } from '@state/user/useUser';
import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { ReactComponent as LikeBorder } from '@svg/favorite_border.svg';
import { ReactComponent as LikeIcon } from '@svg/favorite.svg';

interface ILikeProps {
  diaryId: Id;
  likeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
  liked: boolean | undefined;
}

const Like = ({ diaryId, likeCount, setLikeCount, liked }: ILikeProps) => {
  const [isPushed, setIsPushed] = useState(false);
  const memberId = useUser();
  const { postLike, deleteLike, postSuccess, deleteSuccess } = useCountLike({
    diaryId,
    memberId,
  });

  useEffect(() => {
    if (postSuccess) {
      setIsPushed(true);
      setLikeCount(prev => (prev += 1));
    }
  }, [postSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      setIsPushed(false);
      setLikeCount(prev => (prev -= 1));
    }
  }, [deleteSuccess]);

  useEffect(() => {
    liked ? setIsPushed(true) : setIsPushed(false);
  }, [liked]);

  return (
    <>
      <LikeContainer $isPushed={isPushed}>
        <LikeCount>{likeCount}</LikeCount>
        {isPushed ? (
          <YES onClick={() => deleteLike()} />
        ) : (
          <No onClick={() => postLike()} />
        )}
      </LikeContainer>
    </>
  );
};

export default Like;

const LikeContainer = styled.div<{ $isPushed: boolean }>`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--gap-xs, 10px) var(--gap-md, 16px);
  gap: var(--gap-2xs, 8px);
  border-radius: var(--radius-xs, 8px);
  border: var(--stroke-thin, 1px) solid
    ${props =>
      props.$isPushed
        ? semantic.light.accent.solid.normal
        : semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${props =>
    props.$isPushed
      ? semantic.light.accent.transparent.normal
      : semantic.light.bg.solid.normal};

  color: ${props =>
    props.$isPushed
      ? semantic.light.accent.solid.hero
      : semantic.light.object.transparent.alternative};
`;

const LikeCount = styled.p`
  text-align: center;
  ${TYPO.label2}
`;

const YES = styled(LikeIcon)`
  cursor: pointer;
  fill: ${semantic.light.accent.solid.hero};
`;

const No = styled(LikeBorder)`
  cursor: pointer;
`;
