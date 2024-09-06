import stylex from '@stylexjs/stylex';
import { Fragment, useEffect, useRef } from 'react';
import { Feed, PopularFeed } from '@components/index';
import { useLatestDiaries } from '@hooks/api/useLatestDiaries';
import { NULL } from '@constants/message';
import styled from 'styled-components';
import { semantic } from '@styles/semantic';

const Share = () => {
  const target = useRef<HTMLDivElement>(null);
  const { latest, fetchNextPage } = useLatestDiaries();

  const feedList = latest?.map((group, i) => (
    <Fragment key={i}>
      {group &&
        group?.map(data => {
          return <Feed key={data.diaryId} feed={data} isTop={false} />;
        })}
    </Fragment>
  ));

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
            <CardContainer>{feedList}</CardContainer>
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
  display: flex;
  max-width: 60rem;
  padding: var(--gap-7xl, 4.5rem) var(--gap-xl, 1.5rem);
  flex-direction: column;
  align-items: flex-start;
  margin: auto;
`;

const CardContainer = styled.ul`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1rem var(--gap-md, 1rem);
  align-self: stretch;
  flex-wrap: wrap;
`;

const Observe = styled.div`
  width: 100%;
  height: 5rem;
`;
