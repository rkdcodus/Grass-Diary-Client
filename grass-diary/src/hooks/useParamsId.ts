import { ERROR } from '@constants/message';
import { useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router-dom';

export const useParamsId = () => {
  const { diaryId } = useParams();
  const diaryId_num = Number(diaryId);
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (Number.isNaN(diaryId_num) || diaryId_num === 0) {
      showBoundary(new Error(ERROR.diary_not_found_err));
    }
  }, [diaryId_num]);

  return diaryId_num;
};
