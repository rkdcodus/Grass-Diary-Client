import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@services/index';
import { END_POINT } from '@constants/api';

interface ThemePurchaseData {
  memberId: number;
  colorCodeId: number;
  colorName: string;
  rgb: string;
}

interface PurchaseResponse {
  status: string;
  message: string;
  purchasedColor: {
    id: number;
    name: string;
    rgb: string;
  };
}

interface ErrorResponse {
  status: number;
  code: string;
  description: string;
}

export const useTheme = () => {
  const queryClient = useQueryClient();

  return useMutation<PurchaseResponse, ErrorResponse, ThemePurchaseData>({
    mutationFn: ({
      memberId,
      colorCodeId,
      colorName,
      rgb,
    }: ThemePurchaseData) =>
      API.post<PurchaseResponse>(END_POINT.theme_color(colorCodeId), {
        memberId,
        colorCodeId,
        colorName,
        rgb,
      }),
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
      console.log('success', res.purchasedColor);
    },
    onError: error => {
      console.error('error', error.response.data.description);
    },
  });
};
