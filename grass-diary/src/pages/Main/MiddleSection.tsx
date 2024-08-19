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
  max-width: var(--vw-desktop-min, 60rem);
  padding: var(--gap-2xl, 2rem) var(--gap-xl, 1.5rem);
  flex-direction: column;
  align-items: center;
  gap: var(--gap-2xl, 2rem);

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const GrassLabel = styled.div`
  display: flex;
  padding: var(--gap-2xs, 0.5rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-3xs, 0.375rem);

  border-radius: var(--radius-sm, 0.75rem);
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};
`;

const GrassLabelText = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* label/2 */
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
  letter-spacing: -0.006rem;

  opacity: var(--opacity-visible, 1);
`;

const GrassBanner = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  flex-direction: column;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
  align-self: stretch;

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const GrassBannerText = styled.p`
  align-self: stretch;
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* title/1 */
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.0195rem;

  opacity: var(--opacity-visible, 1);
`;

const GrassBannerTextSecond = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* label/2 */
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
  letter-spacing: -0.006rem;

  opacity: var(--opacity-visible, 1);
`;

const HighlightedText = styled.span`
  color: ${semantic.light.accent.solid.normal};
`;

const GrassTable = styled.p`
  display: grid;
  grid-template-columns: repeat(7, 3.5rem);
  grid-gap: var(--gap-xs, 0.625rem);
  margin-bottom: 0.625rem;
`;

const DayBox = styled.div`
  width: 3.5rem;
  height: 3.5rem;

  border-radius: var(--radius-sm, 0.75rem);
  opacity: var(--opacity-visible, 1);

  background: ${semantic.light.fill.transparent.assistive};

  box-shadow: 0rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0.125rem 0.25rem 0rem rgba(0, 0, 0, 0.08);
`;
