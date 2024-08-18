import dayjs from 'dayjs';
import { useCallback } from 'react';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';
import { useGrassRecord } from '@hooks/api/useGrassRecord';

const MiddleSection = () => {
  // 잔디 날짜 계산
  const currentDate = dayjs();
  const currentMonth = currentDate.format('M');
  const nextMonthFirstDay = currentDate.add(1, 'month').startOf('month');
  const currentMonthLastDay = nextMonthFirstDay.subtract(1, 'day');
  const { grassQuery } = useGrassRecord();

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
  max-width: var(--vw-desktop-min, 60rem); /* 960px */
  padding: var(--gap-2xl, 2rem) var(--gap-xl, 1.5rem); /* 32px, 24px */
  flex-direction: column;
  align-items: center;
  gap: var(--gap-2xl, 2rem); /* 32px */

  border-radius: var(--radius-empty, 0rem); /* 0px */
  opacity: var(--opacity-visible, 1);
`;

const GrassLabel = styled.div`
  display: flex;
  padding: var(--gap-2xs, 0.5rem) var(--gap-md, 1rem); /* 8px, 16px */
  justify-content: center;
  align-items: center;
  gap: var(--gap-3xs, 0.375rem); /* 6px */

  border-radius: var(--radius-sm, 0.75rem); /* 12px */
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.alternative}; /* 1px */
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};
`;

const GrassLabelText = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* label/2 */
  font-family: Pretendard;
  font-size: 1rem; /* 16px */
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 22px, 137.5% */
  letter-spacing: -0.006rem; /* -0.096px */

  opacity: var(--opacity-visible, 1);
`;

const GrassBanner = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem); /* 0px */
  flex-direction: column;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem); /* 8px */
  align-self: stretch;

  border-radius: var(--radius-empty, 0rem); /* 0px */
  opacity: var(--opacity-visible, 1);
`;

const GrassBannerText = styled.p`
  align-self: stretch;
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* title/1 */
  font-family: Pretendard;
  font-size: 1.25rem; /* 20px */
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem; /* 28px, 140% */
  letter-spacing: -0.0195rem; /* -0.312px */

  opacity: var(--opacity-visible, 1);
`;

const GrassBannerTextSecond = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* label/2 */
  font-family: Pretendard;
  font-size: 1rem; /* 16px */
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 22px, 137.5% */
  letter-spacing: -0.006rem; /* -0.096px */

  opacity: var(--opacity-visible, 1);
`;

const HighlightedText = styled.span`
  color: ${semantic.light.accent.solid.normal};
`;

const GrassTable = styled.p`
  display: grid;
  grid-template-columns: repeat(7, 3.5rem); /* 56px */
  grid-gap: var(--gap-xs, 0.625rem); /* 10px */
  margin-bottom: 0.625rem; /* 10px */
`;

const DayBox = styled.div`
  width: 3.5rem; /* 56px */
  height: 3.5rem; /* 56px */

  border-radius: var(--radius-sm, 0.75rem); /* 12px */
  opacity: var(--opacity-visible, 1);

  /* shadow/embossed */
  box-shadow: 0rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.04),
    /* 1px */ 0rem 0.125rem 0.25rem 0rem rgba(0, 0, 0, 0.08); /* 2px 4px */
`;
