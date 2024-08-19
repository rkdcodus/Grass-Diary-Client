import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import { Feed } from '@components/index';
import { usePopularDiaries } from '@hooks/api/usePopularDiaries';
import { NULL } from '@constants/message';
import styled from 'styled-components';
import { semantic } from '@styles/semantic';

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
            feedList
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
  padding: 3rem 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  align-self: stretch;

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.fill.transparent.alternative};
`;

const RankText = styled.p`
  color: ${semantic.light.object.transparent.neutral};
  text-align: center;

  /* title/2 */
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: -0.023375rem;

  opacity: var(--opacity-visible, 1);
`;

const RankCardContainer = styled.div`
  width: 60rem;
`;
