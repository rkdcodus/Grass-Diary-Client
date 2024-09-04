import { useEffect, useRef } from 'react';
import { Feed, PopularFeed } from '@components/index';
import { useLatestDiaries } from '@hooks/api/useLatestDiaries';
import { NULL } from '@constants/message';
import styled from 'styled-components';
import { semantic } from '@styles/semantic';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Share = () => {
  const target = useRef<HTMLDivElement>(null);
  const { latest, fetchNextPage } = useLatestDiaries();

  const callback: IntersectionObserverCallback = async ([entry]) => {
    if (entry.isIntersecting) {
      fetchNextPage();
    }
  };

  // 무한 스크롤
  useEffect(() => {
    if (latest?.length === 0) {
      window.scrollTo(0, 0);
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.3 });
    const { current } = target;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [latest]);

  return (
    <>
      <PopularFeed />
      <Background>
        <FeedContainer>
          {latest ? (
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 960: 2 }}>
              <Masonry columnsCount={2}>
                {latest.map(page =>
                  page?.map(data => {
                    return (
                      <Feed key={data.diaryId} feed={data} isTop={false} />
                    );
                  }),
                )}
              </Masonry>
            </ResponsiveMasonry>
          ) : (
            <FeedNull>{NULL.share_feed}</FeedNull>
          )}
        </FeedContainer>
        <Observe ref={target} />
      </Background>
    </>
  );
};

export default Share;

const FeedNull = styled.div`
  width: 100%;
  height: 10rem;
  text-align: center;
  line-height: 10rem;
`;

const Background = styled.section`
  background: ${semantic.light.bg.solid.subtler};
`;

const FeedContainer = styled.div`
  max-width: 60rem;
  padding: var(--gap-7xl, 4.5rem) var(--gap-xl, 1.5rem);
  margin: auto;
`;

const Observe = styled.div`
  width: 100%;
  height: 5rem;
`;
