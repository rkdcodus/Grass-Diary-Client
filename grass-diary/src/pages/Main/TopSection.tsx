import * as S from '@styles/Main/TopSection.style';
import { Link } from 'react-router-dom';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { useTodayQuestion } from '@hooks/api/useTodayQuestion';
import { MAIN_MESSAGES } from '@constants/message';

const TopSection = () => {
  // 질문 데이터를 가져오는 쿼리
  const { question } = useTodayQuestion();
  // 날짜 데이터를 가져오는 쿼리
  const { date } = useTodayDate();

  return (
    <>
      <S.Container>
        <S.TodayDateBox>
          {date ? (
            <p>
              {date.year}년 {date.month}월 {date.date}일 {date.day}요일
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </S.TodayDateBox>

        <S.DailyQuestionText>
          {question?.question ? <>"{question.question}"</> : <>Loading...</>}
        </S.DailyQuestionText>

        <S.ButtonContainer>
          <S.CreateDiaryBtn>
            <Link to="/creatediary">
              <S.CreateDiaryText>
                {MAIN_MESSAGES.top_section.write_diary}
              </S.CreateDiaryText>
            </Link>
          </S.CreateDiaryBtn>

          <S.MydiaryBtn>
            <Link to="/mypage">
              <S.MydiaryTxt>{MAIN_MESSAGES.top_section.my_diary}</S.MydiaryTxt>
            </Link>
          </S.MydiaryBtn>
        </S.ButtonContainer>
      </S.Container>
    </>
  );
};

export default TopSection;
