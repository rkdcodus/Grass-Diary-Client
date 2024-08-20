import { Link } from 'react-router-dom';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { useTodayQuestion } from '@hooks/api/useTodayQuestion';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';

const TopSection = () => {
  // 질문 데이터를 가져오는 쿼리
  const { question } = useTodayQuestion();
  // 날짜 데이터를 가져오는 쿼리
  const { date } = useTodayDate();

  return (
    <>
      <Container>
        <TodayDateText>
          {date ? (
            <p>
              {date.year}년 {date.month}월 {date.date}일 {date.day}요일
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </TodayDateText>

        <DailyQuestionText>
          {question?.question ? <>"{question.question}"</> : <>Loading...</>}
        </DailyQuestionText>

        <ButtonContainer>
          <CreateDiaryBtn>
            <Link to="/creatediary">
              <CreateDiaryText>일기 쓰기</CreateDiaryText>
            </Link>
          </CreateDiaryBtn>

          <MydiaryBtn>
            <Link to="/mypage">
              <MydaryTxt>내 일기장</MydaryTxt>
            </Link>
          </MydiaryBtn>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default TopSection;

const Container = styled.div`
  display: flex;
  max-width: 960px;
  padding: 72px 24px;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const TodayDateText = styled.p`
  color: ${semantic.light.object.transparent.neutral};
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.108px;

  opacity: var(--opacity-visible, 1);
`;

const DailyQuestionText = styled.p`
  color: ${semantic.light.object.solid.hero};
  text-align: center;

  /* display/1 */
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 120% */
  letter-spacing: -0.72px;

  opacity: var(--opacity-visible, 1);
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: flex-start;
  gap: var(--gap-md, 16px);

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const CreateDiaryBtn = styled.button`
  display: flex;
  padding: var(--gap-sm, 12px) var(--gap-md, 16px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 8px);

  border-radius: var(--radius-sm, 12px);
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.accent.solid.normal};
  border: none;
`;

const CreateDiaryText = styled.p`
  color: ${semantic.light.base.solid.white};
  text-align: center;

  /* label/3 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.108px;

  opacity: var(--opacity-visible, 1);
`;

const MydiaryBtn = styled.button`
  display: flex;
  padding: var(--gap-sm, 12px) var(--gap-md, 16px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 8px);

  border-radius: var(--radius-sm, 12px);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};
`;

const MydaryTxt = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* label/3 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.108px;

  opacity: var(--opacity-visible, 1);
`;
