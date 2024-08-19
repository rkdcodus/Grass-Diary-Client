import stylex from '@stylexjs/stylex';
import { ReactComponent as Favorite } from '@svg/favorite.svg';

const feed = stylex.create({
  like: (justifyContent: string) => ({
    display: 'flex',
    gap: '0.625rem',

    justifyContent,
  }),
});

interface INormalLikeProps {
  likeCount: number;
  justifyContent: string;
}

const NormalLike = ({ likeCount, justifyContent }: INormalLikeProps) => {
  return (
    <div {...stylex.props(feed.like(justifyContent))}>
      <span>
        <Favorite></Favorite>
      </span>
      <span>{likeCount}</span>
    </div>
  );
};

export default NormalLike;
