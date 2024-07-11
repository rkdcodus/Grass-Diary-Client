import { useQuery } from '@tanstack/react-query';
import API from '@services/index';
import { END_POINT } from '@constants/api';

interface IUseDiaryProps {
  memberId: number | null;
  currentPage: number;
  sortOrder: string;
}

const useDiary = ({ memberId, currentPage, sortOrder }: IUseDiaryProps) => {
  const queryKey = ['diaryList', { memberId, currentPage, sortOrder }];

  const queryFn = async (): Promise<IDiaryResponse> => {
    let apiUrl = END_POINT.MY_DIARIES(memberId, currentPage);

    if (sortOrder === 'oldest') apiUrl += `&sort=createdAt,ASC`;
    const response = await API.get(apiUrl);

    return response.data;
  };

  const { data: diary } = useQuery<
    IDiaryResponse,
    Error,
    IDiaryResponse,
    (string | IUseDiaryProps)[]
  >({
    queryKey,
    queryFn,
    enabled: !!memberId,
    onError: error =>
      console.error(`사용자의 일기를 조회할 수 없습니다. ${error}`),
  });

  const diaryList: IDiary[] = diary?.content || [];
  const pageSize: number = diary?.totalPages || 0;

  return { diaryList, pageSize };
};

export default useDiary;
