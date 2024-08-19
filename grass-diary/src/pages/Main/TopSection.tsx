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
  max-width: 60rem;
  padding: 4.5rem 1.5rem;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const TodayDateText = styled.p`
  color: ${semantic.light.object.transparent.neutral};
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.00675rem;

  opacity: var(--opacity-visible, 1);
`;

const DailyQuestionText = styled.p`
  color: ${semantic.light.object.solid.hero};
  text-align: center;

  /* display/1 */
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3rem;
  letter-spacing: -0.045rem;

  opacity: var(--opacity-visible, 1);
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  align-items: flex-start;
  gap: 1rem;

  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
`;

const CreateDiaryBtn = styled.button`
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.75rem;
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.accent.solid.normal};
  border: none;
`;

const CreateDiaryText = styled.p`
  color: ${semantic.light.base.solid.white};
  text-align: center;

  /* label/3 */
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.00675rem;

  opacity: var(--opacity-visible, 1);
`;

const MydiaryBtn = styled.button`
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.75rem;
  border: 0.0625rem solid ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};
`;

const MydaryTxt = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  /* label/3 */
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.00675rem;

  opacity: var(--opacity-visible, 1);
`;
