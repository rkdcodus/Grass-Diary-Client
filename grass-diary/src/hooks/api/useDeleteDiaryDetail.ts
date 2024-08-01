import API from '@services/index';
import { END_POINT } from '@constants/api';
import { useMutation } from '@tanstack/react-query';
import { CONSOLE_ERROR } from '@constants/message';

const deleteAxios = (id: Id) => {
  return API.delete(END_POINT.DIARY(id));
};

export const useDeleteDiaryDetail = (id: Id) => {
  return useMutation({
    mutationFn: () => {
      return deleteAxios(id);
    },
    onSuccess: () => {
      localStorage.removeItem('lastWritingDate');
    },
    onError: error => {
      console.error(CONSOLE_ERROR.DIARY.DELETE + error);
    },
  });
};
