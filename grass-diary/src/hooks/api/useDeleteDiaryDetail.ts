import API from '@services/index';
import END_POINT from '@constants/api';
import { useMutation } from '@tanstack/react-query';

const deleteAxios = (id: string) => {
  return API.delete(END_POINT.DIARY(id));
};

export const useDeleteDiaryDetail = (id: string) => {
  return useMutation({
    mutationFn: () => {
      return deleteAxios(id);
    },
    onSuccess: () => {
      localStorage.removeItem('lastWritingDate');
    },
    onError: error => {
      console.error(`사용자의 일기를 삭제할 수 없습니다. ${error}`);
    },
  });
};
