import { useParams } from 'react-router-dom';

export const useParamsId = () => {
  const { diaryId_str } = useParams();
  const diaryId_num = Number(diaryId_str);
  if (Number.isNaN(diaryId_num)) {
    return 0;
  }
  return diaryId_num;
};
