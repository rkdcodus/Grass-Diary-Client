import { useMutation } from '@tanstack/react-query';
import API from '@services/index';
import { END_POINT } from '@constants/api';

export const usePostImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => API.post(END_POINT.image, formData),
    onError: error => {
      console.error(error.message);
    },
  });
};
