import dayjs from 'dayjs';
import styled from 'styled-components';
import { useCallback } from 'react';
import { semantic } from '@styles/semantic';
import { useGrassRecord } from '@hooks/api/useGrassRecord';
import { MAIN_MESSAGES } from '@constants/message';
import { TYPO } from '@styles/typo';

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
          borderRadius: '0.75rem',
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
          <GrassLabelText>
            {MAIN_MESSAGES.middle_section.status_label}
          </GrassLabelText>
        </GrassLabel>

        <GrassBanner>
          <GrassBannerText>
            {currentMonth}
            {MAIN_MESSAGES.middle_section.monthly_grass_summary}
            <HighlightedText>
              {grassQuery?.thisMonthCount ? grassQuery?.thisMonthCount : 0}
            </HighlightedText>
            {MAIN_MESSAGES.middle_section.planted_grass_count}
          </GrassBannerText>
          <GrassBannerTextSecond>
            {MAIN_MESSAGES.middle_section.grass_prompt}
          </GrassBannerTextSecond>
        </GrassBanner>

        <GrassTable>
          {daysInMonth.map(day => (
            <div key={day} style={getGrassStyle(day)}>
              <DayBox></DayBox>
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

  background: ${semantic.light.bg.solid.normal};
`;

const GrassLabelText = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  ${TYPO.label2}
`;

const GrassBanner = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  flex-direction: column;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
  align-self: stretch;
`;

const GrassBannerText = styled.p`
  align-self: stretch;
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  ${TYPO.title1}
`;

const GrassBannerTextSecond = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  ${TYPO.label2}
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

  background: ${semantic.light.fill.transparent.assistive};

  box-shadow: 0rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0.125rem 0.25rem 0rem rgba(0, 0, 0, 0.08);
`;
