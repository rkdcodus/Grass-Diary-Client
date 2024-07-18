import { useParams } from 'react-router-dom';

export const useParamsId = () => {
  const { diaryId } = useParams();
  const diaryId_num = Number(diaryId);
  if (Number.isNaN(diaryId_num)) {
    return 0;
  }
  return diaryId_num;
};
