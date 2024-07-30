import API from '@services/index';
import { END_POINT } from '@constants/api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const patchAxios = (diaryId, formData) => {
  return API.patch(END_POINT.DIARY(diaryId), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const usePatchDiary = (diaryId, file, requestDto) => {
  const formData = new FormData();
  const navigate = useNavigate();

  formData.append(
    'requestDto',
    new Blob([JSON.stringify(requestDto)], {
      type: 'application/json',
    }),
  );

  if (file) formData.append('image', file);

  return useMutation({
    mutationFn: () => patchAxios(diaryId, formData),
    onSuccess() {
      navigate(`/diary/${diaryId}`, { replace: true, state: 'editcomplete' });
    },
    onError(error) {
      console.error(error);
    },
  });
};
