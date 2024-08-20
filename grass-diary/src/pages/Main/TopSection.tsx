import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { useTodayQuestion } from '@hooks/api/useTodayQuestion';
import { semantic } from '@styles/semantic';
import { MAIN_MESSAGES } from '@constants/message';
import { TYPO } from '@styles/typo';

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
              <CreateDiaryText>
                {MAIN_MESSAGES.top_section.write_diary}
              </CreateDiaryText>
            </Link>
          </CreateDiaryBtn>

          <MydiaryBtn>
            <Link to="/mypage">
              <MydiaryTxt>{MAIN_MESSAGES.top_section.my_diary}</MydiaryTxt>
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
`;

const TodayDateText = styled.p`
  color: ${semantic.light.object.transparent.neutral};
  text-align: center;

  ${TYPO.label3}
`;

const DailyQuestionText = styled.p`
  color: ${semantic.light.object.solid.hero};
  text-align: center;

  ${TYPO.display1}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const CreateDiaryBtn = styled.button`
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.75rem;

  background: ${semantic.light.accent.solid.normal};
  border: none;
`;

const CreateDiaryText = styled.p`
  color: ${semantic.light.base.solid.white};
  text-align: center;

  ${TYPO.label3}
`;

const MydiaryBtn = styled.button`
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.75rem;
  border: 0.0625rem solid ${semantic.light.border.transparent.alternative};

  background: ${semantic.light.bg.solid.normal};
`;

const MydiaryTxt = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  ${TYPO.label3}
`;
