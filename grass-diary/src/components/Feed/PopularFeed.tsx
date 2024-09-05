import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { ReactComponent as LeftArrow } from '@svg/chevron_left.svg';
import { ReactComponent as RightArrow } from '@svg/chevron_right.svg';

import { MAIN_MESSAGES, NULL } from '@constants/message';
import { Feed } from '@components/index';
import { usePopularDiaries } from '@hooks/api/usePopularDiaries';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrevArrow = (props: CustomArrowProps) => {
  return (
    <ArrowWrap onClick={props.onClick}>
      <LeftArrow
        width={20}
        height={20}
        fill={semantic.light.object.transparent.neutral}
      />
    </ArrowWrap>
  );
};

const NextArrow = (props: CustomArrowProps) => {
  return (
    <ArrowWrap onClick={props.onClick}>
      <RightArrow
        width={20}
        height={20}
        fill={semantic.light.object.transparent.neutral}
      />
    </ArrowWrap>
  );
};

const PopularFeed = () => {
  const { data: top10 } = usePopularDiaries();
  const location = useLocation();
  const [mobileSize, setMobileSize] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: mobileSize ? 1 : 3,
    slidesToScroll: mobileSize ? 1 : 3,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: mobileSize ? false : true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const feedList = top10?.map(data => (
    <Feed key={data.diaryId} feed={data} isTop={true} />
  ));

  const handleClick = () => window.scrollTo(0, 0);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 60em)');
    const resizeHandler = () => setMobileSize(media.matches);

    if (media.matches !== mobileSize) setMobileSize(media.matches);
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [mobileSize]);

  return (
    <RankContainer>
      <RankText>
        이번 주 Top {top10 && top10.length}
        {location.pathname === '/main' && (
          <Link to="/share" onClick={handleClick}>
            <SeeMoreContainer>
              <SeeMoreBtn>{MAIN_MESSAGES.bottom_section.see_more}</SeeMoreBtn>
              <RightArrow
                width={18}
                height={18}
                fill={semantic.light.object.transparent.alternative}
              />
            </SeeMoreContainer>
          </Link>
        )}
      </RankText>

      {top10 && top10.length > 3 ? (
        <SliderWrap>
          <CustomSlider {...settings} className="Slider">
            {top10?.map(data => (
              <Feed key={data.diaryId} feed={data} isTop={true} />
            ))}
          </CustomSlider>
        </SliderWrap>
      ) : (
        <FeedListWrap>{feedList}</FeedListWrap>
      )}
      {top10 && !top10.length ? <div>{NULL.share_popular_feed}</div> : null}
    </RankContainer>
  );
};

export default PopularFeed;

const SeeMoreContainer = styled.div`
  display: flex;
  padding: var(--gap-4xs, 0.25rem) var(--gap-2xs, 0.5rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
`;

const SeeMoreBtn = styled.button`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  ${TYPO.label2}
`;

const FeedListWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ArrowWrap = styled.div`
  display: flex;
  padding: var(--gap-4xs, 0.25rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-md, 1rem);
  border-radius: var(--radius-2xs, 0.25rem);
  cursor: pointer;
`;

const SliderWrap = styled.div`
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .slick-dots li button:before {
    content: none;
  }

  .slick-dots li {
    margin: 0;
  }

  .slick-dots button {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: ${semantic.light.fill.transparent.normal};
  }

  .slick-dots .slick-active button {
    background: ${semantic.light.accent.solid.normal};
  }
`;

const CustomSlider = styled(Slider)`
  width: 60rem;
  display: flex;
  align-items: center;
  gap: var(--gap-md, 0.6rem);
  flex: 1 0 0;

  @media screen and (max-width: 60em) {
    width: 22rem;
  }
`;

const RankContainer = styled.section`
  display: flex;
  padding: var(--gap-4xl, 3rem) var(--gap-xl, 1.5rem);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xl, 2rem);
  align-self: stretch;
  overflow: hidden;
  background: ${semantic.light.fill.transparent.alternative};

  @media screen and (max-width: 60em) {
    min-width: 20em;
    padding: var(--gap-4xl, 3rem) var(--gap-md, 1rem);
  }
`;

const RankText = styled.span`
  display: flex;
  padding: var(--gap-empty, 0rem) var(--gap-xl, 1.5rem);
  flex-direction: column;
  gap: var(--gap-md, 1rem);

  color: ${semantic.light.object.transparent.neutral};
  text-align: center;

  ${TYPO.title2}
`;
