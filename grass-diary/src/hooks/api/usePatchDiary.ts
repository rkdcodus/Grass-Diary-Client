import API from '@services/index';
import { END_POINT } from '@constants/api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useError } from '@hooks/useError';
import { AxiosError } from 'axios';

interface PatchAxiosProps {
  diaryId: Id;
  request: DiaryRequest;
}

const fetchAxios = ({ diaryId, request }: PatchAxiosProps) => {
  return API.patch(END_POINT.diary(diaryId), request);
};

export const usePatchDiary = (diaryId: Id) => {
  const navigate = useNavigate();
  const { renderErrorPage } = useError();

  return useMutation({
    mutationFn: (request: DiaryRequest) => fetchAxios({ diaryId, request }),
    onSuccess: () => {
      navigate(`/diary/${diaryId}`, { replace: true, state: 'editcomplete' });
      localStorage.removeItem('diary_draft');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error(error.response?.data.description);
      renderErrorPage(error);
    },
  });
};
