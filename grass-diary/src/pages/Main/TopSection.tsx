import { Link } from 'react-router-dom';
import { useTodayDate } from '@hooks/api/useTodayDate';
import { useTodayQuestion } from '@hooks/api/useTodayQuestion';

const TopSection = () => {
  // 질문 데이터를 가져오는 쿼리
  const { question } = useTodayQuestion();
  // 날짜 데이터를 가져오는 쿼리
  const { date } = useTodayDate();

  return (
    <>
      <div>
        {date ? (
          <p>
            {date.year}년 {date.month}월 {date.date}일 {date.day}요일
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <span>
        {question?.question ? <>{question.question}</> : <>Loading...</>}
      </span>

      <Link to="/creatediary">
        <button>일기 쓰기</button>
      </Link>

      <Link to="/mypage">
        <button>나의 일기장</button>
      </Link>
    </>
  );
};

export default TopSection;
