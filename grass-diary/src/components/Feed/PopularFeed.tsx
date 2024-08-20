import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styled from 'styled-components';
import { Feed } from '@components/index';
import { usePopularDiaries } from '@hooks/api/usePopularDiaries';
import { NULL } from '@constants/message';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

const PopularFeed = () => {
  const { data: top10 } = usePopularDiaries();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const feedList = top10?.map(data => (
    <Feed
      key={data.diaryId}
      likeCount={data.diaryLikeCount}
      link={`/diary/${data.diaryId}`}
      createdAt={data.createdAt}
      content={data.content}
      name={data.nickname}
      memberId={data.memberId}
      transparency={data.transparency}
    />
  ));

  return (
    <RankContainer>
      <RankText>이번 주 Top 10</RankText>
      <RankCardContainer>
        <div className="slider-container">
          {top10 && top10.length > 3 ? (
            <Slider {...settings}>{feedList}</Slider>
          ) : (
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}
            >
              {feedList}
            </div>
          )}
          {top10 && !top10.length ? <div>{NULL.SHARE_POPULAR_FEED}</div> : null}
        </div>
      </RankCardContainer>
    </RankContainer>
  );
};

export default PopularFeed;

const RankContainer = styled.div`
  display: flex;
  padding: var(--gap-4xl, 3rem) var(--gap-xl, 1.5rem);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xl, 2rem);
  align-self: stretch;

  background: ${semantic.light.fill.transparent.alternative};
`;

const RankText = styled.p`
  color: ${semantic.light.object.transparent.neutral};
  text-align: center;

  ${TYPO.title2}
`;

const RankCardContainer = styled.div`
  width: 60rem;
`;
