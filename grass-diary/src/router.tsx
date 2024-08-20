import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@components/index';

import {
  Intro,
  Main,
  CreateDiary,
  EditDiary,
  DiaryDetail,
  Share,
  Setting,
  MyPage,
  NonExistentDiary,
  RewardPage,
} from '@pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/creatediary', element: <CreateDiary /> },
      { path: '/editdiary/:diaryId', element: <EditDiary /> },
      { path: '/diary/:diaryId', element: <DiaryDetail /> },
      { path: '/share', element: <Share /> },
      { path: '/setting', element: <Setting /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/non-existent-page', element: <NonExistentDiary /> },
      { path: '/rewardpage', element: <RewardPage /> },
    ],
  },
]);

export default router;
