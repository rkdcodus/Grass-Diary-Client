import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import AnimateReward from './AnimateReward';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import { useUser } from '@state/user/useUser';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';

const MiddleSection = () => {
  // 잔디 날짜 계산
  const currentDate = dayjs();
  const currentMonth = currentDate.format('M');
  const nextMonthFirstDay = currentDate.add(1, 'month').startOf('month');
  const currentMonthLastDay = nextMonthFirstDay.subtract(1, 'day');

  const memberId = useUser();

  // grass 쿼리
  const { data: grassQuery } = useQuery<GrassApiResponse>({
    queryKey: ['grass'],
    queryFn: () =>
      API.get(END_POINT.GRASS(memberId)).then(response => response.data),
    enabled: !!memberId, // memberId가 있을 때만 쿼리를 실행
  });

  const getGrassStyle = useCallback(
    (day: number | string) => {
      const grass = grassQuery?.grassInfoDTO.grassList.find(
        g => dayjs(g.createdAt).format('D') == day,
      );
      if (grass) {
        return {
          backgroundColor: `rgb(${grassQuery?.grassInfoDTO.colorRGB})`,
          opacity: grass.transparency,
          borderRadius: '12px',
        };
      }
      return {};
    },
    [grassQuery],
  );

  const daysInMonth = Array.from(
    { length: currentMonthLastDay.date() },
    (_, i) => i + 1,
  );

  const weeksInMonth: number[][] = [];
  let week: number[] = [];

  daysInMonth.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0 || index === daysInMonth.length - 1) {
      weeksInMonth.push(week);
      week = [];
    }
  });

  return (
    <>
      <Container>
        <GrassLabel>
          <GrassLabelText>이번 달 잔디 현황</GrassLabelText>
        </GrassLabel>

        <GrassBanner>
          <GrassBannerText>
            {currentMonth}월에는 총{' '}
            <HighlightedText>
              {grassQuery?.thisMonthCount ? grassQuery?.thisMonthCount : 0}개
            </HighlightedText>
            의 잔디를 심었어요.
          </GrassBannerText>
          <GrassBannerTextSecond>
            일기를 쓰고, 잔디를 더 심어보세요!
          </GrassBannerTextSecond>
        </GrassBanner>

        <GrassTable>
          {daysInMonth.map(day => (
            <div key={day} style={getGrassStyle(day)}>
              <DayBox>{/* {day} */}</DayBox>
            </div>
          ))}
        </GrassTable>
      </Container>
    </>
  );
};

export default MiddleSection;

const Container = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 960px);
  padding: var(--gap-2xl, 32px) var(--gap-xl, 24px);
  flex-direction: column;
  align-items: center;
  gap: var(--gap-2xl, 32px);

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const GrassLabel = styled.div`
  display: flex;
  padding: var(--gap-2xs, 8px) var(--gap-md, 16px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-3xs, 6px);

  border-radius: var(--radius-sm, 12px);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};
`;

const GrassLabelText = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* label/2 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.096px;

  opacity: var(--opacity-visible, 1);
`;

const GrassBanner = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  flex-direction: column;
  align-items: center;
  gap: var(--gap-2xs, 8px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const GrassBannerText = styled.p`
  align-self: stretch;
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* title/1 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 140% */
  letter-spacing: -0.312px;

  opacity: var(--opacity-visible, 1);
`;

const GrassBannerTextSecond = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* label/2 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.096px;

  opacity: var(--opacity-visible, 1);
`;

const HighlightedText = styled.span`
  color: ${semantic.light.accent.solid.normal};
`;

const GrassTable = styled.p`
  display: grid;
  grid-template-columns: repeat(7, 56px); /* 한 행에 7개의 박스를 고정 */
  grid-gap: var(--gap-xs, 10px); /* 박스 간의 간격 설정 */
  margin-bottom: 10px;
`;

const DayBox = styled.div`
  width: 56px;
  height: 56px;

  border-radius: var(--radius-sm, 12px);
  opacity: var(--opacity-visible, 1);

  /* shadow/embossed */
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04),
    0px 2px 4px 0px rgba(0, 0, 0, 0.08);
`;
